import React, { useEffect, useState, useRef } from "react";
import FLInput from "../index.js";
import SelectScroller from "./SelectScroller.jsx"
import moment from 'moment'
import Sheet from 'react-modal-sheet';
import Network from "../../../services/Network.js";
import { PulseSpinner } from "react-spinners-kit";


const api = new Network();

const IOSListPicker = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [text, setText] = useState(null);
  const [valueCache, setValueCache] = useState(null);
  const [isDrag, setIsDrag] = React.useState(false);
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("Chọn Tỉnh / TP");

  const [listTP, setListTp] = useState([]);
  const [listQH, setListQh] = useState([]);
  const [listPX, setListPx] = useState([]);


  const [valueTP, setValueTP] = useState(null);
  const [valueQH, setValueQH] = useState(null);
  const [valuePX, setValuePX] = useState(null);




  
  

useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) {
      if(listTP.length==0){
        initCity()
      }
    }
    return () => isSubscribed = false
  },[props]);



const initCity = async ()=>{
  setLoading(true)
  try{
      const tp = await api.get(`/api/location/1/0`)
      if(tp.data[0]){
        setListTp([...tp.data[0]])
      }
      setLoading(false)
    }catch(e){
      setLoading(false)
      console.log(e) 
    }
  }


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


const onSelectTP = async (nation, name)=>{
  setLoading(true)
  setValueTP({name:name, nation:nation})
  const qh = await api.get(`/api/location/2/${nation}`)
  if(qh.data[0]){
    setStep(1)
    setListQh(qh.data[0])
    setTitle("Chọn Quận / Huyện")
  }
  setLoading(false)
}

const onSelectQH = async (nation, name)=>{
  setLoading(true)
  setValueQH({name:name, nation:nation})
  const px = await api.get(`/api/location/3/${nation}`)
    if(px.data[0]){
      setStep(2)
      setListPx([...px.data[0]])
      setTitle("Chọn Phường / Xã")
    }
  setLoading(false)
}

const onSelectPX = (nation, name)=>{
  const value_address = valueTP.name +" - "+ valueQH.name +" - "+ name
    const obj_address = {
      label: value_address,
      prov: valueTP.nation,
      dist: valueQH.nation,
      ward: nation
    }
    setText(value_address)
    setOpen(false)

}

const back = ()=>{
  setStep(step - 1)
  if(step == 2){
     setTitle("Chọn Quận / Huyện")
  }
  if(step == 1){
     setTitle("Chọn Tỉnh / TP")
  }
}
return (

    <div className={style.ios_list_picker}>
           <FLInput
            loading={props.loading}
            label={props.label}
            onFocus={(e) => {
              setOpen(true)
              setStep(0)
              setTitle("Chọn Tỉnh / TP")
            }}
            readOnly={true}
            value={text}
            required={true}
            dropdown={true}
          />

          <Sheet disableDrag={isDrag} snapPoints={[550]} isOpen={open} onClose={() => setOpen(false)}>
          <Sheet.Container>

            <Sheet.Header>

              <div className={`${style.address_menu} row`}>
                <div className={style.lb_name}>
                  <span>{title}</span>
                </div>

                {step==0?<div className="col-6 l" onClick={()=>setOpen(false)}> Cancel</div>:<div className="col-6 l" onClick={()=>back()}> <i class="fas fa-chevron-left"></i></div>}
                <div className="col-6 r" onClick={()=>actionSetData()}>Set</div>
              
              </div>

            </Sheet.Header>
            <Sheet.Content>

            
            <div className={style.address_picker_mobile}>
              <div className={style.top_s_form}>
                <div className={style.sform}>
                  <input type="text" placeholder="Nhập để tìm kiếm" value=""/>
                  <img src="/img/search-vector.svg"/>
                </div>
              </div>

              <div className={`${style.address_listed} step${step}`}>
                <ul>
                  {listTP.map((item, index)=>{
                    return (<li onClick={()=>onSelectTP(item.PROVINCE_CODE, item.PROVINCE_NAME)}>{item.PROVINCE_NAME}</li>)
                  })}
                </ul>
                 <ul>
                  {listQH.map((item, index)=>{
                    return (<li onClick={()=>onSelectQH(item.DISTRICT_CODE, item.DISTRICT_NAME)}>{item.DISTRICT_NAME}</li>)
                  })}
                </ul>
                 <ul>
                  {listPX.map((item, index)=>{
                    return (<li onClick={()=>onSelectPX(item.WARD_CODE, item.WARD_NAME)}>{item.WARD_NAME}</li>)
                  })}
                </ul>

                
              </div>

              {loading&&<div className={style.loading_ad_container}>
                  <div className={style.loading_ad}><PulseSpinner color={"#16a085"}/></div>
                </div>}


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
