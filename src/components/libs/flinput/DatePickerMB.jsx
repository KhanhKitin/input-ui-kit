import React, { useEffect, useState, useRef } from "react";
import FLInput from "./index.jsx";
import SelectScroller from "./mobilepicker/SelectScroller.jsx"
import moment from 'moment'
import Sheet from 'react-modal-sheet';
import style from '../../../styles.module.css';

const IOSListPicker = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [text, setText] = useState(null);


  const [valueDay, setValueDay] = useState(null);
  const [valueMonth, setValueMonth] = useState(null);
  const [valueYear, setValueYear] = useState(null);


  const [isDrag, setIsDrag] = React.useState(false);
  


const onDataSelected = (data) => {
  setValueCache(data)
}


const openAction = ()=>{
  
  setOpen(true)
}

const filterValue = (vl)=>{
   for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].value === vl) {
          return props.data[i].text
      }
    }
}
const actionSetData = ()=>{
  setValue(valueCache)
  setText(filterValue(valueCache.value))
  setOpen(false)
}





// date logic

const getYears = () => {
  let currentYear = new Date().getFullYear();
  let years = [];

  for (let i = currentYear - 20; i < currentYear + 20; i++) {
    years.push({
      value: i,
      text: i 
    });
  }
  return years;
}

const getMonths = (year) => {
  let months = [];
  for (let i = 1; i <= 12; i++) {
    months.push({
      value: i,
      text: i 
    });
  }
  return months;
}

const getDays = (year, month) => {
  let dayCount = new Date(year,month,0).getDate(); 
  let days = [];

  for (let i = 1; i <= dayCount; i++) {
    days.push({
      value: i,
      text: i
    });
  }

  return days; 
}





  return (

    <div className={ style.ios-list-picker }>
           <FLInput
            loading={props.loading}
            label={props.label}
            hideborder={props.hideborder}
            onFocus={(e) => setOpen(true)}
            readOnly={true}
            value={text}
            required={true}
            dropdown={true}
          />

          <Sheet disableDrag={isDrag} snapPoints={[250]} isOpen={open} onClose={() => setOpen(false)}>
          <Sheet.Container>

            <Sheet.Header>

              <div className={style.date_menu + 'row' }>
                <div className="col-6 l" onClick={()=>setOpen(false)}>Cancel</div>
                <div className="col-6 r" onClick={()=>actionSetData()}>Set</div>
              </div>

            </Sheet.Header>
            <Sheet.Content>

            
            <div className={`${style.calendat_hozirontal} row`}>
              <div className={style.date + " " + style.highlightx3 }></div>


           
              <div className="col-4 pd0">
                <SelectScroller
                 value={valueDay?valueDay.value:null}
                 isInfinite={true}
                 onSelected={setValueDay}
                 isDrag={setIsDrag}
                 source={getDays(2021, 3)||[]}/>
              </div>
              <div className="col-4 pd0">
                <SelectScroller
                 value={valueMonth?valueMonth.value:null}
                 isInfinite={true}
                 onSelected={setValueMonth}
                 isDrag={setIsDrag}
                 source={getMonths(2021)||[]}/>
              </div>
              <div className="col-4 pd0">
                <SelectScroller
                 value={valueYear?valueYear.value:null}
                 isInfinite={true}
                 onSelected={setValueYear}
                 isDrag={setIsDrag}
                 source={getYears()||[]}/>
              </div>

              
            </div>

            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop onClick={()=>{
            setOpen(false)
          }}/>
       </Sheet>




    </div>
  );
};
export default IOSListPicker;
