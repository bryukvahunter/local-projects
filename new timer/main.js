import { format, intervalToDuration, startOfTomorrow } from "date-fns";

const SELECTORS = {
  FORM: document.querySelector(".form"),
  INPUT_DATE: document.querySelector(".input-date"),
  OUTPUT_BLOCK: document.querySelector(".output-block"),
  TIME: document.querySelector(".time"),
  YEARS: document.querySelector(".years"),
  MONTHS: document.querySelector(".months"),
  DAYS: document.querySelector(".days"),
  HOURS: document.querySelector(".hours"),
  MINUTES: document.querySelector(".minutes"),
  SECONDS: document.querySelector(".seconds"),
};

const DECLENSIONS = {
  YEARS: ["год", "года", "лет"],
  MONTHS: ["месяц", "месяца", "месяцев"],
  DAYS: ["день", "дня", "дней"],
  HOURS: ["час", "часа", "часов"],
  MINUTES: ["минута", "минуты", "минут"],
  SECONDS: ["секунда", "секунды", "секунд"],
};

setMinDate();
let datesInterval;

function getCountTime(event) {
  event.preventDefault();
  datesInterval = clearInterval(datesInterval);
  const calendarTime = SELECTORS.INPUT_DATE.value;
  datesInterval = setInterval(() => {
    const nowTime = new Date();
    const time = intervalToDuration({ start: nowTime, end: calendarTime });
    render(
      time.years,
      time.months,
      time.days,
      time.hours,
      time.minutes,
      time.seconds
    );
    console.log(time);
  }, 1000);
  event.target.reset();
}
SELECTORS.FORM.addEventListener("submit", getCountTime);

function setMinDate() {
  const tomorrowDay = startOfTomorrow();
  console.log(tomorrowDay);
  const formatTomorrowDay = format(tomorrowDay, "yyyy-MM-dd");
  return SELECTORS.INPUT_DATE.setAttribute("min", `${formatTomorrowDay}`);
}

function declineWord(num, type) {
  if (num > 10 && num < 20) {
    return `${num} ${DECLENSIONS[type][2]}`;
  } else {
    switch (num % 10) {
      case 1:
        return `${num} ${DECLENSIONS[type][0]}`;
      case 2:
      case 3:
      case 4:
        return `${num} ${DECLENSIONS[type][1]}`;
      default:
        return `${num} ${DECLENSIONS[type][2]}`;
    }
  }
}

function render(years, months, days, hours, minutes, seconds) {
  years === undefined
    ? (SELECTORS.YEARS.textContent = "")
    : (SELECTORS.YEARS.textContent = `${declineWord(years, "YEARS")}`);
  months === undefined
    ? (SELECTORS.MONTHS.textContent = "")
    : (SELECTORS.MONTHS.textContent = `${declineWord(months, "MONTHS")}`);
  days === undefined
    ? (SELECTORS.DAYS.textContent = "")
    : (SELECTORS.DAYS.textContent = `${declineWord(days, "DAYS")}`);
  hours === undefined
    ? (SELECTORS.HOURS.textContent = "")
    : (SELECTORS.HOURS.textContent = `${declineWord(hours, "HOURS")}`);
  minutes === undefined
    ? (SELECTORS.MINUTES.textContent = "")
    : (SELECTORS.MINUTES.textContent = `${declineWord(minutes, "MINUTES")}`);
  seconds === undefined
    ? (SELECTORS.SECONDS.textContent = "")
    : (SELECTORS.SECONDS.textContent = `${declineWord(seconds, "SECONDS")}`);
}
