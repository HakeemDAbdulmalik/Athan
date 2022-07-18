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
  let prayerTableNames = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Midnight'];

  const [settings, setSettings] = useState([]);
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

  let gregorianID = {};

  useEffect(() => {
    dropTable('searchSettings');
    dropTable('gregorianDate');
    dropTable('hijriDate');
    dropTable('fajr');
    dropTable('sunrise');
    dropTable('dhuhr');
    dropTable('asr');
    dropTable('maghrib');
    dropTable('isha');
    dropTable('midnight');
    dropTable('settings');

    createTable('searchSettings', '(searchID INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT, country TEXT, state TEXT, month INTEGER, year INTEGER, annual TEXT, method TEXT, shafaq TEXT, tune TEXT, school INTEGER, midnightMode INTEGER, latitudeAdjustmentMethod INTEGER, iso8601 TEXT);');

    createTable('gregorianDate', '(gregorianID INTEGER PRIMARY KEY AUTOINCREMENT, day INTEGER, month INTEGER, year INTEGER);');

    createTable('hijriDate', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, day INTEGER, month INTEGER, year INTEGER, gregorianID REFERENCES gregorianDate (gregorianID));');

    prayerTableNames.forEach(name => {
      createTable(name, '(ID INTEGER PRIMARY KEY AUTOINCREMENT, timing TEXT, gregorianID REFERENCES gregorianDate (gregorianID));');
    });

    // Create profile settings
    createTable('settings', '(ID INTEGER PRIMARY KEY AUTOINCREMENT, color TEXT);');

    // setData('searchSettings', '(city, country, state, month, year, annual, method, shafaq, tune, school, midnightMode, latitudeAdjustmentMethod)', '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', ['New York City', 'United States', 'NY', '07', '2022', 'false', '2', 'general', '0,0,0,0,0,0', '0', '0', '3', 'true']);

    dataEntry.forEach(element => {

      // Pass the element value and use tx to create Insert calls for the database.
      setData('gregorianDate', '(day, month, year)', '(?, ?, ?)', [element.date.gregorian.day, element.date.gregorian.month.number, element.date.gregorian.year], element, prayerTableNames);

    });

    // getData(setSettings, 'searchSettings');
    let getLocalData = [];
    getData(setGregorianDate, 'gregorianDate')
      .then((data) => {
        // Grab the value of the gregorianDate id that corisponds with
        // the current day.
        const d = new Date();
          gregorianDate.forEach(obj => {

            if (obj.day === d.getDate() && obj.month === (d.getMonth() + 1)) {
              console.log('****\n');
              gregorianID.ID = obj.gregorianID;
            }
          });
      })
      .then(() => {
        getLocalData.push(getData(setHijriDate, 'hijriDate')
          .then(() => {
            let hijriObj = {};

            hijriDate.forEach(hijriD => {
              if (hijriD.gregorianID === gregorianID.ID) {
                hijriObj.hDay = hijriD.day;
                hijriObj.hMonth = hijriD.month;
                hijriObj.hYear = hijriD.year;
              }
            });

            return hijriObj;
          }));
          getLocalData.push(
            getData(setFajr, 'Fajr')
            .then(() => {
              let result = {};
              fajr.forEach(times => {
                if (times.gregorianID === gregorianID.ID) {
                  result.Fajr = times.timing;
                }
              });
              return result;
            })
          );
        getLocalData.push(getData(setSunrise, 'Sunrise')
            .then(() => {
              let result = {};
              sunrise.forEach(times => {
                if (times.gregorianID === gregorianID.ID) {
                  result.Sunrise = times.timing;
                }
              });
              return result;
            })
        )
        getLocalData.push(getData(setDhuhr, 'Dhuhr')
            .then(() => {
              let result = {};
              dhuhr.forEach(times => {
                if (times.gregorianID === gregorianID.ID) {
                  result.Dhuhr = times.timing;
                }
              });
              return result;
            })
        )
        getLocalData.push(getData(setAsr, 'Asr')
            .then(() => {
              let result = {};
              asr.forEach(times => {
                if (times.gregorianID === gregorianID.ID) {
                  result.Asr = times.timing;
                }
              });
              return result;
            })
        )
        getLocalData.push(getData(setMaghrib, 'Maghrib')
            .then(() => {
              let result = {};
              maghrib.forEach(times => {
                if (times.gregorianID === gregorianID.ID) {
                  result.Maghrib = times.timing;
                }
              });
              return result;
            })
        )
        getLocalData.push(getData(setIsha, 'Isha')
            .then(() => {
              let result = {};
              isha.forEach(times => {
                if (times.gregorianID === gregorianID.ID) {
                  result.Isha = times.timing;
                }
              });
              return result;
            })
        )
        getLocalData.push(getData(setMidnight, 'Midnight')
          .then(() => {
            let result = {};
            midnight.forEach(times => {
              if (times.gregorianID === gregorianID.ID) {
                result.Midnight = times.timing;
              }
            });
            return result;
          })
        )
      })
      .then(() => {
        Promise.all(getLocalData).then((values) => {
          let returnValues = {};
          values.forEach(element => {
            let elementKeys = Object.keys(element);

            elementKeys.forEach(val => {
              returnValues[val] = element[val];
            });
          });
          setCurrentPrayerTimes(returnValues);
        });
      });

  }, []);

  return (
    <ScrollView style={styles.container}>
      {
        currentPrayerTimes && <Home times={currentPrayerTimes}></Home>
      }

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
