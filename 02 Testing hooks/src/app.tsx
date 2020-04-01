import * as React from 'react';
import { MyComponent } from './myComponent';
import { MyFruits } from './myComponent/myFruits';

export const App: React.FunctionComponent = props => (
  <div>
    <MyComponent nameFromProps="Fruit User" />
    <MyFruits/>
  </div>
);
