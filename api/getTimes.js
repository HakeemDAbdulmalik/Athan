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

function GetPrayerTimes({city, state, country, year, month, method, annual, shafaq, tune, midnightMode, latitudeAdjustmentMethod, iso8601, school}) {
  return axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=${method}&month=${month}&year=${year}&state=${state}&annual=${annual}&shafaq=${shafaq}&tune=${tune}&midnightMode=${midnightMode}&latitudeAdjustmentMethod=${latitudeAdjustmentMethod}&iso8601=${iso8601}&school=${school}`)
    .then(({data}) => ((data)))
    .catch(err => console.log(err));
}

function GetParams() {

  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [method, setMethod] = useState('');
  const [annual, setAnnual] = useState('');
  const [shafaq, setShafaq] = useState('');
  const [tune, setTune] = useState('');
  const [midnightMode, setMidnightMode] = useState(0);
  const [latitudeAdjustmentMethod, setLatitudeAdjustmentMethod] = useState(0);
  const [iso8601, setIso8601] = useState('');
  const [school, setSchool] = useState(0);

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
            console.log(
              'Hi from Prams button'
            );
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