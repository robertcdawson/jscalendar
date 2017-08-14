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

  // create dayNum div elements for all days of month
  let dayNum;
  let currentMonthDataValues = Object.values(currentMonthData());
  let daysToAddToCalendar = firstDayOfCurrentMonth + numberOfDaysInCurrentMonth;

  // create templated div with day number
  let makeDayNumDiv = (dayNumTextValue) => {

    let dayNumText;

    dayNum = document.createElement("div");
    dayNum.setAttribute("class", "dayNum");

    if (dayNumTextValue) {
      dayNumText = document.createTextNode(dayNumTextValue);
      dayNum.appendChild(dayNumText);
    }

  };

  // generate day headings
  let makeCalendarHeadings = () => {

    let dayNumHeading;
    let dayHeadings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < dayHeadings.length; i++) {
      dayNumHeading = document.createElement("div");
      dayNumHeading.setAttribute("class", "dayNumHeading");
      dayNumHeadingText = document.createTextNode(dayHeadings[i]);
      dayNumHeading.appendChild(dayNumHeadingText);
      calendarDiv.insertBefore(dayNumHeading, null);
    }

  };

  makeCalendarHeadings();

  // generate day divs with day numbers if applicable for current month
  for (let i = 0; i < daysToAddToCalendar; i++) {

    if (i >= firstDayOfCurrentMonth) {
      makeDayNumDiv(i - 1);
    }
    else {
      makeDayNumDiv();
    }

    calendarDiv.insertBefore(dayNum, dayNum[i]);

  }

};

makeCalendarUI(getCurrentMonthData);
