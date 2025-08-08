import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { Capacitor } from "@capacitor/core";
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";

async function initializeWebSQLite() {
  const sqlite = new SQLiteConnection(CapacitorSQLite);

  // Define jeep-sqlite custom element if not already defined
  if (!customElements.get("jeep-sqlite")) {
    customElements.define("jeep-sqlite", JeepSqlite);
    const jeepEl = document.createElement("jeep-sqlite");
    document.body.appendChild(jeepEl);
    await customElements.whenDefined("jeep-sqlite");
    console.log("jeep-sqlite defined and ready");
  }

  // Initialize SQLite web store
  await sqlite.initWebStore();
  console.log("Web store initialized");

  return sqlite;
}

async function startApp() {
  try {
    if (Capacitor.getPlatform() === "web") {
      await initializeWebSQLite();
    }

    const container = document.getElementById("root");
    if (!container) throw new Error("Root container not found");

    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("App initialization error:", err);
    alert("Unexpected error occurred. Check console for details.");
  }
}

window.addEventListener("DOMContentLoaded", startApp);
