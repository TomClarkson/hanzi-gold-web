import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

const Slide = ({slide}) => {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        width: '100%',
        position: 'absolute',
        height: slide.item.height,
        opacity: slide.opacity,
        transform: `translateX(${slide.x}px)`,
      }}>
      {slide.item.component}
    </div>
  );
}

export default function SlideWrapper({item}) {
  return (
    <TransitionMotion
      willEnter={key => ({
        item,
        opacity: spring(0),
        x: spring(380, [120, 14]),
      })}
      willLeave={(key, {item}) => ({
        item,
        leaving: true,
        opacity: spring(0),
        x: spring(-380, [120, 14]),
      })}
      styles={{
        [item.id]: {
          item,
          opacity: spring(1),
          x: spring(0, [120, 14]),
        },
      }}>
      {configs =>
        <div style={{
          display: 'flex',
          position: 'relative',
          flex: 1
        }}>
          {Object.keys(configs).map(key => <Slide key={key} slide={configs[key]} />)}
        </div>
      }
    </TransitionMotion>
  );
}