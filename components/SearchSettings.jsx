import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, ListView, ScrollView, Button, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {GetPrayerTimes} from '../api/getTimes.js';
import {getData, setData} from '../api/db.js';
import SwitchToggle from 'react-native-switch-toggle';

// GetPrayerTimes();

// Everything after country needs a dropdown
const year = [];
const d = new Date();

for (let index = 0; index < 20; index++) {
  year.unshift(d.getFullYear() - index);
  year.push(d.getFullYear() + index);
}
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const method = ['Shia Ithna-Ansari', 'University of Islamic Sciences, Karachi', 'Islamic Society of North America', 'Muslim World League', 'Umm Al-Qura University, Makkah', 'Egyptian General Authority of Survey', 'Institute of Geophysics, University of Tehran', 'Gulf Region', 'Kuwait', 'Qatar', 'Majlis Ugama Islam Singapura, Singapore', 'Union Organization islamic de France', 'Diyanet İşleri Başkanlığı, Turkey', 'Spiritual Administration of Muslims of Russia'];
const annual = [false];
const school = ['Shafi', 'Hanafi'];
const shafaq = ['general', 'ahmer', 'abyad'];
const tune = [0,0,0,0,0,0];

export default function SearchSettings() {

  const countries = ["Egypt", "Canada", "Australia", "Ireland"];
  const settings = ['city, state, country, year, month, method, annual, shafaq, tune, midnightMode, latitudeAdjustmentMethod, iso8601, school'];

  function off(on, setOn) {
    setOn(!on);
  }

  const [annualToggle, setAnnualToggle] = useState(false);
  const [tuneToggle, setTuneToggle] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text  style={styles.title}>Settings</Text>
      <View style={styles.textContainer}>
        <Text>City:</Text>
        <TextInput></TextInput>
      </View>
      <View style={styles.textContainer}>
        <Text>State/Province:</Text>
        <TextInput></TextInput>
      </View>
      <View style={styles.textContainer}>
        <Text>Country:</Text>
        <TextInput></TextInput>
      </View>
      <View style={styles.textContainer}>
        <Text>Year:</Text>
        <TextInput></TextInput>
      </View>
      <View style={styles.textContainer}>
        <Text>Month:</Text>
        <TextInput></TextInput>
      </View>
      <View style={styles.textContainer}>
        <Text>Method:</Text>
        <TextInput></TextInput>
      </View>
      <View style={styles.textContainer}>
        <Text>Annual:</Text>
        <SwitchToggle switchOn={annualToggle} onPress={() => off(annualToggle, setAnnualToggle)} />
      </View>
      <View style={styles.textContainer}>
        <Text>Shafaq:</Text>
        <TextInput></TextInput>
      </View>
      <View style={styles.textContainer}>
        <Text>Tune:</Text>
        <SwitchToggle switchOn={tuneToggle} onPress={() => off(tuneToggle, setTuneToggle)} />
      </View>
      <View style={styles.textContainer}>
        <Text>Midnight Mode:</Text>
        <TextInput></TextInput>
      </View>
      <View style={styles.textContainer}>
        <Text>Latitude Adjustment Method:</Text>
        <TextInput></TextInput>
      </View>
      <View style={styles.textContainer}>
        <Text>School:</Text>
        <TextInput></TextInput>
      </View>

      <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />
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
