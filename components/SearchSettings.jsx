import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, ListView, ScrollView, Button, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {GetPrayerTimes} from '../api/getTimes.js';
import {getData, setData} from '../api/db.js';
import SwitchToggle from 'react-native-switch-toggle';

const year = [];
const d = new Date();

for (let index = 0; index < 15; index++) {
  // year.unshift(d.getFullYear() - index);
  year.push(d.getFullYear() + index);
}
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const method = ['Shia Ithna-Ansari', 'University of Islamic Sciences, Karachi', 'Islamic Society of North America', 'Muslim World League', 'Umm Al-Qura University, Makkah', 'Egyptian General Authority of Survey', 'Institute of Geophysics, University of Tehran', 'Gulf Region', 'Kuwait', 'Qatar', 'Majlis Ugama Islam Singapura, Singapore', 'Union Organization islamic de France', 'Diyanet İşleri Başkanlığı, Turkey', 'Spiritual Administration of Muslims of Russia'];
const annual = [false];
const school = ['Shafi', 'Hanafi'];
const shafaq = ['general', 'ahmer', 'abyad'];
const tune = [0,0,0,0,0,0]; // add multiple text input options for each tuned value.
const midnightMode = ['Standard', 'Jafari'];
const latitudeAdjustmentMethod = ['Middle of the Night', 'One Seventh', 'Angle Based'];

function DropDown(showValues, currentValue) {

  function findYear(year) {
    return year === currentValue;
  }

  if (currentValue >= 0 && showValues && currentValue < 2000) {
    currentValue = showValues[currentValue];
  } else if (currentValue > 2000) {
    currentValue = showValues[showValues.findIndex(findYear)];
  }

  return (
    <SelectDropdown
        data={showValues}
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
        defaultButtonText={currentValue}
    />
  );
}


export default function SearchSettings({settings}) {

  // console.log('Props: ', settings);

  function off(on, setOn) {
    setOn(!on);
  }

  const [annualToggle, setAnnualToggle] = useState(false);
  const [tuneToggle, setTuneToggle] = useState(false);

  return (
    <View style={styles.container}>
      <Text  style={styles.title}>Settings</Text>
      <View style={styles.textContainer}>
        <Text>City:</Text>
        <TextInput>{settings.city}</TextInput>
      </View>
      <View style={styles.textContainer}>
        <Text>State/Province:</Text>
        <TextInput>{settings.state}</TextInput>
      </View>
      <View style={styles.textContainer}>
        <Text>Country:</Text>
        <TextInput>{settings.country}</TextInput>
      </View>
      <View style={styles.textContainer}>
        <Text>Year:</Text>
        {DropDown(year, settings.year)}
      </View>
      <View style={styles.textContainer}>
        <Text>Month:</Text>
        {DropDown(month, settings.month - 1)}
      </View>
      <View style={styles.textContainer}>
        <Text>Method:</Text>
        {DropDown(method, settings.method)}
      </View>
      <View style={styles.textContainer}>
        <Text>Annual:</Text>
        <SwitchToggle switchOn={annualToggle} onPress={() => off(annualToggle, setAnnualToggle)} />
      </View>
      <View style={styles.textContainer}>
        <Text>Shafaq:</Text>
        {DropDown(shafaq, settings.shafaq)}
      </View>
      <View style={styles.textContainer}>
        <Text>Tune:</Text>
        <SwitchToggle switchOn={tuneToggle} onPress={() => off(tuneToggle, setTuneToggle)} />
      </View>
      <View style={styles.textContainer}>
        <Text>Midnight Mode:</Text>
        {DropDown(midnightMode, settings.midnightMode)}
      </View>
      <View style={styles.textContainer}>
        <Text>Latitude Adjustment Method:</Text>
        {DropDown(latitudeAdjustmentMethod, settings.latitudeAdjustmentMethod - 1) /** 1 must be added to each of the values */}
      </View>
      <View style={styles.textContainer}>
        <Text>School:</Text>
        {DropDown(school, settings.school)}
      </View>
      <View style={styles.textContainer}>
        <Text>Hijri Adjustment:</Text>
        <TextInput></TextInput>
      </View>

       <Button
       style={styles.button}
        title="Change Location"
        onPress={() => (Alert.alert("hi"))}
        color='black'
        />
    </View>
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
