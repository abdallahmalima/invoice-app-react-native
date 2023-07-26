import { useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite';

const useSQLiteDB = () => {
  const [db, setDb] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const database = SQLite.openDatabase('finance.db');
    setDb(database);

    database.transaction(tx => {
      tx.executeSql(`
      CREATE TABLE IF NOT EXISTS InvoiceSell (
        id INTEGER PRIMARY KEY NOT NULL,
        mainContact VARCHAR(20) NOT NULL,
        aName VARCHAR(250) NOT NULL,
        eName VARCHAR(250) NOT NULL,
        unit VARCHAR(250) NOT NULL,
        quantity INT NULL DEFAULT 0,
        price FLOAT NOT NULL,
        discount FLOAT NOT NULL,
        taxPercentage FLOAT NOT NULL DEFAULT 0
      );
      `);
    }, (error) => {
      console.log(error);
      console.log("Errorrrrrrrrrrrrrr");
    }, () => {
      setIsLoading(false);
      console.log("Yessssssssss");
    });
  }, []);

  return [isLoading, db];
};

export default useSQLiteDB;
