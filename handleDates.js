const moment = require('moment');

const formatDate = function (date, format_from, format_to) {
  // let time = moment(date, format_from).format("YYYT-MM-DD");
  // let time_db = moment(date, format_from).format("YYYY-MM-DD hh:mm:ss");
  return moment(date, format_from).format(format_to);
};

const daysInThisMonth = function (date) {
  return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
};

const daysInThisYear = function (date) {
  return new Date(date.getFullYear())
}

const nameOfDay = function (date) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var d = new Date(date);
  var dayName = days[d.getDay()];
  return dayName;
};

// TODO:
//      - it doesn't work if years gap
const daysLeft = function (from, to, filter) {
  let days_left = 0;
  let day_from = moment(from).format("DD"); // returns number of day
  let day_to = moment(to).format("DD");

  // if different year
  if (moment(from).format("YYYY") != moment(to).format("YYYY")) {
    console.log('Different years.');
    let years_left = moment(to).format("YYYY") - moment(from).format("YYYY");
    for (let i = 0; i < years_left; i++) {
      console.log(`
      Loop number: ${i}.
      Year from: ${moment(from).format("YYYY")}
      Year to: ${moment(to).format("YYYY")}`);
    }
    // if from and to are in the same month
    if (moment(from).format("MM") === moment(to).format("MM")) {
      for (let i = day_from; i < day_to; i++) {
        let date = moment().format(`YYYY-MM-${i}`);
        let work_day = nameOfDay(date);
        filter.forEach(day => {        
          if (work_day === day) {
            days_left++;
          }
        })
      }
    }

    // if from and to are different months
    if (moment(from).format("MM") != moment(to).format("MM")) {
      let month_length = daysInThisMonth(new Date(from));     
      // from now to end of the month
      for (let i = day_from; i < month_length; i++) {
        let date = moment().format(`YYYY-MM-${i}`);
        let work_day = nameOfDay(date);
        filter.forEach(day => {
          if (work_day === day) {
            days_left++;
          }
        })
      }
      // from start of new month to to
      for (let i = 1; i < day_to; i++) {
        let date = moment().format(`YYYY-MM-${i}`);
        let work_day = nameOfDay(date);
        filter.forEach(day => {        
          if (work_day === day) {
            days_left++;
          }
        })
      }
    }
  } else {
    // same year
    // if from and to are in the same month
    if (moment(from).format("MM") === moment(to).format("MM")) {
      for (let i = day_from; i < day_to; i++) {
        let date = moment().format(`YYYY-MM-${i}`);
        let work_day = nameOfDay(date);
        filter.forEach(day => {        
          if (work_day === day) {
            days_left++;
          }
        })
      }
    }

    // if from and to are different months
    if (moment(from).format("MM") != moment(to).format("MM")) {
      let month_length = daysInThisMonth(new Date(from));     
      // from now to end of the month
      for (let i = day_from; i < month_length; i++) {
        let date = moment().format(`YYYY-MM-${i}`);
        let work_day = nameOfDay(date);
        filter.forEach(day => {
          if (work_day === day) {
            days_left++;
          }
        })
      }
      // from start of new month to to
      for (let i = 1; i < day_to; i++) {
        let date = moment().format(`YYYY-MM-${i}`);
        let work_day = nameOfDay(date);
        filter.forEach(day => {        
          if (work_day === day) {
            days_left++;
          }
        })
      }
    }
  }  
  return days_left;
}

module.exports = {
  daysInThisMonth,
  formatDate,
  nameOfDay,
  daysLeft
}