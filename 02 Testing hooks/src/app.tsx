import * as React from 'react';
import { MyComponent } from './myComponent';

export const App: React.FunctionComponent = props => (
  <div>
    <MyComponent nameFromProps="Fruit User" />
  </div>
);
