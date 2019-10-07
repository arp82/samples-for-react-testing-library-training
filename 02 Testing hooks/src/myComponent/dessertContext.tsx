import * as React from 'react';

interface Context {
  desserts: string[];
  addDessert: (dessert: string) => void;
  removeDessert: (dessert: string) => void;
}

export const DessertContext = React.createContext<Context>({
  desserts: [],
  addDessert: () => {},
  removeDessert: () => {},
});

export const DessertProvider: React.FunctionComponent = props => {
  const [desserts, setDesserts] = React.useState([]);
  const addDessert = (newDessert: string) => {
    setDesserts((prevDesserts) => {
      if (prevDesserts && prevDesserts.indexOf(newDessert) < 0) {
        return [...prevDesserts, newDessert];
      }
      return prevDesserts;
    });
  };
  const removeDessert = (dessertToRemove: string) => {
    setDesserts((prevDesserts) => {
      if (prevDesserts && prevDesserts.indexOf(dessertToRemove) >= 0) {
        const indexToRemove = prevDesserts.indexOf(dessertToRemove);
        prevDesserts.splice(indexToRemove, 1);
        return [...prevDesserts];
      }
      return prevDesserts;
    });
  };

  return (
    <DessertContext.Provider value={{ desserts, addDessert, removeDessert }}>
      {props.children}
    </DessertContext.Provider>
  );
};