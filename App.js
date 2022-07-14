import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Button, Alert } from 'react-native';
import {GetPrayerTimes} from './api/getTimes.js';
import {createTable, getData, setData, dropTable} from './api/db.js';
import exampleData from './api/exampleData.js';
import Home from './components/Home';

// GetPrayerTimes();

const dataEntry = exampleData.data[0].date.gregorian;

export default function App() {

  const [dbData, setDbData] = useState([]);
  let testMe = 'hi';

  useEffect(() => {
    // dropTable('gregorianDate');
    createTable('searchSettings', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT, country TEXT, state TEXT, month TEXT, year INTEGER, annual INTEGER, method TEXT, shafaq TEXT, tune TEXT, school INTEGER, midnightMode INTEGER, latitudeAdjustmentMethod INTEGER);');

    createTable('gregorianDate', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, day INTEGER, month INTEGER, year INTEGER, searchID INTEGER);');

    createTable('hijrDate', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, day INTEGER, month INTEGER, year INTEGER, gregorianID INTEGER);');

    createTable('fajr', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, timing TEXT, gregorianID INTEGER);');

    createTable('sunrise', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, timing TEXT, gregorianID INTEGER);');

    createTable('dhuhr', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, timing TEXT, gregorianID INTEGER);');

    createTable('asr', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, timing TEXT, gregorianID INTEGER);');

    createTable('maghrib', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, timing TEXT, gregorianID INTEGER);');

    createTable('isha', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, timing TEXT, gregorianID INTEGER);');

    createTable('midnight', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, timing TEXT, gregorianID INTEGER);');


    setData('gregorianDate', '(day, month, year)', '(?, ?, ?)', [dataEntry.day, dataEntry.month.number, dataEntry.year]);

    getData(setDbData);
  }, []);

  // Set data and test retrieving the data
  // Focus on getting one record in and out properly
  // Build the database and test it first.

  return (
    <ScrollView style={styles.container}>
      {/* <Home></Home> */}
      <Text>Testing the db</Text>
      {dbData.map((data) => (
        <View>
          <Text>This is the ID: {data.ID}</Text>
          <Text>This is the day: {data.day}</Text>
          <Text>This is the month: {data.month}</Text>
          <Text>This is the year: {data.year}</Text>
        </View>
      ))}
      <Text>{testMe}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 40,
    minHeight: 300
  },

});
