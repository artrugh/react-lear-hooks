import React, {useEffect} from 'react';

import './Card.css';

const Card = props => {
  console.log('RENDERING CARD BEFORE');
  useEffect(() => {
    console.log('RENDERING CARD');
  });
  return <div className="card">{props.children}</div>;
};

export default Card;
// export default memo(Card,
//   (prevProps, nextProps) => nextProps.show === prevProps.show &&
//       nextProps.children === prevProps.children);