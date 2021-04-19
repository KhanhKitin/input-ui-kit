import { Button, Form, Row, Col } from "react-bootstrap";
import Popover from "react-popover";

import PopSelectFlight from "./flightcode.jsx";

import FLInput from "./index.jsx";
import React, { useEffect, useState, createRef } from "react";


const InputFlightCode = (props) => {

  const [flightValue, setflightValue] = useState(null);
  const [openFlight, setOpenFlight] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.list)
  }, [props.list]);

  useEffect(() => {
    setflightValue(props.value)
  }, [props.value]);

  useEffect(() => {
    setLoading(props.loading)
  }, [props.loading]);


  const flightSelect = (name) => {
    setflightValue(name);
    props.changeEvent(name)
    setTimeout(() => {
      setOpenFlight(false);
    }, 200);
  };









  const popoverPropsFlight = {
    isOpen: openFlight,
    place: "below",
    preferPlace: "right",
    onOuterAction: () => setOpenFlight(false),
    body: [<PopSelectFlight data={data} flightSelect={flightSelect} />],
  };
  
  


  return (
    <div className="flightcode-ctn">
      {data&&<Popover {...popoverPropsFlight}>
          <FLInput
            disable={props.disable}
            onFocus={(e) =>
              setOpenFlight(true)
            }
            loading={loading}
            readonly={true}
            label={l.g("searchform.fields.flightcode")}
            required={true}
            dropdown={true}
            value={flightValue}
          />
        </Popover>}
    </div>
  );
};
export default InputFlightCode;
