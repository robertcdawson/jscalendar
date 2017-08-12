// get current month
let getCurrentMonthData = () => {

  // get current date
  let currentDate = new Date();

  // get first day of current month
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  let currentDayNumber = currentDate.getDate();
  let firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1);

  // get day of week for first day of current month
  let firstDayOfWeekOfCurrentMonth = firstDayOfCurrentMonth.getDay();

  // get number of days in current month
  let numberOfDaysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // let currentMonthData = {};

  // loop from 1 to number of days in current month
  // let currentDayOfWeekInLoop = firstDayOfWeekOfCurrentMonth;
  // for (let i = 0; i < numberOfDaysInCurrentMonth; i++) {
  //   currentDayOfWeekInLoop = firstDayOfWeekOfCurrentMonth + i;
  //   if (currentDayOfWeekInLoop > 6) {
  //     currentDayOfWeekInLoop = currentDayOfWeekInLoop % 7;
  //   }
  //   currentMonthData["day" + (i+1)] = currentDayOfWeekInLoop;
  // }

  // return currentMonthData;
  return {
    firstDayOfWeekOfCurrentMonth: firstDayOfWeekOfCurrentMonth,
    numberOfDaysInCurrentMonth: numberOfDaysInCurrentMonth,
  };

};

let makeCalendarUI = (currentMonthData) => {

  let firstDayOfCurrentMonth = currentMonthData().firstDayOfWeekOfCurrentMonth;
  let numberOfDaysInCurrentMonth = currentMonthData().numberOfDaysInCurrentMonth;

  // get calendar container
  let calendarDiv = document.getElementById("calendar");
  // get dayNum div, inside calendar container, that holds day of week
  let dayNum = document.getElementsByClassName("dayNum")[0];
  let allDayNums = document.getElementsByClassName("dayNum");

  // get length/size of currentMonthData object
  // let currentMonthDataLength = Object.keys(currentMonthData()).length;

  // create dayNum div elements for all days of month
  let dayNumClone, dayNumText;
  let currentMonthDataValues = Object.values(currentMonthData());

  let daysToAddToCalendar = firstDayOfCurrentMonth + numberOfDaysInCurrentMonth;

  for (let i = 0; i < daysToAddToCalendar; i++) {
    dayNumClone = allDayNums[i].cloneNode(true);
    if (i >= firstDayOfCurrentMonth) {
      dayNumText = document.createTextNode(i - 1);
      dayNumClone.appendChild(dayNumText);
    }
    calendarDiv.insertBefore(dayNumClone, allDayNums[i]);
  }
  // remove statically placed initial dayNum div
  dayNum.remove();

  // let dayNumText = document.createTextNode(i+1);
  // dayNumClone.appendChild(dayNumText);

};

makeCalendarUI(getCurrentMonthData);
