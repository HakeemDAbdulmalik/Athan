import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'openAthan',
    location: 'default'
  },
  () => { },
  error => { console.log(error) }
);

const dropTable = (tableName) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DROP TABLE " + tableName + ";"
    )
  });
};

const createTable = (tableName) => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS "
      +tableName
      +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, timestamp TEXT, timing TEXT, day INTEGER);"
    )
  });
};

const setData = (tableName, timestamp, timing, day) => {
  if (timestamp.length === 0 || timing.length === 0) {
    console.log('Warning! Please write your data.');
  }
  else {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO " + tableName +" (timestamp, timing, day) VALUES (?, ?, ?)",
          [timestamp, timing, day]
        );
      });
    } catch(err) {
      console.log('Error for setData', err);
    }
  };
};

const getData = (tableName, updateData) => {
  let result = [];
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM " + tableName,
        [],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            for(let i = 0; i < len; i++) {

             results.rows.item(i);
            }
            return result
          }
        }
      );
    })
  } catch (err) {
    console.log('Error with getData call: ', err);
  }
};

const getDataByDay = (tableName, day) => {
  let result = [];
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM " + tableName + " WHERE day = " + day + ";" ,
        [],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            for(let i = 0; i < len; i++) {

              result.push(results.rows.item(i));
            }
          }
        }
      );
    });
    console.log(result);
  } catch (err) {
    console.log('Error with getData call: ', err);
  }
};

module.exports = {
  createTable,
  getData,
  setData,
  dropTable,
  getDataByDay,
}