// database.ts

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Mobi.db");

const initDB = async () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Auth (
                id INTEGER PRIMARY KEY NOT NULL,
                token TEXT NOT NULL
            );`,
      [],
      () => console.log("Table created/verified"),
      (_, error) => {
        console.log("DB Error", error);
        return false;
      }
    );
  });
};

export default initDB;
