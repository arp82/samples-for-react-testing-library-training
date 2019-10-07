import * as React from 'react';
import { MyFruits } from './myFruits';

export interface Props {
  nameFromProps: string;
}

export const MyComponent: React.FunctionComponent<Props> = props => {
  const { nameFromProps } = props;
  const [userName, setUserName] = React.useState('');

  return (
    <>
      <h1>Hello {nameFromProps}!</h1>
      <h2> Username </h2>
      <h3 data-testid="userName-label">{userName}</h3>
      <input
        data-testid="userName-input"
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />
        <MyFruits />
    </>
  );
};