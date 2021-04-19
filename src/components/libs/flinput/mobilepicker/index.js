import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion"
import Sheet from 'react-modal-sheet';


const listDay = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
// const listDay = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15, 16]

const ScrollSelect = (props) => {
 const [isOpen, setOpen] = React.useState(props.open);
 const [isDrag, setIsDrag] = React.useState(false);

 useEffect(() => {
    setOpen(props.open)
  }, [props.open]);


 const onCloseSheet = ()=>{
    props.onDissmiss(false)
    setOpen(false)
 }
  return (
    <Sheet disableDrag={isDrag} snapPoints={[300]} isOpen={isOpen} onClose={() => onCloseSheet()}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
          <div>{props.children}</div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
     </Sheet>
  );
};
export default ScrollSelect;
