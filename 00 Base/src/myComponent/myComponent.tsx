import * as React from 'react';

export interface Props {
  nameFromProps: string;
}

export const MyComponent: React.FunctionComponent<Props> = props => {
  const { nameFromProps } = props;

  return (
    <>
      <h1>Hello {nameFromProps}!</h1>
    </>
  );
};