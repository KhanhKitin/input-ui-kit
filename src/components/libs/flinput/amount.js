//        ######################################
//        #     Floating Label input           #
//        #     HoangPM                        #
//        ######################################


import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import NumberFormat from 'react-number-format';
import style from '../../../styles.module.css';

const Main = (props) => {
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
      props.changeEvent(text.value)
      setValue(text.value);
    }
    
    if ((text.value !== '')) {
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




  var className = "ah"
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
  return (
    <div id={style.float_label} className={props.disable ? (style.ipt_disable) : ""}>
    {props.loading?<Skeleton width={'100%'} />:null}
     
       <NumberFormat
         className={`${style.formater} form-control`}
         placeholder="0 VNĐ"
         onValueChange={(v) => handleTextChange(v)}
         value={value}
         thousandSeparator={true}
         suffix={' VNĐ'}
         onFocus={props.onFocus}
         required={true}
       />
        
      {props.icon?<div className={style.icon} onClick={()=>onIconClick()}>
        <i className={`fa ${props.icon}`} aria-hidden="true"></i>
      </div>:null}
      {props.dropdown?<div className={style.dropdown}>
        <i className={`fa fa-caret-down`} aria-hidden="true"></i>
      </div>:null}
      <label 
        className={ (isActive || (props.value!=null)) ? (style.Active) : ""}
        htmlFor="inp">
        {props.label||""} {props.required?<span style={{color:"#DA2128"}}>*</span>:""}
      </label>
    </div>
  );
};

export default Main;
