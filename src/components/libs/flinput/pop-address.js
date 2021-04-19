//        ######################################
//        #     Floating Pophover              #
//        #     HoangPM                        #
//        ######################################

import React, { useEffect, useState } from "react";
import api from "../../../services/Network.js";
import { StageSpinner } from "react-spinners-kit";

var listCache = {}
const Main = (props) => { 
  const [mode, setMode] = useState(props.mode||0);


  const [loading, setLoading] = useState(true);

  const [valueTP, setValueTP] = useState(null);
  const [valueQH, setValueQH] = useState(null);
  const [valuePX, setValuePX] = useState(null);

  const [country, setCountry] = useState(null);
  const [step, setStep] = useState(0);
  const [stitle, setStitle] = useState("Chọn Tỉnh / TP");

  const [listTP, setListTp] = useState([]);
  const [listQH, setListQh] = useState([]);
  const [listPX, setListPx] = useState([]);

  const [searchvalue, setSearchValue] = useState("");
  const [clTP, setClTP] = useState("ul-select location");
  const [clQH, setClQH] = useState("ul-select location");
  const [clPX, setClPX] = useState("ul-select location");

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
     const tp = await api.get(`/api/location/1/0`)
      if(tp.data[0]){
        setListTp([...tp.data[0]])
      }
      setLoading(false)
  }

  const itemClickTP = async (nation, name)=>{
    if(mode==1){
      const value_address = name
      const obj_address = {
        label: value_address,
        prov: nation,
        dist: null,
        ward: null
      }
      props.addressSelect(obj_address)
    }else{
      setSearchValue("")
      setClTP("ul-select location animate__animated animate__fadeOutLeft")
      setClQH("ul-select location animate__animated animate__fadeInRight")
      setStitle("Bạn ở Quận/ Huyện nào?")
      setLoading(true)
      const qh = await api.get(`/api/location/2/${nation}`)
      if(qh.data[0]){
        setListQh(qh.data[0])
      }
      setLoading(false)
      setStep(1)
      setValueTP({name:name, nation:nation})
    }
    
  }
  const itemClickQH = async (nation, name)=>{
    setSearchValue("")
    setClQH("ul-select location animate__animated animate__fadeOutLeft")
    setClPX("ul-select location animate__animated animate__fadeInRigh")
    setStitle("Bạn ở Phường/Xã nào?")
    setLoading(true)
    const px = await api.get(`/api/location/3/${nation}`)
    if(px.data[0]){
      setListPx([...px.data[0]])
    }
    setLoading(false)
    setStep(2)
    setValueQH({name:name, nation:nation})
  }
  const itemClickPX = (nation, name)=>{
    setSearchValue("")
    setValuePX({name:name, nation:nation})
    const value_address = valueTP.name +" - "+ valueQH.name +" - "+ name
    const obj_address = {
      label: value_address,
      prov: valueTP.nation,
      dist: valueQH.nation,
      ward: nation
    }
    props.addressSelect(obj_address)
  }

  const back = ()=>{
    if(step==1){
      setStep(0)
      setValueTP(null)
      setStitle("Chọn Tỉnh / TP")
      setClTP("ul-select location animate__animated animate__fadeInLeft")
      setClQH("ul-select location animate__animated animate__fadeOutRight")
    }else if(step==2){
      setStep(1)
      setValueQH(null)
      setStitle("Bạn ở Quận/ Huyện nào?")
      setClQH("ul-select location animate__animated animate__fadeInLeft")
      setClPX("ul-select location animate__animated animate__fadeOutRight")
    }

  }



  const removeAccents = (str) => {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"    
  ];
  for (var i=0; i<AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}

const filterFunction = (name, value) =>{
  const l1 = removeAccents(name.toString()).toLowerCase()
  const l2 = removeAccents(value).toLowerCase()
  return (l1.includes(l2))
}

  const onsearchChange = (e)=>{
    setSearchValue(e.target.value)
    if(step==0){
     var filtered = listCache.filter(obx => {
        const vl = obx.PROVINCE_NAME
        return filterFunction(vl, e.target.value)
       }); 
     setListTp(filtered)
    }else if(step==1){
      var filtered = listCache.filter(obx => {
        const vl = obx.DISTRICT_NAME
        return filterFunction(vl, e.target.value)
       }); 
     setListQh(filtered)
    }else if(step==2){
      var filtered = listCache.filter(obx => {
        const vl = obx.WARD_NAME
        return filterFunction(vl, e.target.value)
       }); 
     setListPx(filtered)
    }

  }

  const onSearchFocus = (e)=>{
    if(step==0){
      listCache = listTP
    }else if(step==1){
      listCache = listQH
    }else if(step==2){
      listCache = listPX
    }
  }
  const onSearchBlur = (e)=>{
  }


  return (
    <div className="float-pophover">
        <div className="popheader">
        	{(step > 0)?<div>
        		<div className="backpopup" onClick={()=>back()}><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
        		<p className="country-name">{valueTP?`${valueTP.name}`:null}{valueQH?` - ${valueQH.name}`:null}{valuePX?` - ${valuePX.name}`:null}</p>
        		</div>:null}
        	<p className="stitle">{stitle}</p>
        	<div className="sform">
        		<input type="text" placeholder="Nhập để tìm kiếm" value={searchvalue} onChange={onsearchChange} onFocus={onSearchFocus} onBlur={onSearchBlur}/>
        		<img src="/img/search-vector.svg" />
        	</div>
        </div>
        <div className="select-body">
          {loading?<div className="mk-loading"><StageSpinner color={"#329945"}/></div>:null}

        	<ul className={clTP}>
        		
          { listTP.map((item, index)=>{
            return (<li onClick={(e)=>itemClickTP(item.PROVINCE_CODE, item.PROVINCE_NAME)}>
                {item.PROVINCE_NAME}
            </li>)
          })
          } 
        	</ul>
          <ul className={clQH}>
            
          { listQH.map((item, index)=>{
            return (<li onClick={(e)=>itemClickQH(item.DISTRICT_CODE, item.DISTRICT_NAME)}>
                {item.DISTRICT_NAME}
            </li>)
          })
          } 
          </ul>
          <ul className={clPX}>
            
          { listPX.map((item, index)=>{
            return (<li onClick={(e)=>itemClickPX(item.WARD_CODE, item.WARD_NAME)}>
                {item.WARD_NAME}
            </li>)
          })
          } 
          </ul>

        	

        </div>
    </div>
  );
};

export default Main;
