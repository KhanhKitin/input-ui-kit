//        ######################################
//        #     Floating Pophover              #
//        #     HoangPM                        #
//        ######################################

import React, { useEffect, useState } from "react";



var listCache = []
const Main = (props) => { 
  const [data, setData] = useState([]);
  const [searchvalue, setSearchValue] = useState("");
  const itemNationClick = (nation)=>{
   
  }
  
  useEffect(() => {
    setData(props.data)
  }, [props.data]);
 



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
        const vl = obx.FLI_NO
        return filterFunction(vl, e.target.value)
       }); 
    setData(filtered)

  }
const onSearchFocus = (e)=>{
    listCache = data
  }
const onSearchBlur = (e)=>{
  }



  return (
    <div className="float-pophover">
        <div className="popheader">
          <p className="stitle">Chọn số hiệu chuyến bay</p>
          <div className="sform">
            <input type="text" placeholder="Nhập để tìm kiếm"  value={searchvalue} onChange={onsearchChange} onFocus={onSearchFocus} onBlur={onSearchBlur}/>
            <img src="/img/search-vector.svg" />
          </div>
        </div>
        <div className="select-body">
          <ul className={"ul-select"}>
            {data.map((item, i) => {  
               // Return the element. Also pass key     
               return (<li key={i} className="flight-item" onClick={()=>props.flightSelect(item.FLI_NO)}>
                  <i class="fa fa-plane" aria-hidden="true"></i>
                  <div className="info">
                    <p className="flight-name">{item.FLI_NO} ({item.DEP} - {item.ARR})</p>
                    <div className="flight-info">
                      <div className="r-o-w">
                        <div className="cl">Khởi hành: </div>
                        <div className="cr">{item.ARRIVAL_TIME}</div>
                      </div>
                      <div className="r-o-w">
                        <div className="cl">Hạ cánh: </div>
                        <div className="cr">{item.DEPARTURE_TIME}</div>
                      </div>
                    </div>
                  </div>

                  </li>) 
            })}
          </ul>
         
        </div>
    </div>
  );
};

export default Main;
