import axios from 'axios';

function GetPrayerTimes() {
  axios.get('http://api.aladhan.com/v1/calendar?latitude=51.508515&longitude=-0.1254872&method=2&month=4&year=2017')
  .catch(err => console.log(err));
}

module.exports = {
  GetPrayerTimes
}