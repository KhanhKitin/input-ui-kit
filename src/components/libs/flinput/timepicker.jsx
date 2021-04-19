//        ######################################
//        #     Floating Label input           #
//        #     HoangPM                        #
//        ######################################


import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import NumberFormat from 'react-number-format';

const TimePickerInput = (props) => {
  const [value, setValue] = useState(null);
  const [isActive, setIsActive] = useState(props.value!=null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => { 
      if(props.value!=value){
        setValue(props.value)
      }
  }, [props.value]);

   useEffect(() => { 
    setLoading(props.loading)
  }, [props.loading]);



  function handleTextChange(text) {
    if(props.changeEvent){
      props.changeEvent(text.formattedValue)
      setValue(text.formattedValue);
    }
    
    if ((text.formattedValue !== '')) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  const onIconClick = ()=>{
    if(props.onIconClick){
      props.onIconClick()
    }
  }


function limit(val, max) {
  if (val.length === 1 && val[0] > max[0]) {
    val = '0' + val;
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      val = '00';

    //this can happen when user paste number
  } else if (val > max) {
      val = max;
    }
  }

  return val;
}



function timeFormat(val) {
  let hours = limit(val.substring(0, 2), '23');
  let minutes = limit(val.substring(2, 4), '60');
 

  return hours + (minutes.length ? ':' + minutes : '');
}



  var className = "formater form-control"
  if(props.hideborder){
    className = className+" no-border"
  }
  if(props.icon){
    className = className+" has-icon"
  }
  if(props.isUpperCase){
    className = className+" has-uppercase"
  }
  if(props.line){
    className = className+" text-line-through"
  }
  if (props.rightPosition) {
    className = className + " no-border-left";
  }
  return (
    <div id="float-label" className={props.disable?"ipt-disable":""}>
    {props.loading?<Skeleton width={'100%'} />:null}
     
       <NumberFormat
         className={className}
         // format="##/##/####"
         placeholder="hh:mm"
         mask={['h', 'h', 'm', 'm']}
         onValueChange={(v) => handleTextChange(v)}
         value={value}
         format={timeFormat}
         required={true}
       />
        
      <div className="icon" onClick={()=>onIconClick()}>
        <i class={`fa fa-clock`} aria-hidden="true"></i>
      </div>
      {props.dropdown?<div className="dropdown">
        <i class={`fa fa-caret-down`} aria-hidden="true"></i>
      </div>:null}
      <label 
        className={ (isActive || (props.value!=null)) ? "Active" : ""}
        htmlFor="inp">
        {props.label||""} {props.required?<span style={{color:"#DA2128"}}>*</span>:""}
      </label>
    </div>
  );
};

export default TimePickerInput;
