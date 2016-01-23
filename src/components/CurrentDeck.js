import React from 'react';
import moment from 'moment';

const boxesToColor = [
  '#FF0000',
  '#FF9C00',
  '#F5E701',
  '#9BE603',
  '#5AE539'
];

const LeitnerBox = ({leitnerBox}) => {
  var range = Array.from(Array(leitnerBox).keys());
  var boxes = range.map(index => 
    <div style={{
      backgroundColor: boxesToColor[index],
      width: 15,
      color: 'transparent',
      width: (index + 5) * 2,
      height: (index + 1) * 4,
      marginRight: 2,
      marginTop: 20 - ((index + 1) * 4)
    }} key={index}>{" ."}</div>
  );

  return (
    <div style={{display: 'flex'}}>
      {boxes}
    </div>
  );
};

export default ({cards}) => (
	<table>
	  <thead>
	    <tr>
	      <th>Hanzi</th>
	      <th>Strength</th>
	      <th>Next Review</th> 
	    </tr> 
	  </thead>
	  <tbody>
	    {cards.map(c =>
	      <tr key={c.id}>
	        <td>{c.hanzi}</td> 
	        <td><LeitnerBox leitnerBox={c.leitnerBox} /></td> 
	        <td>{moment(c.nextReview).calendar()}</td> 
	      </tr>
	    )}
	  </tbody>
	</table>
);