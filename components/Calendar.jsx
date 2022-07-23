import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Button, Alert } from 'react-native';
import {GetPrayerTimes} from '../api/getTimes.js';
import {createTable, getData, setData} from '../api/db.js';

function calRow(calVal, index) {

  return(
    <View>
      <Text style={{fontSize: 9}}>{`${calVal.date.gregorian.day} \t ${calVal.date.hijri.day} \t ${calVal.timings.Fajr} \t ${calVal.timings.Dhuhr} \t ${calVal.timings.Asr} \t ${calVal.timings.Maghrib} \t ${calVal.timings.Isha}`}</Text>
    </View>
  );
}

export default function Calendar({calTimes}) {

  return (
    <View style={styles.container}>
      <Text  style={styles.title}>Calendar</Text>

      <View style={styles.styleContainer}>
        <Text style={styles.textContainer}>Day</Text>
        <Text style={styles.textContainer}>Hijri</Text>
        <Text style={styles.textContainer}>Fajr</Text>
        <Text style={styles.textContainer}>Dhuhr</Text>
        <Text style={styles.textContainer}>Asr</Text>
        <Text style={styles.textContainer}>Maghrib</Text>
        <Text style={styles.textContainer}>Isha</Text>
      </View>
      {
        calTimes.map((data, key) => (
          calRow(data, key)
        ))
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
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
  }

});
