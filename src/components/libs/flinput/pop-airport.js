//        ######################################
//        #     Floating Pophover              #
//        #     HoangPM                        #
//        ######################################

import React, { useEffect, useState } from "react";

import { StageSpinner } from "react-spinners-kit";
import api from '../../../services/Network';

console.log('====>', api);

var listCache = {}
const Main = (props) => { 
  const [loading, setLoading] = useState(true);

  const [valueCountry, setValueCountry] = useState(null);
  const [valueAirport, setValueAirport] = useState(null);


  const [country, setCountry] = useState(null);
  const [step, setStep] = useState(0);
  const [stitle, setStitle] = useState("Chọn quốc gia");

  const [listCountry, setListCountry] = useState([]);
  const [listAirport, setListAirport] = useState([]);


  const [searchvalue, setSearchValue] = useState("");
  const [clCountry, setClCountry] = useState("ul-select location");
  const [clAirport, setClAirport] = useState("ul-select location");


  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) {
      if(listCountry.length==0){
        initCountry()
      }
    }
    return () => isSubscribed = false
  },[props]);


  const initCountry = async ()=>{
     setLoading(true)
     const listcountry = await api.get(`/api/airport/1/0`)
      if(listcountry.data[0]){
        setListCountry([...listcountry.data[0]])
      }
      setLoading(false)
  }

  const itemClickCountry = async (nation, name)=>{
    setSearchValue("")
    setClCountry("ul-select location animate__animated animate__fadeOutLeft")
    setClAirport("ul-select location animate__animated animate__fadeInRight")
    setStitle("Chọn sân bay")
    setLoading(true)
    const list_airport = await api.get(`/api/airport/2/${nation}`)
    if(list_airport.data[0]){
      setListAirport(list_airport.data[0])
    }
    setLoading(false)
    setStep(1)
    setValueCountry({name: name, code: nation})
  }

  const itemClickAirport = (name, code)=>{
    setSearchValue("")
    setValueAirport({name:name, code:code})
    const value_address = valueCountry.name +"/"+ name
    const obj_address = {
      label: value_address,
      country: valueCountry.code,
      airport: code
    }
    props.addressSelect(obj_address)
  }

  const back = ()=>{
    if(step==1){
      setStep(0)
      setValueTP(null)
      setStitle("Chọn quốc gia")
      setClCountry("ul-select location animate__animated animate__fadeInLeft")
      setClAirport("ul-select location animate__animated animate__fadeOutRight")
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
        const vl = obx.COUNTRY_NAME
        return filterFunction(vl, e.target.value)
       }); 
     setListCountry(filtered)
    }else if(step==1){
      var filtered = listCache.filter(obx => {
        const vl = obx.AIRPORT_NAME
        return filterFunction(vl, e.target.value)
       }); 
     setListAirport(filtered)
    }

  }

  const onSearchFocus = (e)=>{
    if(step==0){
      listCache = listCountry
    }else if(step==1){
      listCache = listAirport
    }
  }
  const onSearchBlur = (e)=>{
  }


  return (
    <div className="float-pophover">
        <div className="popheader">
        	{(step > 0)?<div>
        		<div className="backpopup" onClick={()=>back()}><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
        		<p className="country-name">{valueCountry?`${valueCountry.name}`:null}{valueAirport?` - ${valueAirport.name}`:null}</p>
        		</div>:null}
        	<p className="stitle">{stitle}</p>
        	<div className="sform">
        		<input type="text" placeholder="Nhập để tìm kiếm" value={searchvalue} onChange={onsearchChange} onFocus={onSearchFocus} onBlur={onSearchBlur}/>
        		<img src="/img/search-vector.svg" />
        	</div>
        </div>
        <div className="select-body">
          {loading?<div className="mk-loading"><StageSpinner color={"#329945"}/></div>:null}

        	<ul className={clCountry}>
        		
          { listCountry.map((item, index)=>{
            return (<li key={item.COUNTRY_ID} onClick={(e)=>itemClickCountry(item.COUNTRY_CODE, item.COUNTRY_NAME)}>
                {item.COUNTRY_NAME}
            </li>)
          })
          } 
        	</ul>
          
          <ul className={clAirport}>
            
          { listAirport.map((item, index)=>{
            return (<li onClick={(e)=>itemClickAirport(item.AIRPORT_NAME, item.AIRPORT_CODE)}>
                {item.AIRPORT_NAME}
            </li>)
          })
          } 
          </ul>

        	

        </div>
    </div>
  );
};

export default Main;
