//        ######################################
//        #     Floating Label input           #
//        #     HoangPM                        #
//        ######################################

import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import valid from "./valid.js";
import style from '../../../styles.module.css';

const Main = (props) => {
  const [value, setValue] = useState(props.value);
  const [isActive, setIsActive] = useState((props.value != "" && props.value != null));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  function handleTextChange(e) {
    var text = e.target.value;
    if (props.disableTyping) {
      return e.preventDefault();
    }

    setValue(text);

    if (props.changeEvent) {
      props.changeEvent(text);
    }

    if (text !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  var className = "ah " + props.position || null;
  if (props.hideborder) {
    className = className + " " + "no_border";
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
  return (
    <div id={style.float_label} className={props.disable ? (style.ipt_disable) : ""}>
      {loading ? <Skeleton width={"100%"} /> : null}

      <Form.Control
        type={props.type ? props.type : "text"}
        readOnly={props.readonly}
        disabled={props.disable}
        value={value || ""}
        placeholder={props.placeholder || ""}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        className={className}
        required={props.required}
        pattern={props.pattern || null}
        autocomplete="false"
        onChange={(e) => handleTextChange(e)}
      />

      {props.icon ? (
        <div className={style.icon}>
          <i className={`fa ${props.icon}`} aria-hidden="true"></i>
        </div>
      ) : null}
      {props.dropdown ? (
        <div className={style.dropdown}>
          <i className={`fa fa-caret-down`} aria-hidden="true"></i>
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
