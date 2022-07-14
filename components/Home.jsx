import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Button, Alert } from 'react-native';
import {GetPrayerTimes} from '../api/getTimes.js';
import {createTable, getData, setData} from '../api/db.js';

// GetPrayerTimes();

export default function Home() {
  const [fajr, setFajr] = useState(0);
  const [dhuhr, setDhuhr] = useState(0);
  const [asr, setAsr] = useState(0);
  const [maghrib, setMaghrib] = useState(0);
  const [isha, setIsha] = useState(0);

  useEffect(() => {
    // createTable();
    // getData();
  }, []);



  return (
    <ScrollView style={styles.container}>
      <Text  style={styles.title}>Welcome</Text>
      <View style={styles.styleContainer}>
        <Text style={styles.textContainer}>Fajr</Text>
        <Text style={styles.textContainer}>{fajr}</Text>
      </View>
      <View style={styles.styleContainer}>
        <Text style={styles.textContainer}>Dhuhr</Text>
        <Text style={styles.textContainer}>{dhuhr}</Text>
      </View>
      <View style={styles.styleContainer}>
        <Text style={styles.textContainer}>Asr</Text>
        <Text style={styles.textContainer}>{asr}</Text>
      </View>
      <View style={styles.styleContainer}>
        <Text style={styles.textContainer}>Maghrib</Text>
        <Text style={styles.textContainer}>{maghrib}</Text>
      </View>
      <View style={styles.styleContainer}>
        <Text style={styles.textContainer}>Isha</Text>
        <Text style={styles.textContainer}>{isha}</Text>
      </View>
      <View style={styles.button}>
        <Button
        title="Change Location"
        onPress={() => (Alert.alert("hi"))}
        color='white'
        />
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 40,
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
