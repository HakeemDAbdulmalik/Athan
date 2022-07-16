import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Button, Alert } from 'react-native';
import {GetPrayerTimes} from './api/getTimes.js';
import {createTable, getData, setData, dropTable} from './api/db.js';
import exampleData from './api/exampleData.js';
import Home from './components/Home';

// GetPrayerTimes();

const dataEntry = exampleData.data;

export default function App() {

  const [gregorianDate, setGregorianDate] = useState([]);
  const [hijriDate, setHijriDate] = useState([]);
  const [fajr, setFajr] = useState([]);
  const [sunrise, setSunrise] = useState([]);
  const [dhuhr, setDhuhr] = useState([]);
  const [asr, setAsr] = useState([]);
  const [maghrib, setMaghrib] = useState([]);
  const [isha, setIsha] = useState([]);
  const [midnight, setMidnight] = useState([]);
  const [gregorianID, setGregorianID] = useState();

  const d = new Date();

  useEffect(() => {
    dropTable('searchSettings');
    dropTable('gregorianDate');
    dropTable('hijriDate');
    dropTable('fajr');
    // dropTable('sunrise');
    // dropTable('dhuhr');
    // dropTable('asr');
    // dropTable('maghrib');
    // dropTable('isha');
    // dropTable('midnight');
    // dropTable('settings');

    console.log('*******************\n*******************\n*******************');

    createTable('searchSettings', '(searchID INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT, country TEXT, state TEXT, month TEXT, year INTEGER, annual INTEGER, method INTEGER, shafaq TEXT, tune TEXT, school INTEGER, midnightMode INTEGER, latitudeAdjustmentMethod INTEGER);');

    createTable('gregorianDate', '(gregorianID INTEGER PRIMARY KEY AUTOINCREMENT, day INTEGER, month INTEGER, year INTEGER);');

    createTable('hijriDate', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, day INTEGER, month INTEGER, year INTEGER, gregorianID REFERENCES gregorianDate (gregorianID));');

    createTable('Fajr', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, timing TEXT, gregorianID REFERENCES gregorianDate (gregorianID));');

    createTable('Sunrise', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, timing TEXT, gregorianID REFERENCES gregorianDate (gregorianID));');

    createTable('Dhuhr', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, timing TEXT, gregorianID REFERENCES gregorianDate (gregorianID));');

    createTable('Asr', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, timing TEXT, gregorianID REFERENCES gregorianDate (gregorianID));');

    createTable('Maghrib', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, timing TEXT, gregorianID REFERENCES gregorianDate (gregorianID));');

    createTable('Isha', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, timing TEXT, gregorianID REFERENCES gregorianDate (gregorianID));');

    createTable('Midnight', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, timing TEXT, gregorianID REFERENCES gregorianDate (gregorianID));');

    // Create profile settings
    createTable('settings', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, color TEXT);');

    // Load in the dummy data
    // If data exists load in the data for the week


    // If contact selects to see a full month of data then load in
    // all of the data


    // setData('searchSettings', '(city, country, state, month, year, annual, method, shafaq, tune, school, midnightMode, latitudeAdjustmentMethod)', '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', ['New York City', 'United States', 'NY', '07', '2022', 'false', '2', 'general', '0,0,0,0,0,0', '0', '0', '3']);

    /**
     * Load the data from the example in order:
     * gregorianDate
     * hijriDate
     * Prayertimes
     */

    dataEntry.forEach(element => {
      let test = 0;
      setData('gregorianDate', '(day, month, year)', '(?, ?, ?)', [element.date.gregorian.day, element.date.gregorian.month.number, element.date.gregorian.year], setGregorianID, test)
        .then((data) => {
          setData('hijriDate', '(day, month, year, gregorianID)', '(?, ?, ?, ?)', [element.date.hijri.day, element.date.hijri.month.number, element.date.hijri.year, gregorianID]);
          // console.log('This is data: ', data);
          // console.log('This is gregorianID: ', gregorianID);
          getData(setHijriDate, 'hijriDate');
          // console.log(hijriDate);
          // console.log('This is test: ', test);
        });


    });


    // setData('hijriDate', '(day, month, year, gregorianID)', '(?, ?, ?, ?)', [dataEntryH.day, dataEntryH.month.number, dataEntryH.year, '1']);

    // setData('Fajr', '(timing, gregorianID)', '(?, ?)', [exampleData.data[0].timings.Fajr ,]);
    // setData('Sunrise', '(timing, gregorianID)', '(?, ?)', [exampleData.data[0].timings.Sunrise , 1]);
    // setData('Dhuhr', '(timing, gregorianID)', '(?, ?)', [exampleData.data[0].timings.Dhuhr , 1]);
    // setData('Asr', '(timing, gregorianID)', '(?, ?)', [exampleData.data[0].timings.Asr , 1]);
    // setData('Maghrib', '(timing, gregorianID)', '(?, ?)', [exampleData.data[0].timings.Maghrib , 1]);
    // setData('Isha', '(timing, gregorianID)', '(?, ?)', [exampleData.data[0].timings.Isha , 1]);
    // setData('Midnight', '(timing, gregorianID)', '(?, ?)', [exampleData.data[0].timings.Midnight , 1]);

    // getData(setGregorianDate, 'gregorianDate');
    // getData(setHijriDate, 'hijriDate');
    // getData(setFajr, 'Fajr');
    // getData(setSunrise, 'Sunrise');
    // getData(setDhuhr, 'Dhuhr');
    // getData(setAsr, 'Asr');
    // getData(setMaghrib, 'Maghrib');
    // getData(setIsha, 'Isha');
    // getData(setMidnight, 'Midnight');
  }, []);

  // Set data and test retrieving the data
  // Focus on getting one record in and out properly
  // Build the database and test it first.

  return (
    <ScrollView style={styles.container}>
      {/* <Home></Home> */}
      <Text>Testing the db</Text>
      {/* {gregorianDate.map((data, key) => (
        <View>
          <Text>This is the ID: {data.ID}</Text>
          <Text>This is the day: {data.day}</Text>
          <Text>This is the month: {data.month}</Text>
          <Text>This is the year: {data.year}</Text>
        </View>
      ))} */}
      {/* {gregorianDate.map((data, keys) => (
        <View>
          <Text>This is the date: {data.day}</Text>
        </View>
      ))} */}
      <Text>Working</Text>
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
