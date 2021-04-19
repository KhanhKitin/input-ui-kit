//        ######################################
//        #     Floating Label input           #
//        #     HoangPM                        #
//        ######################################

import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import NumberFormat from "react-number-format";
import valid from "./valid.js";
import style from "../../../styles.module.css";

const Main = (props) => {
  const [value, setValue] = useState("");
  const [isActive, setIsActive] = useState((props.value != "" && props.value != null));
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (props.value != value) {
      setValue(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  function handleTextChange(text) {
    if (props.changeEvent) {
      if (text.value.length == 8) {
        props.changeEvent(text.formattedValue);
        setValue(text.formattedValue);
      }
    }

    if (text.formattedValue !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  const onIconClick = () => {
    if (props.onIconClick) {
      props.onIconClick();
    }
  };

  function limit(val, max) {
    if (val.length === 1 && val[0] > max[0]) {
      val = "0" + val;
    }

    if (val.length === 2) {
      if (Number(val) === 0) {
        val = "01";

        //this can happen when user paste number
      } else if (val > max) {
        val = max;
      }
    }

    return val;
  }

  function limityear(val, max) {
    if (val.length === 1 && val[0] > max[0]) {
      val = "0" + val;
    }

    if (val.length === 2) {
      if (Number(val) === 0) {
        val = "01";

        //this can happen when user paste number
      } else if (val > max) {
        val = max;
      }
    }

    return val;
  }

  function dateFormat(val) {
    let day = limit(val.substring(0, 2), "31");
    let month = limit(val.substring(2, 4), "12");
    let year = limityear(val.substring(4, 8), "2030");

    return (
      day + (month.length ? "/" + month : "") + (year.length ? "/" + year : "")
    );
  }

  var className = "formater form-control";
  if (props.hideborder) {
    className = className + " no-border";
  }
  if (props.icon) {
    className = className + " has-icon";
  }
  if (props.isUpperCase) {
    className = className + " has-uppercase";
  }
  if (props.line) {
    className = className + " text-line-through";
  }
  if (props.leftPosition) {
    className = className + " no-border-right";
  }
  return (
    <div id={style.float_label} className={props.disable ? (style.ipt_disable) : ""}>
      {props.loading ? <Skeleton width={"100%"} /> : null}

      <NumberFormat
        className={className}
        // format="##/##/####"
        placeholder="DD/MM/YYYY"
        mask={["D", "D", "M", "M", "Y", "Y", "Y", "Y"]}
        onValueChange={(v) => handleTextChange(v)}
        value={value}
        format={dateFormat}
        onFocus={props.onFocus}
        required={props.required != undefined ? props.required : true}
        disabled={props.disable}
      />

      {props.icon ? (
        <div className="icon" onClick={() => onIconClick()}>
          <i class={`fa ${props.icon}`} aria-hidden="true"></i>
        </div>
      ) : null}
      {props.dropdown ? (
        <div className={style.dropdown}>
          <i class={`fa fa-caret-down`} aria-hidden="true"></i>
        </div>
      ) : null}
      <label
        className={isActive || (props.value != "" && props.value != null) ? (style.Active) : ""}
        htmlFor="inp"
      >
        {props.label || ""}{" "}
        {props.required ? <span style={{ color: "#DA2128" }}>*</span> : ""}
      </label>
    </div>
  );
};

export default Main;
