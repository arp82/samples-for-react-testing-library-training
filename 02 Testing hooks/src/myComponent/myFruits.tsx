import * as React from 'react';
import { getListOfFruit }  from '../myApi';

export const MyFruits = (props) => {
  const [fruits, setFruits] = React.useState([]);
  React.useEffect(() => {
    getListOfFruit().then(setFruits);
  }, []);

  return (
    <>
      <h4>Fruits gallore</h4>
      {fruits.map((fruit, index) => (
        <li key={index} data-testid={fruit}>{fruit}</li>
      ))}
    </>
  )
}