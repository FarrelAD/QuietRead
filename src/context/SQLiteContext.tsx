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
        -- 1. Books table
        CREATE TABLE IF NOT EXISTS books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          date_added DATETIME NOT NULL,
          last_read DATETIME,
          publisher TEXT NOT NULL,
          published_date DATE NOT NULL,
          category TEXT NOT NULL, -- comma-separated
          description TEXT NOT NULL,
          page_count INTEGER NOT NULL,
          progress INTEGER NOT NULL DEFAULT 0,
          is_currently_reading INTEGER NOT NULL DEFAULT 0, -- 0 = false, 1 = true
          language TEXT NOT NULL,
          small_thumbnail TEXT,
          thumbnail TEXT,
          isbn_10 TEXT,
          isbn_13 TEXT
        );

        -- 2. Authors table
        CREATE TABLE IF NOT EXISTS authors (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE
        );

        -- 3. Join table for many-to-many relationship
        CREATE TABLE IF NOT EXISTS book_authors (
          book_id INTEGER NOT NULL,
          author_id INTEGER NOT NULL,
          PRIMARY KEY (book_id, author_id),
          FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
          FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
        );

        -- 4. Notes table (1-to-many to books table)
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          book_id INTEGER NOT NULL,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          page INTEGER NOT NULL,
          created_at DATETIME NOT NULL DEFAULT (datetime('now')),
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
