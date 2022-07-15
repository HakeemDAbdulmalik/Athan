import SQLite from 'react-native-sqlite-storage';
import React, { useState } from 'react';

SQLite.enablePromise(true);

SQLite.openDatabase(
  {
    name: 'openAthan',
    location: 'default'
  },
  () => { },
  error => { console.log(error) }
);

let db;

SQLite.openDatabase('openAthan', 1.0, 'Open Athan Database', 200000).then((DB) => {
  db = DB;
}).catch((error) => {
  console.log(error);
});

const dropTable = (tableName) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DROP TABLE " + tableName + ";"
    )
  });
};

// Schema example: "(ID INTEGER PRIMARY KEY AUTOINCREMENT, timestamp TEXT, timing TEXT, day INTEGER);"

const createTable = (tableName, schema) => {
  return db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS "
      +tableName
      + schema,
      [],
      (tx, result) => {
        console.log('Creating the table was a success! ', result);
        console.log('Creating the table was a success! ', tableName);
      },
      (err) => {
        console.log('Creating the table failed! Error: ', err);
      }
    )
  });
};

// colNames example: '(timestamp, timing, day)'
// colPlace example: '(?, ?, ?)'
// colValue example: [timestamp, timing, day]
const setData = (tableName, colNames, colPlace, colValue, gregorianID) => {
  // try {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "INSERT INTO " + tableName + colNames + " VALUES " + colPlace,
  //       colValue,
  //       (tx, results) => {
  //         // console.log(results);
  //         gregorianID = results.insertId;
  //         console.log(gregorianID);
  //       },
  //       (err) => {
  //         console.log('Could not make sql call! Error: ', err);
  //       }
  //     );
  //   });
  // } catch(err) {
  //   console.log('Error for setData', err);
  // }
};

const getData = (loadValue, tableName) => {
  // try {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "SELECT * FROM " + tableName,
  //       [],
  //       (tx, results) => {
  //         var len = results.rows.length;
  //         if (len > 0) {
  //           // console.log('Hi', tableName);
  //           // console.log('data ', results.rows.raw());
  //           loadValue(results.rows.raw());
  //         }
  //       },
  //       (err) => {
  //         console.log('Could not make sql call! Error: ', err);
  //       }
  //     );
  //   })
  // } catch (err) {
  //   console.log('Error with getData call: ', err);
  // }
};

const getDataByDay = (tableName, day) => {
  let result = [];
  // try {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "SELECT * FROM " + tableName + " WHERE day = " + day + ";" ,
  //       [],
  //       (tx, results) => {
  //         var len = results.rows.length;
  //         if (len > 0) {
  //           for(let i = 0; i < len; i++) {

  //             // result.push(results.rows.item(i));
  //             console.log(results.rows.item(i));
  //           }
  //         }
  //       },
  //       (err) => {
  //         console.log('Could not make sql call! Error: ', err);
  //       }
  //     );
  //   });
  //   console.log(result);
  // } catch (err) {
  //   console.log('Error with getData call: ', err);
  // }
};

module.exports = {
  createTable,
  getData,
  setData,
  dropTable,
  getDataByDay,
}