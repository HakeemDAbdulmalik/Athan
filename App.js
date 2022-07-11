import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Button, Alert } from 'react-native';
import {GetPrayerTimes, GetParams} from './api/getTimes.js';
import {createTable, getData, setData, getDataByDay} from './api/db.js';

GetPrayerTimes();

export default function App() {
  const [fajr, setFajr] = useState('Fajr');
  const [dhuhr, setDhuhr] = useState('Dhuhr');
  const [asr, setAsr] = useState('Asr');
  const [maghrib, setMaghrib] = useState('Maghrib');
  const [isha, setIsha] = useState('Isha');
  const [currentData, setCurrentData] = useState({});

  const initializeDB = [fajr, dhuhr, asr, maghrib, isha];

  useEffect(() => {
    let currentDay = Date.now();
    currentDay = new Date(currentDay);

    initializeDB.forEach((name, key) => {

      createTable(name);
      getDataByDay(name, currentDay.getDate());
    });

  }, []);



  return (
    <ScrollView style={styles.container}>
      <Text  style={styles.title}>Welcome</Text>
      <View style={styles.styleContainer}>
        <Text style={styles.textContainer}>Fajr</Text>
        <Text style={styles.textContainer}>5:30 am</Text>
      </View>
      <View style={styles.styleContainer}>
        <Text style={styles.textContainer}>Dhuhr</Text>
        <Text style={styles.textContainer}>1:30 pm</Text>
      </View>
      <View style={styles.styleContainer}>
        <Text style={styles.textContainer}>Asr</Text>
        <Text style={styles.textContainer}>6:00 pm</Text>
      </View>
      <View style={styles.styleContainer}>
        <Text style={styles.textContainer}>Maghrib</Text>
        <Text style={styles.textContainer}>8:40 pm</Text>
      </View>
      <View style={styles.styleContainer}>
        <Text style={styles.textContainer}>Isha</Text>
        <Text style={styles.textContainer}>10:00 pm</Text>
      </View>
      <View style={styles.button}>
        <Button
        title="Change Location"
        onPress={() => (Alert.alert("hi"))}
        color='white'
        />
      </View>
      <GetParams/>
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

  styleContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 0,
    padding: 0
  },

  textContainer: {
    flex: 1,
    textAlign: "center",
    marginBottom: 20,
  },

  title: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
    textAlign: "center",
    backgroundColor: '#2C82C9',
    color: 'white',
  },

  button: {
    backgroundColor: '#2C82C9',
    margin: 40,
  }


});
