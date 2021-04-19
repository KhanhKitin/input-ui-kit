import React, { useEffect, useState } from "react";
import Popover from "react-popover";
import FLInput from "./index.jsx";
import style from '../../../styles.module.css';

const ListedInput = (props) => {
  const [openList, setOpenList] = useState(false);
  const [value, setValue] = useState({ label: "", value: props.value });
  const [readonly, setReadonly] = useState(false);

  useEffect(() => {
    let result = props.data.filter((obj) => {
      return obj.value === props.value;
    });
    if (result[0]) {
      setValue(result[0]);
    } else {
      setValue({ label: "", value: props.value }); // truong hop value truyen vao k co trong dlist data thi set mac dinh
    }
  }, [props.data, props.value]);

  const popoverProps = {
    isOpen: openList,
    place: "below",
    preferPlace: "right",
    onOuterAction: () => setOpenList(false),
    body: [
      <div>
        <div className={style.popsheader}>{props.label}</div>
        <div className={style.list_item}>
          {props.data.map((item, index) => {
            return (
              <div
                className={
                  item.value == value.value ? "sx-item active" : "sx-item"
                }
                onClick={(e) => {
                  if (props.changeEvent(item.value)) {
                  } else {
                    setValue(item);
                    setOpenList(false);
                  }
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>,
    ],
  };
  const blurInput = () => {
    setReadonly(false);
  };
  const focusInput = () => {
    setOpenList(true);
    setReadonly(true);
  };
  return (
    <Popover {...popoverProps}>
      <FLInput
        disable={props.disable}
        readonly={readonly}
        position={props.position}
        loading={props.loading}
        label={props.label}
        hideborder={props.hideborder}
        onFocus={(e) => focusInput()}
        value={value.label}
        required={props.required}
        dropdown={true}
        onBlur={() => blurInput()}
      />
    </Popover>
  );
};
export default ListedInput;
