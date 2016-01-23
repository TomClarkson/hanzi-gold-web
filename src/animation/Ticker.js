import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

export default function Ticker({item}) {
  return (
    <TransitionMotion
      willEnter={key => ({
        item,
        opacity: spring(0),
        y: spring(100, [120, 14]),
      })}
      willLeave={(key, {item}) => ({
        item,
        leaving: true,
        opacity: spring(0),
        y: spring(-100, [120, 14]),
      })}
      styles={{
        [item.id]: {
          item,
          opacity: spring(1),
          y: spring(0, [120, 14]),
        },
      }}>
      {configs =>
        <div style={{
          fontFamily: 'sans-serif',
          fontSize: 30,
          textAlign: 'center',
        }}>
          {Object.keys(configs).map(key => {
          	// console.log('harro', configs[key]);
            // position: configs[key].leaving ? 'absolute' : 'static',
          	return (
          	<div key={key}
          	  style={{
          	    width: '100%',
          	    position: 'absolute',
          	    opacity: configs[key].opacity,
          	    transform: `translateX(${configs[key].y}px)`,
          	  }}>
          	  {configs[key].item.component}
          	</div>
          	);
          })}
        </div>
      }
    </TransitionMotion>
  );
}