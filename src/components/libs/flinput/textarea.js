//        ######################################
//        #     Floating Label input           #
//        #     HoangPM                        #
//        ######################################


import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const Main = (props) => {
  const [value, setValue] = useState(props.value);
  const [isActive, setIsActive] = useState(props.value!=null);

  React.useEffect(() => { 
    setValue(props.value)
  }, [props.value]);
  function handleTextChange(text) {
    props.changeEvent(text)
    setValue(text);
    if (text !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }
  return (
    <div id="float-label" className={props.disable?"ipt-disable":""}>
    {props.loading?<Skeleton width={'100%'} height={'100%'} />:null}
      <textarea 
        type="text"
        className="fl-text-area"
        rows="2"
        disabled={props.disable}
        value={value||""}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        className={props.hideborder?"no-border":""}
        onChange={(e) => handleTextChange(e.target.value)}
      />
      {props.icon?<div className="icon">
        <i class={`fa ${props.icon}`} aria-hidden="true"></i>
      </div>:null}
      {props.dropdown?<div className="dropdown">
        <i class={`fa fa-caret-down`} aria-hidden="true"></i>
      </div>:null}
      <label 
        className={ (isActive || props.value!=null) ? "Active" : ""}
        htmlFor="inp">
        {props.label||""} {props.required?<span style={{color:"#DA2128"}}>*</span>:""}
      </label>
    </div>
  );
};

export default Main;
