import React, { useEffect, useState } from "react";
import Popover from "react-popover";
import PopSelect from "./pop-airport.js";
import FLInput from "./index.jsx";
const AirportInput = (props) => {
  const [openAddress, setOpenAddress] = useState(false);
  const [addressValue, setAddressValue] = useState(props.value.label);

   const locationFormSelect = (vl) => {
      setAddressValue(vl.label);
      props.changeEvent(vl)
      setTimeout(() => {
        setOpenAddress(false);
      }, 200);
    };


  const popoverPropsAddress = {
    isOpen: openAddress,
    place: "below",
    preferPlace: "right",
    onOuterAction: () => setOpenAddress(false),
    body: [<PopSelect addressSelect={locationFormSelect} />],
  };


  return (
    <Popover {...popoverPropsAddress}>
          <FLInput
            disable={props.disable}
            loading={props.loading}
            label={props.label}
            onFocus={(e) => setOpenAddress(true)}
            readonly={true}
            value={addressValue}
            required={props.required}
            dropdown={true}
            hideborder={props.hideborder}
            position={props.position}
          />
    </Popover>
  );
};
export default AirportInput;
