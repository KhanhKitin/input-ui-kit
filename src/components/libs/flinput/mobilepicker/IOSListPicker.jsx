import React, { useEffect, useState, useRef } from "react";
import FLInput from "../index.jsx";
import SelectScroller from "./SelectScroller.jsx"
import moment from 'moment'
import Sheet from 'react-modal-sheet';

const IOSListPicker = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [text, setText] = useState(null);
  const [valueCache, setValueCache] = useState(null);
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
  return (

    <div className="ios-list-picker">
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

              <div className="date-menu row">
                <div className="col-6 l" onClick={()=>setOpen(false)}>Cancel</div>
                <div className="col-6 r" onClick={()=>actionSetData()}>Set</div>
              </div>

            </Sheet.Header>
            <Sheet.Content>

            
            <div className="calendat-hozirontal row">
              <div className="date highlightx3"></div>


           
              <div className="col-12 pd0">
                <SelectScroller
                 value={value?value.value:null}
                 isInfinite={false}
                 onSelected={onDataSelected}
                 isDrag={setIsDrag}
                 source={props.data||[]}/>
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
