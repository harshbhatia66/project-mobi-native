// authTokenStorage.ts

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Mobi.db");

export const storeToken = async (token: string) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT OR REPLACE INTO Auth (id, token) VALUES (1, ?);`,
      [token],
      () => console.log("Token stored successfully"),
      (_, error) => {
        console.log("Error storing token", error);
        return false;
      }
    );
  });
};

export const retrieveToken = async (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT token FROM Auth WHERE id = 1;`,
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows._array[0].token);
          } else {
            resolve(null);
          }
        },
        (_, error): boolean => {
          console.log("Error retrieving token", error);
          return false;
        }
      );
    });
  });
};
