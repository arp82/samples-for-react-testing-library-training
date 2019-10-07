import * as React from 'react';
// import { render, cleanup } from '@testing-library/react';
import { render, fireEvent, waitForElement, act, RenderResult } from '@testing-library/react';
import * as myApi from '../myApi';
import { MyComponent, Props } from './myComponent';

jest.mock('./myFruits.tsx', () => ({
  MyFruits: () => <div />,
}));

const baseProps: Props = {
  nameFromProps: null,
}

//afterEach(cleanup);

describe('My component', () => {
  let props: Props;
  beforeEach(() => {
    props = {...baseProps};
  });

  it('should display the title provided', () => {
    // Arrange
    const name = 'Title';

    // Act
    const { getByText } = render(<MyComponent nameFromProps={name} />);

    // Assert
    const element = getByText('Hello Title!');
    expect(element).not.toBeNull();
    expect(element.tagName).toEqual('H1');
  });

  // it('should display the person name using snapshot testing', () => {
  //   // Arrange
  //   const name = 'Fruity';

  //   // Act
  //   const { asFragment } = render(<MyComponent nameFromProps={name} />);

  //   // Assert
  //   expect(asFragment()).toMatchSnapshot();
  // });

  it('should display a label and input elements with empty userName value', () => {
    // Arrange

    // Act
    const { getByTestId, getAllByText } = render(<MyComponent {...props} />);
    // const xxlabelElement = getByText(''); // https://testing-library.com/docs/dom-testing-library/api-queries
    const elementsWithEmptyText = getAllByText('');
    const labelElement = getByTestId('userName-label');
    const inputElement = getByTestId('userName-input') as HTMLInputElement;

    // Assert
    expect(labelElement.textContent).toEqual('');
    expect(inputElement.value).toEqual('');
  });

  it('should update username label when the input changes', () => {
    // Arrange
    // Act
    const { getByTestId } = render(<MyComponent {...props} />);

    const labelElement = getByTestId('userName-label');
    const inputElement = getByTestId('userName-input') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'John' } });

    // Assert
    expect(labelElement.textContent).toEqual('John');
    expect(inputElement.value).toEqual('John');
  });

  xit('should display the list of fruits after resolving the api call on initialization', async () => {
    // Arrange
    const getListOfFruitMock = jest
      .spyOn(myApi, 'getListOfFruit')
      .mockResolvedValue(['Melon', 'Apple', 'Pear']);

    // Act
    let wrapper: RenderResult = null;
    await act(async() => {
      wrapper = render(<MyComponent {...props} />);
    });
    const {getByText} = wrapper;
    await waitForElement(() => getByText('Melon'));
    const melonElement = getByText('Melon');
    const appleElement = getByText('Apple');
    const pearElement = getByText('Pear');

    // Assert
    expect(getListOfFruitMock).toHaveBeenCalled();
    expect(melonElement).not.toBeUndefined();
    expect(appleElement).not.toBeUndefined();
    expect(pearElement).not.toBeUndefined();
  });
});