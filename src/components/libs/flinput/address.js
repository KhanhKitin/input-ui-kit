import React, { useEffect, useState } from "react";
import Popover from "react-popover";
import PopSelect from "./pop-address.js";
import FLInput from "./index.jsx";
const AddressInput = (props) => {
  const [openAddress, setOpenAddress] = useState(false);
  const [addressValue, setAddressValue] = useState(props.value.label);

  const locationFormSelect = (vl) => {
    setAddressValue(vl.label);
    props.changeEvent(vl);
    setTimeout(() => {
      setOpenAddress(false);
    }, 200);
  };

  const popoverPropsAddress = {
    isOpen: openAddress,
    place: "below",
    preferPlace: "right",
    onOuterAction: () => setOpenAddress(false),
    body: [
      <PopSelect mode={props.mode || 0} addressSelect={locationFormSelect} />,
    ],
  };

  const handleTextChange = (e) => {
    console.log(e);
    return e.preventDefault();
  };

  return (
    <Popover {...popoverPropsAddress}>
      <FLInput
        loading={props.loading}
        label={props.label}
        disableTyping={true}
        onFocus={(e) => setOpenAddress(true)}
        dropdown={props.dropdown || false}
        value={addressValue}
        required={props.required != undefined ? props.required : true}
        hideborder={props.hideborder}
        icon={props.dropdown ? false : "far fa-map-marker-alt"}
      />
    </Popover>
  );
};
export default AddressInput;
