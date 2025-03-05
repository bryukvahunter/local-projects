import { format, compareAsc, intervalToDuration } from "date-fns";
import { el } from "date-fns/locale";

const form = document.querySelector(".form");
const timeInput = document.querySelector(".input-date");
const timeOutputBlock = document.querySelector(".output-time-block");

const DECLENSIONS = {
  YEAR: ["год", "года", "лет"],
  MONTHS: ["месяц", "месяца", "месяцев"],
  DAYS: ["день", "дня", "дней"],
  HOURS: ["час", "часа", "часов"],
  MINUTES: ["минута", "минуты", "минут"],
  SECONDS: ["секунда", "секунды", "секунд"],
};

function getCountTime(event) {
  event.preventDefault();
  const calendarTime = timeInput.value;

  timeOutputBlock.appendChild(createElement());

  const datesInterval = setInterval(() => {
    const newElem = document.querySelector(".time");
    const nowTime = new Date();
    if (compareAsc(calendarTime, nowTime) === 1) {
      const time = intervalToDuration({ start: nowTime, end: calendarTime });

      if (time.seconds === undefined) {
        time.seconds = "0";
      }

      if (time.years === undefined) {
        time.years = "";
        newElem.textContent = `
      ${getDeclension(time.months, "MONTHS")} 
      ${getDeclension(time.days, "DAYS")} 
      ${getDeclension(time.hours, "HOURS")} 
      ${getDeclension(time.minutes, "MINUTES")} 
      ${getDeclension(time.seconds, "SECONDS")}`;
      } else {
        newElem.textContent = `
      ${getDeclension(time.years, "YEAR")}
      ${getDeclension(time.months, "MONTHS")}
      ${getDeclension(time.days, "DAYS")}
      ${getDeclension(time.hours, "HOURS")}
      ${getDeclension(time.minutes, "MINUTES")}
      ${getDeclension(time.seconds, "SECONDS")}`;
      }
      if (time.months === undefined) {
        time.months = "";
        newElem.textContent = `
      ${getDeclension(time.days, "DAYS")} 
      ${getDeclension(time.hours, "HOURS")} 
      ${getDeclension(time.minutes, "MINUTES")} 
      ${getDeclension(time.seconds, "SECONDS")}`;
      }
      if (time.days === undefined) {
        time.days = "";
        newElem.textContent = `
      ${getDeclension(time.hours, "HOURS")} 
      ${getDeclension(time.minutes, "MINUTES")} 
      ${getDeclension(time.seconds, "SECONDS")}`;
      }
      if (time.hours === undefined) {
        time.hours = "";
        newElem.textContent = `
      ${getDeclension(time.minutes, "MINUTES")} 
      ${getDeclension(time.seconds, "SECONDS")}`;
      }
      if (time.minutes === undefined) {
        time.minutes = "";
        newElem.textContent = `
      ${getDeclension(time.seconds, "SECONDS")}`;
      }
    } else {
      console.log("not hello");
      clearInterval(datesInterval);
      return;
    }
  }, 1000);

  event.target.reset();
}
form.addEventListener("submit", getCountTime);

function createElement() {
  const showTimeBlock = document.createElement("div");
  showTimeBlock.classList.add("time");
  return showTimeBlock;
}

function getDeclension(amount, type) {
  switch (amount) {
    case 1:
    case 21:
    case 31:
    case 41:
    case 51:
    case 61:
      return `${amount} ${DECLENSIONS[type][0]}`;
    case 2:
    case 22:
    case 32:
    case 42:
    case 52:
    case 62:
    case 3:
    case 23:
    case 33:
    case 43:
    case 53:
    case 63:
    case 4:
    case 24:
    case 34:
    case 44:
    case 54:
    case 64:
      return `${amount} ${DECLENSIONS[type][1]}`;
    default:
      return `${amount} ${DECLENSIONS[type][2]}`;
  }
}

// function getDeclension(amount, type) {
//   if (amount === 1 || 21 || 31 || 41 || 51 || 61) {
//     return `${amount} ${DECLENSIONS[type][0]}`;
//   } else if (amount === 2 || 22 || 32 || 42 || 52 || 62) {
//     return `${amount} ${DECLENSIONS[type][1]}`;
//   } else if (amount === 3 || 23 || 33 || 43 || 53 || 63) {
//     return `${amount} ${DECLENSIONS[type][1]}`;
//   } else if (amount === 4 || 24 || 34 || 44 || 54 || 64) {
//     return `${amount} ${DECLENSIONS[type][1]}`;
//   } else {
//     return `${amount} ${DECLENSIONS[type][2]}`;
//   }
// }

// function render(time) {
//   const renderTime = document.querySelector(".time");
//   return (renderTime.textContent = time);
// }

// switch (undefined) {
//   case time.years:
//     time.years = "";
//     break;
//   case time.months:
//     time.months = "";
//     break;
//   case time.days:
//     time.days = "";
//     break;
//   case time.hours:
//     time.hours = "";
//     break;
//   case time.minutes:
//     time.minutes = "";
//     break;
//   case time.seconds:
//     time.seconds = "";
//     break;
// }

// ${getDeclension(time.years, DECLENSIONS.YEAR)}
// ${getDeclension(time.months, DECLENSIONS.MONTHS)}
// ${getDeclension(time.days, DECLENSIONS.DAYS)}
// ${getDeclension(time.hours, DECLENSIONS.HOURS)}
// ${getDeclension(time.minutes, DECLENSIONS.MINUTES)}
// ${getDeclension(time.seconds, DECLENSIONS.SECONDS)}`;

// timeOutputBlock.appendChild(
//   createElement(
//     time.years,
//     time.months,
//     time.days,
//     time.hours,
//     time.minutes,
//     time.seconds
//   )
// );

// const timeInterval = intervalToDuration({
//   start: nowTime,
//   end: calendarTime,
// });
// console.log(timeInterval);

// function intervalDates(now, future) {
//   const interval = setInterval(function () {});
// }

// const formatDist = formatDistanceStrict(new Date(2025, 1, 24), new Date());
// const ttt = formatDistanceToNowStrict(new Date(2025, 1, 25));

// function countDown(time) {
//   console.log(time);
//   const timeoutId = setTimeout(countDown, 1000, --time);

//   if (time === 0) {
//     clearTimeout(timeoutId);
//     return console.log("time is up");
//   }
// }

function secInterval(minute, counter) {
  let min = setInterval(() => {
    --minute;
    // console.log("Идет счет секунд");
    if (minute === 0) {
      clearInterval(minute);
      clearInterval(counters);
    }
  }, 60000);

  let counters = setInterval(() => {
    counter++;
    console.log(counter);
    if (counter === 60) {
      counter = 0;
      console.log("Прошла минута", minute);
    }
  }, 1000);
}
// secInterval(1, 0);

// function testInterval(second, counter) {
//   let seconds = setInterval(() => {
//     --second;
//     console.log("Идет счет секунд");
//     if (second === 0) {
//       clearInterval(seconds);
//       clearInterval(counters);
//     }
//   }, 1000);

//   let counters = setInterval(() => {
//     counter++;
//     console.log(counter);
//     if (counter === 5) {
//       counter = 0;
//       console.log(second);
//     }
//   }, 1000);
// }
