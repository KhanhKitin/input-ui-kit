import React, { useEffect, useState } from "react";
import Popover from "react-popover";
import FLInput from "./index.jsx";
import FLMultiSelect from "./multilist.js";
const ListedInput = (props) => {
  const [openList, setOpenList] = useState(false);
  const [value, setValue] = useState({label:null, value: props.value});
  
  useEffect(() => {
    // let result = props.data.filter(obj => {
    //   //console.log(obj.value, props.value.value)
    //   return obj.value === props.value.value
    // })
    // console.log("Result >> ", props.value)

    setValue(props.value)
    // if(result[0]){

    //   setValue(result[0])
    // }

  }, [props.data, props.value]);


const relationSelect = (value) => {
  setOpenList(false)
  if(props.changeEvent){
    console.log("out >> value >>",value)
    props.changeEvent(value)
  }
  
}



const popoverPropsRelation = {
    isOpen: openList,
    place: "below",
    preferPlace: "right",
    onOuterAction: () => setOpenList(false),
    body: [<FLMultiSelect title={props.sublabel} relationList={props.data} selected={relationSelect} />],
  };



  return (
    <Popover {...popoverPropsRelation}>
          <FLInput
            disable={props.disable}
            readonly={true}
            position={props.position}
            loading={props.loading}
            label={props.label}
            hideborder={props.hideborder}
            onFocus={(e) => setOpenList(true)}
            value={value&&value.title}
            required={props.required}
            dropdown={true}
          />
    </Popover>
  );
};
export default ListedInput;
