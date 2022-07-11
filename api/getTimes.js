import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Button, Alert, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {setData, createTable, getData, dropTable} from './db.js';

const methods = [
  {
    label: "Shia Ithna-Ansari",
    value: 0
  },

  {
    label: "University of Islamic Sciences, Karachi",
    value: 1
  },

  {
    label: "Islamic Society of North America",
    value: 2
  },

  {
    label: "Muslim World League",
    value: 3
  },

  {
    label: "Umm Al-Qura University, Makkah",
    value: 4
  },

  {
    label: "Egyptian General Authority of Survey",
    value: 5
  },

  {
    label: "Institute of Geophysics, University of Tehran",
    value: 7
  },

  {
    label: "Gulf Region",
    value: 8
  },

  {
    label: "Kuwait",
    value: 9
  },

  {
    label: "Qatar",
    value: 10
  },

  {
    label: "Majlis Ugama Islam Singapura, Singapore",
    value: 11
  },

  {
    label: "Union Organization islamic de France",
    value: 12
  },

  {
    label: "Diyanet İşleri Başkanlığı, Turkey",
    value: 13
  },

  {
    label: "Spiritual Administration of Muslims of Russia",
    value: 14
  },

  {
    label: "Moonsighting Committee Worldwide",
    value: 15
  },
];

function GetPrayerTimes(city, state, country, year, month, method) {
  return axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${city}&state=${state}&country=${country}&method=${method}&month=${month}&year=${year}`)
  .catch(err => console.log(err));
}

function cleanData(rawData) {

  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');

  let tableNames = Object.keys(rawData.data.data[0].timings);
  tableNames.forEach((prayerTable, keys) => {
    // console.log('keys: ', prayerTable);
    dropTable(prayerTable);
    createTable(prayerTable);
  });

  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  console.log('**********\n');
  rawData.data.data.forEach(data => {
    let day = new Date(data.date.timestamp * 1000);

    tableNames.forEach((prayerTable, keys) => {
      // console.log('keys: ', prayerTable);
      setData(prayerTable, data.date.timestamp, data.timings[prayerTable], day.getDate());
      // console.log('for setdata: ', data.timings[prayerTable]);
    });



    // let dataDate = parseInt(data.date.timestamp);
    // let dateTest = new Date(dataDate * 1000);
    // let dateNow = Date.now()
    // console.log(data.timings);
    // console.log(data.date.timestamp);
    // console.log(dateTest - dateNow);
    // console.log(dateTest);


  });

  tableNames.forEach((prayerTable, keys) => {
    // console.log('keys: ', prayerTable);
    // Add the day as a value multiple tables can be searched by
    getData(prayerTable);
  });


}

let prayerTable = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function offlineData() {
  prayerTable.forEach((prayerName, keys) => {
    // console.log('keys: ', prayerName);
    // Add the day as a value multiple Names can be searched by
    getData(prayerName);
  });
}

function GetParams() {

  const [city, setCity] = useState('NewYorkCity');
  const [state, setState] = useState('NewYork');
  const [country, setCountry] = useState('United States');
  const [year, setYear] = useState(2022);
  const [month, setMonth] = useState(1);
  const [method, setMethod] = useState(2);

  return (
    <View style={{minHeight: 300}}>
      <View>
        <Text>City</Text>
        <TextInput placeholder='Please enter a city' onChangeText={text => {setCity(text)}}></TextInput>
      </View>
      <View>
        <Text>State</Text>
        <TextInput placeholder='Please enter a State' onChangeText={text => {setState(text)}}></TextInput>
      </View>
      <View>
        <Text>Country</Text>
        <TextInput placeholder='Please enter a Country' onChangeText={text => {setCountry(text)}}></TextInput>
      </View>
      <View>
        <Text>Month</Text>
        <TextInput placeholder='Please enter a Month' onChangeText={text => {setMonth(text)}}></TextInput>
      </View>
      <View>
        <Text>Year</Text>
        <TextInput placeholder='Please enter a Year' onChangeText={text => {setYear(text)}}></TextInput>
      </View>

      <View>
        <Picker selectedValue = {method} onValueChange = {(itemValue, itemIndex) => setMethod(itemValue)}>
          {methods.map((data, key) =>(
              <Picker.Item label={data.label} value={data.value} key={data.key}/>
            )
          )}
        </Picker>
      </View>
      <View style={{backgroundColor: '#2C82C9'}}>
        <Button
          title="Update"
          onPress={() => {
            offlineData()
            .then(data => (console.log('This is the offline data: ', data)))
            .catch(err => (console.log('Error with the GetPrayerTimes call: ', err)));
          }}
          color='white'
          />
      </View>
    </View>
  );
};

module.exports = {
  GetPrayerTimes,
  GetParams,
}