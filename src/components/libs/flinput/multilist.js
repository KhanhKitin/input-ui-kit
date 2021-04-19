//        ######################################
//        #     Floating Pophover              #
//        #     HoangPM                        #
//        ######################################

import React, { useEffect, useState } from "react";
import { StageSpinner } from "react-spinners-kit";

var listCache = {}
const Main = (props) => { 
  const [loading, setLoading] = useState(true);
  const [isBack, setBack] = useState(false);
  const [list, setList] = useState([]);
 
  const [step, setStep] = useState(0);
  const [stitle, setStitle] = useState(props.title);
  const [subbtitle, setSubStitle] = useState("");
  const [clL1, setClL1] = useState("ul-select");


  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) {
      if(list.length==0){
       list.push(props.relationList)
       setList([...list])
      }
    }
    return () => isSubscribed = false
  },[props]);


  const onItemClick = (item)=>{
    if(item.list){
       setBack(false)
       setStitle(item.subtitle)
       setSubStitle(item.title)
       setStep(step+1)
       list.push(item.list)
       setList([...list])
    }else{
      props.selected(item)
    }
  }

  const back = ()=>{
    if(step>0){
      setBack(true)
      // list.splice((list.length - 1), 1);
      setStep(step-1)
      setStitle(props.title)
      setTimeout(
      () => {
        list.splice((list.length - 1), 1);
        setList([...list])
      }, 
      800
    );
      // setList([...list])
      //  console.log(list.length)
    }
  }



  return (
    <div className="float-pophover md">
        <div className="popheader">
        	{(step > 0)?<div>
        		<div className="backpopup animate__animated animate__bounceIn" onClick={()=>back()}><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
        		<p className="country-name animate__animated animate__fadeInDown">{subbtitle}</p>
        		</div>:null}
        	<p className={stitle!=props.title?"stitle animate__animated animate__fadeInUp":"stitle animate__animated animate__fadeInDown"}>{stitle}</p>
        	
        </div>
        <div className="select-body hzld">
          

        	
        	 
          { list.map((child_list, ix)=>{
            var classShow = "ul-select absolute animate__animated animate__backInRight"
            var classHide = "ul-select absolute animate__animated animate__backOutLeft"
            if(isBack){
               classShow = "ul-select absolute animate__animated animate__backInLeft"
               classHide = "ul-select absolute animate__animated animate__backOutRight"
            }
            return (<ul key={ix} className={(step == ix)?classShow:classHide}>
                { child_list.map((item, index)=>{
                  return (<li key={index} className="sx-item" onClick={(e)=>onItemClick(item)}>
                      {item.title}
                  </li>)
                })
                } 
            </ul>)
          })
          } 

          
        	

        
          
        	

        </div>
    </div>
  );
};

export default Main;
