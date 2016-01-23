import React, {Component} from 'react';
import { Motion, spring } from 'react-motion';
import {findDOMNode} from 'react-dom';
import Measure from 'react-measure';
import Quiz from './Quiz';

// https://github.com/souporserious/react-measure
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {}
    };
  }
  render() {
    const { height } = this.state.dimensions;
    console.log('height is', height);

    return(
      <Measure
        whitelist={['height', 'clientLeft', 'clientHeight', 'clientWidth']}
        // notice how target gets passed into onMeasure now
        onMeasure={(dimensions, mutations, target) => {
          console.log('here');
          this.setState({dimensions})
        }}
      >
        <Demo {...this.state} />
      </Measure>
    );
  }
}

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {}
    };
  }
  handleClick(event) {
    event.preventDefault();
    this.setState({
      popupOpened: !this.state.popupOpened
    });
  }
  render() {
    // console.log('y', findDOMNode(this).clientHeight);
    // const element = findDOMNode(this);

    // top element.clientTop + element.clientHeight

    // left: spring(this.state.popupOpened ? 0 : element.clientLeft + element.clientWidth / 2),

    console.log('props', this.props);

    var height = 200;
    var width = 200;

    return (
      <div id="thisOne" onClick={this.handleClick.bind(this)} style={{
        position: 'static',
        backgroundColor: 'blue',
        width: `${width}px`,
        height: `${height}px`,
      }}
      >
        <h1>Topic 1</h1>
        <Motion style={{
          top: spring(this.state.popupOpened ? 0 : 200),
          bottom: spring(this.state.popupOpened ? 0 : 0),
          left: spring(this.state.popupOpened ? 0 : 200),
          right: spring(this.state.popupOpened ?  0 : 0),
          height: spring(this.state.popupOpened ? 100 : 0),
          width: spring(this.state.popupOpened ? 100 : 0)
        }}> 
        {values => 
          <div onClick={this.handleClick} style={{
            backgroundColor: 'yellow',
            position: 'absolute',
            overflow: 'hidden',
            top: values.top,
            bottom: values.bottom,
            left: values.left,
            right: values.right,
            height: `${values.height}vh`,
            width: `${values.width}vw`
          }}>
            <p>Popup</p>
          </div>
        }
        </Motion>
      </div>
    );
  }
}


// export default Demo;