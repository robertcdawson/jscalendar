// get current month
let getCurrentMonthData = (datePassed) => {

  // get first day of current month
  let currentYear = datePassed.getFullYear();
  let currentMonth = datePassed.getMonth();
  let currentDayNumber = datePassed.getDate();
  let firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1);

  // get day of week for first day of current month
  let firstDayOfWeekOfCurrentMonth = firstDayOfCurrentMonth.getDay();

  // get number of days in current month
  let numberOfDaysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  return {
    monthNumber: currentMonth,
    currentYear: currentYear,
    firstDayOfWeekOfCurrentMonth: firstDayOfWeekOfCurrentMonth,
    numberOfDaysInCurrentMonth: numberOfDaysInCurrentMonth,
  };

};

let makeCalendarUI = (currentMonthData) => {

  let monthNumber = currentMonthData.monthNumber;
  let currentYear = currentMonthData.currentYear;
  let firstDayOfCurrentMonth = currentMonthData.firstDayOfWeekOfCurrentMonth;
  let numberOfDaysInCurrentMonth = currentMonthData.numberOfDaysInCurrentMonth;

  // get calendar container
  let calendarDiv = document.getElementById("calendar");

  let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let monthNameContainer = document.createElement("h1");
  monthNameContainer.setAttribute("id", "monthName");
  let monthNameContainerText = document.createTextNode(monthNames[monthNumber] + " " + currentYear);
  monthNameContainer.appendChild(monthNameContainerText);
  document.body.insertBefore(monthNameContainer, calendarDiv);

  // create dayNum div elements for all days of month
  let dayNum;
  let currentMonthDataValues = Object.values(currentMonthData);
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

  let dayCounter = 1;
  // generate day divs with day numbers if applicable for current month
  for (let i = 0; i < daysToAddToCalendar; i++) {

    if (i >= firstDayOfCurrentMonth) {
      makeDayNumDiv(dayCounter++);
    }
    else {
      makeDayNumDiv();
    }

    calendarDiv.insertBefore(dayNum, dayNum[i]);

  }

};

// get current date
let currentDate = new Date();

let makePreviousMonthLink = () => {

  let lastMonth;

  // set last month link
  let lastMonthLink = document.createElement("a");
  lastMonthLink.setAttribute("id", "lastMonthLink");
  lastMonthLink.setAttribute("href", "#");
  let lastMonthLinkText = document.createTextNode("< Previous Month");
  lastMonthLink.appendChild(lastMonthLinkText);
  document.body.insertBefore(lastMonthLink, null);

  lastMonthLink.addEventListener("click", (event) => {

    event.preventDefault();

    lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

    currentDate = new Date(lastMonth);

    let datePassedLastMonth = getCurrentMonthData(currentDate);

    document.getElementById("calendar").textContent = "";
    document.getElementById("monthName").remove();

    makeCalendarUI(datePassedLastMonth);

  });

};

let makeNextMonthLink = () => {

  let nextMonth;

  // set next month link
  let nextMonthLink = document.createElement("a");
  nextMonthLink.setAttribute("id", "nextMonthLink");
  nextMonthLink.setAttribute("href", "#");
  let nextMonthLinkText = document.createTextNode("Next Month >");
  nextMonthLink.appendChild(nextMonthLinkText);
  document.body.insertBefore(nextMonthLink, null);

  nextMonthLink.addEventListener("click", (event) => {

    event.preventDefault();

    nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

    currentDate = new Date(nextMonth);

    let datePassedNextMonth = getCurrentMonthData(currentDate);

    document.getElementById("calendar").textContent = "";
    document.getElementById("monthName").remove();

    makeCalendarUI(datePassedNextMonth);

  });

};

makePreviousMonthLink();
makeNextMonthLink();

let datePassed = getCurrentMonthData(currentDate);

makeCalendarUI(datePassed);
