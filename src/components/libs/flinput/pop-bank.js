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
  const [stitle, setStitle] = useState("Chọn Ngân Hàng");

  const [listBank, setListBank] = useState([]);

  const [searchvalue, setSearchValue] = useState("");
  const [clTP, setClTP] = useState("ul-select location");
  

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) {
      if(listBank.length==0){
        initBank()
      }
    }
    return () => isSubscribed = false
  },[props]);


  const initBank = async ()=>{
     setLoading(true)
     const tp = await api.get(`/api/bank-list`)
      if(tp.data[0]){
        setListBank([...tp.data[0]])
      }
      setLoading(false)
  }

  const itemClickBank = async (id, name)=>{
   
      const value_address = name
      const obj_address = {
        label: value_address,
        id: id
      }
      props.bankSelect(obj_address)
   
    
  }
  
  const back = ()=>{
    

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
     var filtered = listCache.filter(obx => {
        const vl = obx.BANK_NAME
        return filterFunction(vl, e.target.value)
       }); 
     setListBank(filtered)

  }

  const onSearchFocus = (e)=>{
    listCache = listBank
  }
  const onSearchBlur = (e)=>{
  }


  return (
    <div className="float-pophover">
        <div className="popheader">
        	{(step > 0)?<div>
        		<div className="backpopup" onClick={()=>back()}><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
        		<p className="country-name"></p>
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
        		
          { listBank.map((item, index)=>{
            return (<li onClick={(e)=>itemClickBank(item.BANK_ID, item.BANK_NAME)}>
               {item.BANK_NAME}
            </li>)
          })
          } 
        	</ul>
          
        	

        </div>
    </div>
  );
};

export default Main;
