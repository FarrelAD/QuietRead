import { createContext, useContext, useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";

type SQLiteContextType = {
  sqlite: SQLiteConnection | null;
  db: SQLiteDBConnection | null;
  loading: boolean;
  error: Error | null;
};

const SQLiteContext = createContext<SQLiteContextType>({
  sqlite: null,
  db: null,
  loading: true,
  error: null,
});

type SQLiteProviderProps = {
  children: React.ReactNode;
};

export const SQLiteProvider = (props: SQLiteProviderProps) => {
  const { children } = props;

  const [sqlite, setSqlite] = useState<SQLiteConnection | null>(null);
  const [db, setDb] = useState<SQLiteDBConnection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Database initialization
  useEffect(() => {
    const init = async () => {
      try {
        const conn = new SQLiteConnection(CapacitorSQLite);

        if (Capacitor.getPlatform() === "web") {
          if (!customElements.get("jeep-sqlite")) {
            customElements.define("jeep-sqlite", JeepSqlite);
            const jeepEl = document.createElement("jeep-sqlite");
            document.body.appendChild(jeepEl);
            await customElements.whenDefined("jeep-sqlite");
          }
          await conn.initWebStore();
        }

        await conn.checkConnectionsConsistency();
        const isConn = await conn.isConnection("db_booknest", false);
        let dbConn: SQLiteDBConnection;
        if (isConn.result) {
          dbConn = await conn.retrieveConnection("db_booknest", false);
        } else {
          dbConn = await conn.createConnection(
            "db_booknest",
            false,
            "no-encryption",
            1,
            false
          );
        }

        const openDBconnection = () => {
          return new Promise<void>((resolve, reject) => {
            setTimeout(async () => {
              try {
                await dbConn.open();
                const res = await dbConn.isDBOpen();
                console.log(`is db open: ${res.result}`);
                resolve();
              } catch (error) {
                reject(error);
              }
            }, 2000);
          });
        };

        await openDBconnection();

        setSqlite(conn);
        setDb(dbConn);
      } catch (err: any) {
        console.error("SQLite init error:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        console.log("SQLite database initialization is finish!");
        setLoading(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (!db) return;

    /**
     * Initialize SQLite tables
     */
    const tablesInit = async () => {
      const isDbOpen = await db.isDBOpen();

      if (!isDbOpen.result) return;

      await db.execute(`
        CREATE TABLE IF NOT EXISTS books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title VARCHAR(255) NOT NULL,
          date_added DATETIME NOT NULL,
          last_read DATETIME,
          publisher VARCHAR(100) NOT NULL,
          published_date DATE NOT NULL,
          category TEXT NOT NULL,               -- will support multi categories in 1 book
          description TEXT NOT NULL,
          page_count INTEGER NOT NULL,
          progress INTEGER NOT NULL DEFAULT 0,
          is_currently_reading BOOLEAN NOT NULL DEFAULT FALSE,
          language VARCHAR(10) NOT NULL,
          small_thumbnail VARCHAR(2083),
          thumbnail VARCHAR(2083)
        );

        CREATE TABLE IF NOT EXISTS book_authors (
          book_id INTEGER NOT NULL,
          author VARCHAR(100) NOT NULL,
          FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS book_identifiers (
          book_id INTEGER NOT NULL,
          type VARCHAR(8) CHECK(type IN ('ISBN_10', 'ISBN_13')) NOT NULL,
          identifier VARCHAR(20) NOT NULL,
          FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          book_id INTEGER NOT NULL,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          page INTEGER NOT NULL,
          date_created DATETIME NOT NULL,
          FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
        );
      `);
    };

    tablesInit();
  }, [db]);

  return (
    <SQLiteContext.Provider value={{ sqlite, db, loading, error }}>
      {children}
    </SQLiteContext.Provider>
  );
};

export const useSQLite = (): SQLiteContextType => useContext(SQLiteContext);
