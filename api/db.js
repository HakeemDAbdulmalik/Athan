import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'openAthan',
    location: 'default'
  },
  () => { },
  error => { console.log(error) }
);

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS "
      +"Users "
      +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);"
    )
  });
};

const setData = (newName) => {
  if (name.length !== 0 || age.length !== 0) {
    console.log('Warning!', 'Please write your data.');
  }
  else {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Users (Name, Age) VALUES (?, ?)",
          [newName, 3]
        );
      });
    } catch {

    }
  };
};

const getData = () => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Users",
        [],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            console.log('This is the results: ', results.rows.item(2))
            var userName = results.rows.item(0).Name;
            var userAge = results.rows.item(0).Age;
            setName(userName);
            setAge(userAge);
          }
        }
      );
    })
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createTable,
  getData,
  setData,
}