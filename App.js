import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Button, Alert } from 'react-native';
import {GetPrayerTimes} from './api/getTimes.js';
import {createTable, getData, setData, dropTable} from './api/db.js';
import exampleData from './api/exampleData.js';
import Home from './components/Home';
import SearchSettings from './components/SearchSettings';
import Calendar from './components/Calendar';

const dataEntry = exampleData.data;

export default function App() {

  const [searchSettings, setSearchSettings] = useState([]);
  const [gregorianDate, setGregorianDate] = useState([]);
  const [hijriDate, setHijriDate] = useState([]);
  const [fajr, setFajr] = useState([]);
  const [sunrise, setSunrise] = useState([]);
  const [dhuhr, setDhuhr] = useState([]);
  const [asr, setAsr] = useState([]);
  const [maghrib, setMaghrib] = useState([]);
  const [isha, setIsha] = useState([]);
  const [midnight, setMidnight] = useState([]);
  const [currentPrayerTimes, setCurrentPrayerTimes] = useState();
  const [dataLoaded, setDataLoaded] = useState(0);
  const [gregorianID, setGregorianID] = useState();


  let prayerTableNames = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Midnight'];

createTable('searchSettings', '(searchID INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT, country TEXT, state TEXT, month INTEGER, year INTEGER, annual TEXT, method TEXT, shafaq TEXT, tune TEXT, school INTEGER, midnightMode INTEGER, latitudeAdjustmentMethod INTEGER, iso8601 TEXT);');

createTable('gregorianDate', '(gregorianID INTEGER PRIMARY KEY AUTOINCREMENT, day INTEGER, month INTEGER, year INTEGER);');

createTable('hijriDate', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, day INTEGER, month INTEGER, year INTEGER, gregorianID REFERENCES gregorianDate (gregorianID));');

prayerTableNames.forEach(name => {
  createTable(name, '(ID INTEGER PRIMARY KEY AUTOINCREMENT, timing TEXT, gregorianID REFERENCES gregorianDate (gregorianID));');
});

// Create profile settings
createTable('settings', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, color TEXT);');

let getLocalData = [];

useEffect(() => {

  // dataEntry.forEach((element, index) => {

  //   console.log('This is the index value related to dataEntry: ', index);

  //   setData('gregorianDate', '(day, month, year)', '(?, ?, ?)', [element.date.gregorian.day, element.date.gregorian.month.number, element.date.gregorian.year], element, prayerTableNames);

  // });
// setData('searchSettings', '(city, country, state, month, year, annual, method, shafaq, tune, school, midnightMode, latitudeAdjustmentMethod)', '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', ['New York City', 'United States', 'NY', '07', '2022', 'false', '2', 'general', '0,0,0,0,0,0', '0', '0', '3', 'true']);

  getData(setSearchSettings, 'searchSettings')
    .catch((err) => {
      console.log('Error getting data from the searchSettings table. Error code: ', err);
    });
  getData(setGregorianDate, 'gregorianDate')
    .catch((err) => {
      console.log('Error getting data from the gregorianDate table. Error code: ', err);
    });

  }, []);

  useEffect(() => {

    const d = new Date();
      gregorianDate.forEach(obj => {
          if (obj.day === d.getDate() && obj.month === (d.getMonth() + 1)) {
            setGregorianID(obj.gregorianID);
          }
        });
  }, [gregorianDate]);

  useEffect(() => {

    console.log('Updated gregorianID: ', gregorianID);
    if(gregorianID) {

      getData(setHijriDate, 'hijriDate')
        .catch((err) => {
          console.log('Get Hijri data failed! Error code: ', err);
        });

      getData(setFajr, 'Fajr')
        .catch((err) => {
          console.log('Get Fajr data failed! Error code: ', err);
        });

      getData(setSunrise, 'Sunrise')
        .catch((err) => {
          console.log('Get Fajr data failed! Error code: ', err);
        });

      getData(setDhuhr, 'Dhuhr')
        .catch((err) => {
          console.log('Get Fajr data failed! Error code: ', err);
        });

      getData(setAsr, 'Asr')
        .catch((err) => {
          console.log('Get Fajr data failed! Error code: ', err);
        });

      getData(setMaghrib, 'Maghrib')
        .catch((err) => {
          console.log('Get Fajr data failed! Error code: ', err);
        });

      getData(setIsha, 'Isha')
        .catch((err) => {
          console.log('Get Fajr data failed! Error code: ', err);
        });

      getData(setMidnight, 'Midnight')
        .catch((err) => {
          console.log('Get Fajr data failed! Error code: ', err);
        });
    }

  }, [gregorianID]);

  useEffect(() => {
    let hDay, hMonth, hYear, Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha, Midnight;
    // Load all of the data to a be loaded in at the end of the function.
          hijriDate.forEach(hijriD => {
            if (hijriD.gregorianID === gregorianID) {
              hDay = hijriD.day;
              hMonth = hijriD.month;
              hYear = hijriD.year;
            }
          });

          fajr.forEach(times => {
            if (times.gregorianID === gregorianID) {
              Fajr = times.timing;
            }
          });

          sunrise.forEach(times => {
            if (times.gregorianID === gregorianID) {
              Sunrise = times.timing;
            }
          });

          dhuhr.forEach(times => {
            if (times.gregorianID === gregorianID) {
              Dhuhr = times.timing;
            }
          });

          asr.forEach(times => {
            if (times.gregorianID === gregorianID) {
              Asr = times.timing;
            }
          });

          maghrib.forEach(times => {
            if (times.gregorianID === gregorianID) {
              Maghrib = times.timing;
            }
          });

          isha.forEach(times => {
            if (times.gregorianID === gregorianID) {
              Isha = times.timing;
            }
          });

          midnight.forEach(times => {
            if (times.gregorianID === gregorianID) {
              Midnight = times.timing;
            }
          });
          setCurrentPrayerTimes({hDay, hMonth, hYear, Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha, Midnight});
  }, [hijriDate, fajr, sunrise, dhuhr, asr, maghrib, isha, midnight]);

  useEffect(() => {
    // console.log('Show the current prayer times: ', currentPrayerTimes);
  }, [currentPrayerTimes]);

  return (
    <ScrollView style={styles.container}>
      {
        currentPrayerTimes &&
        <Home times={currentPrayerTimes}></Home>
      }
      <Calendar calTimes={dataEntry}></Calendar>
      {
        searchSettings[0] &&
        <SearchSettings settings={searchSettings[0]}></SearchSettings>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 20,
    minHeight: 300
  },

});
