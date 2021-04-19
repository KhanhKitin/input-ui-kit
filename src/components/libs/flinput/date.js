import React, { useEffect, useState } from "react";
import Popover from "react-popover";
import PopSelectDate from "./datepicker.js";
import FLInput from "./format.jsx";
import style from "../../../styles.module.css";

const DateInput = (props) => {
  const [openDate, setOpenDate] = useState(false);
  const [dateValue, setDateValue] = useState(props.value);

  useEffect(()=>{
    setDateValue(props.value);
  },[props.value])

  const dateSelect = (vl) => {
    if (vl) {
      setDateValue(
        `${vl.day < 10 ? `0${vl.day}` : vl.day}/${
          vl.month < 10 ? `0${vl.month}` : vl.month
        }/${vl.year}`
      );
    }
    setTimeout(() => {
      props.changeEvent(
        `${vl.day < 10 ? `0${vl.day}` : vl.day}/${
          vl.month < 10 ? `0${vl.month}` : vl.month
        }/${vl.year}`
      );
      setOpenDate(false);
    }, 200);
  };

  const formatdate = (indate) => {
    const a = indate.split("/");
    return {
      year: a[2] * 1,
      month: a[1] * 1,
      day: a[0] * 1,
    };
  };

  const popoverPropsDate = {
    isOpen: openDate,
    place: props.place || "below",
    preferPlace: "right",
    onOuterAction: () => setOpenDate(false),
    body: [
      <PopSelectDate
        selectedDay={dateValue ? formatdate(dateValue) : props.selectedDay}
        minimumDate={props.minimumDate}
        maximumDate={props.maximumDate}
        label={props.label}
        dateSelect={dateSelect}
      />,
    ],
  };

  const changeEvent = (data) => {
    setDateValue(data);
  };

  return (
    <Popover {...popoverPropsDate}>
      <FLInput
        loading={props.loading}
        readonly={true}
        label={props.label || "Ngày sinh"}
        onFocus={(e) => setOpenDate(true)}
        readOnly={true}
        value={dateValue}
        changeEvent={changeEvent}
        required={props.required != undefined ? props.required : true}
        icon="far fa-calendar-alt"
        hideborder={props.hideborder}
        disable={props.disable}
        leftPosition={props.leftPosition}
      />
    </Popover>
  );
};
export default DateInput;
