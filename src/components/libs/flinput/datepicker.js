//        ######################################
//        #     Floating Pophover              #
//        #     HoangPM                        #
//        ######################################

import React, { useEffect, useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import style from '../../../styles.module.css';

const Main = (props) => {
  const [selectedDay, setSelectedDay] = useState(props.selectedDay);
  const itemSelect = (date) => {
    setSelectedDay(date);
    setTimeout(() => {
      props.dateSelect(date);
    }, 100);
  };

  const myCustomLocale = {
    // months list by order
    months: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    // week days by order
    weekDays: [
      {
        name: "Sunday", // used for accessibility
        short: "Th2", // displayed at the top of days' rows
        isWeekend: true, // is it a formal weekend or not?
      },
      {
        name: "Monday",
        short: "Th3",
      },
      {
        name: "Tuesday",
        short: "Th4",
      },
      {
        name: "Wednesday",
        short: "Th5",
      },
      {
        name: "Thursday",
        short: "Th6",
      },
      {
        name: "Friday",
        short: "Th7",
      },
      {
        name: "Saturday",
        short: "CN",
        isWeekend: true,
      },
    ],
    // just play around with this number between 0 and 6
    weekStartingIndex: 0,
    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
      return gregorainTodayObject;
    },

    // return a native JavaScript date here
    toNativeDate(date) {
      return new Date(date.year, date.month - 1, date.day);
    },
    // return a number for date's month length
    getMonthLength(date) {
      return new Date(date.year, date.month, 0).getDate();
    },
    // return a transformed digit to your locale
    transformDigit(digit) {
      return digit;
    },
    // texts in the date picker
    nextMonth: "Next Month",
    previousMonth: "Previous Month",
    openMonthSelector: "Open Month Selector",
    openYearSelector: "Open Year Selector",
    closeMonthSelector: "Close Month Selector",
    closeYearSelector: "Close Year Selector",
    defaultPlaceholder: "Select...",
    // for input range value
    from: "from",
    to: "to",
    // used for input value when multi dates are selected
    digitSeparator: ",",

    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,

    // is your language rtl or ltr?
    isRtl: false,
  };

  return (
    <div className={style.float_pophover}>
      <div className={style.popheader}>
        <p className={style.stitle}>{props.label}</p>
      </div>
      <div className={`${style.select_body} ${style.datw}`}>
        <Calendar
          value={selectedDay}
          onChange={itemSelect}
          maximumDate={props.maximumDate || null}
          minimumDate={props.minimumDate || null}
          locale={myCustomLocale}
          shouldHighlightWeekends
        />
      </div>
    </div>
  );
};

export default Main;
