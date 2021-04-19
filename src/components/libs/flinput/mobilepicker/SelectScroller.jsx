import React, { useEffect, useState, useRef } from "react";
import "./style.css"


const sensitivity = 3
const cfg_count = 16

const halfCount = (cfg_count - cfg_count % 4) / 2;
const quarterCount = (cfg_count - cfg_count % 4) / 4;
const ivar_a = sensitivity * 8; 
const minV = Math.sqrt(1 / ivar_a);

var exceedA = 10;
var moveT = 0; 
var moving = false;

var touching = false;

// var touchData = {
//       startY: 0,
//       yArr: []
//     }

const easing = {
  easeOutCubic: function(pos) {
    return (Math.pow((pos-1), 3) +1);
  },
  easeOutQuart: function(pos) {
    return -(Math.pow((pos-1), 4) -1);
  },
};

const InputScroller = (props) => {
 const divRef = useRef(null);

 const [isTouch, setTouch] = React.useState(false);

 const [touchData, setTouchData] = React.useState({
      startY: 0,
      yArr: []
    });

 const [dTime, setDtime] = React.useState(new Date().getTime());
 const [value, setValue] = React.useState(null);
 const [source, setSource] = React.useState([]);
 const [sourceLength, setSourceLength] = React.useState(0);
 const [type, setType] = React.useState(props.isInfinite?'infinite':'normal');
 const [ofsheight, setOfsHeight] = React.useState(150);
 const [scroll, setScroll] = React.useState(0);
 const [rotateX, setRotateX] = React.useState(0);

 const [count, setCount] = React.useState(cfg_count - cfg_count % 4);
 const [itemHeight, setItemHeight] = React.useState(ofsheight * 3 / count);
 const [itemAngle, setItemAngle] = React.useState(360 / count);
 const [radius, setRadius] = React.useState(itemHeight / Math.tan(itemAngle * Math.PI / 180));



useEffect(() => {
   setSource(props.source)
   setSourceLength(props.source.length)
     if(value==null){
        if(props.source.length > 0){
            select(props.value, props.source)
            setValue(props.value)
        }
     }
   
}, [props.source]);

useEffect(() => {
    if(props.source.length > 0){
      select(props.value, props.source)
      setValue(props.value)
    }
}, [props.value]);

useEffect(() => {
    console.log("INIT")
    if(divRef.current){
      // divRef.current.addEventListener('mousedown', _touchstart);
      // divRef.current.addEventListener('mouseup', _touchend);
    }
}, [divRef]);




// date logic


const select = (value, s) => {
    for (let i = 0; i < s.length; i++) {
      if (s[i].value === value) {
        if(scroll != i){
          window.cancelAnimationFrame(moveT);
          let initScroll = _normalizeScroll(scroll);
          let finalScroll = i;
          let t = Math.sqrt(Math.abs((finalScroll -  initScroll) / ivar_a));
          _animateToScroll(initScroll, finalScroll, t);
          let inscroll = _normalizeScroll(i) | 0;
          setRotateX(itemAngle * i)
          setScroll(i)
        }
        return;
      }
    }
    //throw new Error(`can not select value: ${value}, ${value} match nothing in current source`);
  }

const _selectByScroll = (inscroll) => {
    inscroll = _normalizeScroll(inscroll) | 0;
    if (inscroll > source.length - 1) {
      inscroll = source.length - 1;
      _moveTo(inscroll);
    }
    _moveTo(inscroll);
    setScroll(inscroll)
    setDtime(new Date().getTime())
    if(props.onSelected){
      props.onSelected(source[inscroll])
    }
    // this.selected = this.source[scroll];
    // this.value = this.selected.value;
    // this.onChange && this.onChange(this.selected);
  }
const _animateToScroll = (initScroll, finalScroll, t, easingName = 'easeOutQuart') => {

    if (initScroll === finalScroll || t === 0) {
      _moveTo(initScroll);
      return;
    }

    let start = new Date().getTime() / 1000;
    let pass = 0;
    let totalScrollLen = finalScroll - initScroll;
    
    // console.log(initScroll, finalScroll, initV, finalV, a);
    return new Promise((resolve, reject) => {
      moving = true;
      let tick = () => {

        pass = new Date().getTime() / 1000 - start;

        if (pass < t) {
          let xxscroll = _moveTo(initScroll + easing[easingName](pass / t) * totalScrollLen);
          setScroll(xxscroll)

          moveT = requestAnimationFrame(tick);
        } else {
          let xxscroll = _moveTo(initScroll + totalScrollLen);
          setScroll(xxscroll)
         
          resolve();
          _stop();
          
        }
      };
      setDtime(new Date().getTime())

      tick();
    });
  }


const _animateMoveByInitV = async (initV, lastScroll) => {
    let initScroll;
    let finalScroll;
    let finalV;

    let totalScrollLen;
    let a;
    let t;

    if (type === 'normal') {

      if (lastScroll < 0 || lastScroll > source.length - 1) {
        a = exceedA;
        initScroll = lastScroll;
        finalScroll = lastScroll < 0 ? 0 : source.length - 1;
        totalScrollLen = initScroll - finalScroll;
        t = Math.sqrt(Math.abs(totalScrollLen / a));
        initV = a * t;
        initV = lastScroll > 0 ? -initV : initV;
        finalV = 0;
        await _animateToScroll(initScroll, finalScroll, t);
      } else {
        initScroll = lastScroll;
        a = initV > 0 ? -ivar_a : ivar_a; 
        t = Math.abs(initV / a);
        totalScrollLen = initV * t + a * t * t / 2;
        finalScroll = Math.round(lastScroll + totalScrollLen);
        finalScroll = finalScroll < 0 ? 0 : (finalScroll > source.length - 1 ? source.length - 1 : finalScroll);

        totalScrollLen = finalScroll - initScroll;
        t = Math.sqrt(Math.abs(totalScrollLen / a));
        await _animateToScroll(lastScroll, finalScroll, t, 'easeOutQuart');
      }

    } else {
      initScroll = lastScroll;
      a = initV > 0 ? -ivar_a : ivar_a;

      t = Math.abs(initV / a);
      


      totalScrollLen = initV * t + a * t * t / 2;

      finalScroll = Math.round(lastScroll + totalScrollLen);

      await _animateToScroll(lastScroll, finalScroll, t, 'easeOutQuart');
    }

    // await this._animateToScroll(this.scroll, finalScroll, initV, 0);
    
    _selectByScroll(finalScroll);
  }

 const _stop = () => {

    moving = false;
    cancelAnimationFrame(moveT);
    moveT = 0
  }




  const _touchstart = (e) => {
    console.log("Touch start")
    touching = true
    props.isDrag(true)
    // divRef.current.addEventListener('mousemove', _touchmove);
    
    // document.addEventListener('mousemove', _touchmove);

    let eventY = e.clientY || e.touches[0].clientY;
    touchData.startY = eventY;
    touchData.yArr = [[eventY, new Date().getTime()]];
    touchData.touchScroll = scroll;
    touchData.startScroll = scroll
    setTouchData(touchData)
    _stop();
  }

  const _touchmove = (e) => {

    if(touching == true){
      // console.log("_touchmove >> ")
        let eventY =  e.clientY || e.touches[0].clientY;
        touchData.yArr.push([eventY, new Date().getTime()]);
        if (touchData.yArr.length > 5) {
          touchData.yArr.unshift();
        }

        let scrollAdd = (touchData.startY - eventY) / itemHeight;
       
        let moveToScroll = scrollAdd + touchData.startScroll;

        if (type == 'normal'){
          if (moveToScroll < 0) {
            moveToScroll *= 0.3;
          } else if (moveToScroll > source.length) {
            moveToScroll = source.length + (moveToScroll - source.length) * 0.3;
          }
          // console.log(moveToScroll);
        } else {
          moveToScroll = _normalizeScroll(moveToScroll);
          
        }


        //_moveTo(moveToScroll)

        touchData.touchScroll = _moveTo(moveToScroll);
        // setTouchData(touchData)
    }
  }

  const _touchend = (e) => {
    touching = false
    props.isDrag(false)
    document.removeEventListener('mousemove', _touchmove);
    // divRef.current.removeEventListener('mousemove', _touchmove);
     // console.log("removeEventListener")

    let v;

    if (touchData.yArr.length === 1) {
      v = 0;
    } else {
      let startTime = touchData.yArr[touchData.yArr.length - 2][1];
      let endTime = touchData.yArr[touchData.yArr.length - 1][1];
      let startY = touchData.yArr[touchData.yArr.length - 2][0];
      let endY = touchData.yArr[touchData.yArr.length - 1][0];

      v = ((startY - endY) / itemHeight) * 1000 / (endTime - startTime);

      let sign = v > 0 ? 1 : -1;

      v = Math.abs(v) > 30 ? 30 * sign : v;
    }
    // setTouchData(touchData)

    
    setScroll(touchData.touchScroll)



    _animateMoveByInitV(v, touchData.touchScroll);
    


    e.stopPropagation()
  }




const   _normalizeScroll = (scrollx) => {
  let normalizedScroll = scrollx
    while(normalizedScroll < 0) {
      normalizedScroll += source.length;
    }
    normalizedScroll = normalizedScroll % source.length;
    return normalizedScroll;
  }

const _moveTo = (inscroll) => {
    if (type === 'infinite') {
      inscroll = _normalizeScroll(inscroll);
    }
    setRotateX(itemAngle * inscroll)
    setScroll(inscroll)

    // this.elems.circleList.style.transform = `translate3d(0, 0, ${-this.radius}px) rotateX(${this.itemAngle * scroll}deg)`;
    // this.elems.highlightList.style.transform = `translate3d(0, ${-(scroll) * this.itemHeight}px, 0)`;

    return inscroll;
  }





  



  return (
    <div>
      <div className="list-ios-selector">
      <div className="select-wrap"
       ref={divRef}
       onTouchStart={_touchstart}
       onTouchEnd={_touchend}
       onTouchMove={_touchmove}
       onMouseDown={(e)=>_touchstart(e)}
       onMouseUp={(e)=>_touchend(e)}
       onMouseMove={(e)=>_touchmove(e)}
      >
        <ul className="select-options"
         style={{transform: `translate3d(0, 0, ${-radius}px) rotateX(${rotateX}deg)`}}>
          {source.map((item, index)=>{
            const isHidden = (Math.abs(index - scroll) > quarterCount) 
            return(<li class="select-option"
                    key={index}
                    style={{
                      top: `${itemHeight * -0.5}px`,
                      height: `${itemHeight}px`,
                      "lineHeight": `${itemHeight}px`,
                      transform: `rotateX(${-itemAngle * index}deg) translate3d(0, 0, ${radius}px)`,
                      visibility: isHidden?"hidden":"visible"
                    }}
                    data-index={index}>
                    {item.text}
                    </li>)

          })}

          {(type == "infinite")&&source.map((item, index)=>{
                const isHidden = (Math.abs(-index - 1 - scroll) > quarterCount) 
                return(<li className="select-option"
                        key={index}
                        style={{
                          top: `${itemHeight * -0.5}px`,
                          height: `${itemHeight}px`,
                          "lineHeight": `${itemHeight}px`,
                          transform: `rotateX(${itemAngle * (index + 1)}deg) translate3d(0, 0, ${radius}px)`,
                          visibility: isHidden?"hidden":"visible"
                        }}
                        data-index={-index - 1}>
                        {source[sourceLength - index - 1]&&source[sourceLength - index - 1].text}
                        </li>)

          })}

           {(type == "infinite")&&source.map((item, index)=>{
                const isHidden = (Math.abs(index + sourceLength - scroll) > quarterCount) 
                return(<li className="select-option"
                        key={index}
                        style={{
                          top: `${itemHeight * -0.5}px`,
                          height: `${itemHeight}px`,
                          "lineHeight": `${itemHeight}px`,
                          transform: `rotateX(${-itemAngle * (index + sourceLength)}deg) translate3d(0, 0, ${radius}px)`,
                          visibility: isHidden?"hidden":"visible"
                        }}
                        data-index={index + sourceLength}>
                        {item.text}
                        </li>)

          })}



          

        </ul>
        <div className="highlight" style={{height: `${itemHeight}px`, lineHeight: `${itemHeight}px`}}>
          <ul className="highlight-list" style={{transform: `translate3d(0px, ${ -(scroll * itemHeight)}px, 0px)`}}>
            {source.map((item, index)=>{
              const isHidden = (Math.abs(index - scroll) > quarterCount) 
              return(<li className="highlight-item" style={{height: `${itemHeight}px`}} key={index}>
                        {item.text}
                     </li>)

            })}
             {(type == "infinite")&&
              <li className="highlight-item" style={{height: `${itemHeight}px`}}>
                        {source[sourceLength - 1]&&source[sourceLength - 1].text}
              </li>}
              {(type == "infinite")&&<li className="highlight-item" style={{height: `${itemHeight}px`}}>
                        {source[0]&&source[0].text}
              </li>}

            

          </ul>
        </div>
      </div>

          
      </div>
    </div>
  );
};
export default InputScroller;
