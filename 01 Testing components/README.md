# Testing components using React Testing Library

## Introduction
React Testing Library is a library built on DOM Testing Library to provide support for React component testing. DOM Testing Library is a light-weight solution to write maintainable tests for UI applications. The main idea behind this library is to focus on the actual functionality behind a given application, so that the tests are more concerned with what the application does and what the user sees rather than implementation details and the abstractions behind them. This approach also favors maintainability in the long term, as the tests themselves should not break when refactoring or performing implementation changes as long as the same outwards functionality is kept.

With this sample, we're going to take an introductory look at how React Testing Library works and how to define basic tests for our components.

## Let's start
Download the project from "00 Base" sample and run `npm install` to download the dependencies. If we take a look at the `package.json` file, we can find the React Testing Library dependency under the development dependencies section `"@testing-library/react"`. If we run the app with `npm start`, we will get the usual Hello World app running on port 8080.

Let us move on to some basic tests. Create a file `myComponent.spec.tsx` local to `myComponent.tsx` and let us add our first test using React Testing Library
```javascript
import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MyComponent, Props } from './myComponent';

const baseProps: Props = {
  nameFromProps: null,
}

afterEach(cleanup);

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
});
```

So far, so good, this is a very basic example. We are importing two methods from the library: `render` and `cleanup`. The first one is used to mount our component so that we can run our tests on it. The latter is used to clean-up any resources taken in order to mount the component. The wrapper returned from the `render` method provides several methods to query the resulting rendering in order to search for specific tag elements. In this case, we are using `getByText` to find a single element containing the `Hello Title` text, which we expect to be inside an `<h1>` element.

Since it is so common to clean-up and release our resources after each test, we could straight-away change the jest configuration properties to account for this, so that we do not have to include the `afterEach` clause in every test file we write. So, if we change the contents of `config/test/jest.json` as per the lines below...
```diff
{
  "rootDir": "../../",
  "preset": "ts-jest",
-  "restoreMocks": true
+  "restoreMocks": true,
+  "setupFilesAfterEnv": ["@testing-library/react/cleanup-after-each"]
}
```

...we can now remove the clean-up stage from our test file safely.
```diff
const baseProps: Props = {
  nameFromProps: null,
}

-afterEach(cleanup);

describe('My component', () => {
  let props: Props;
  beforeEach(() => {
```

## Snapshot testing
Much in the same way as other frameworks such as Enzyme, we can generate snapshots using React Testing Library. Overall, this can be useful if we want to control that the rendered output of our components does not change. It can also lead to anti-patterns if we do snapshot testing just-because, especially on components that are meant to be changed or that contain elements that naturally change between builds. This can unwittingly lead to bad practices such as updating snapshots that should not have been updated, thus invalidated the original purpose. Nonetheless, snapshot testing can be a useful test in the right situation as well. The lines below illustrate how to add a snapshot test to our component testing suite.
```diff
+it('should display the person name using snapshot testing', () => {
+  // Arrange
+  const name = 'Fruity';
+  // Act
+  const { asFragment } = render(<MyComponent nameFromProps={name} />);
+  // Assert
+  expect(asFragment()).toMatchSnapshot();
+});
```

In this case, the `asFragment` callback returns a snapshot for jest to run in the assertion stage. Since we are going to be changing the component in the coming lines though, we are going to remove the lines above to avoid having to deal with updating the snapshot.
```diff
-it('should display the person name using snapshot testing', () => {
-  // Arrange
-  const name = 'Fruity';
-  // Act
-  const { asFragment } = render(<MyComponent nameFromProps={name} />);
-  // Assert
-  expect(asFragment()).toMatchSnapshot();
-});
```

## Testing a stateful component
Now we are going to add some stateful logic to our component. Let's modify `myComponent.tsx` with the lines below, which add a userName piece of state initialized to empty string.
```diff
  const { nameFromProps } = props;
+ const [userName, setUserName] = React.useState('');

  return (
    <>
      <h1>Hello {nameFromProps}!</h1>
+     <h2> Username </h2>
+     <h3>{userName}</h3>
+     <input value={userName} onChange={e => setUserName(e.target.value)} />
```

Let's now mimic the previous test and try to search for the label and input elements above with the following test
```diff
+  it('should display a label and input elements with empty userName value', () => {
+    // Arrange
+
+    // Act
+    const { getByTest } = render(<MyComponent {...props} />);
+    const element = getByText('');
+    
+
+    // Assert
+    
+  });
```

If we run this, we will find that the `getByText` query fails. Why is so? Well, React Testing Library basically runs DOM Testing Library internally, and in DOM Testing Library, the `getBy*` queries always expect one and only one element. If more than one or no element at all is found, the query will not work. Since we have more than one element holding an empty string text, a different kind of query is needed; in this case, `getAllByText`, which returns an array of elements matching the criterion provided. 
```diff
  it('should display a label and input elements with empty userName value', () => {
    // Arrange

    // Act
-   const { getByTest } = render(<MyComponent {...props} />);
-   const element = getByText('');
+   const { getAllByText } = render(<MyComponent {...props} />);
+   const elements = getAllByText('')
    

    // Assert
    
  });
```

The full list of queries can be found [here](https://testing-library.com/docs/dom-testing-library/api-queries). A common practice would be to define a special data property called `data-testid`. This `testId` attribute can be retrieved easily by a dedicated query from React Testing Library's rendered result. Let us modify our component accordingly to this approach:
```diff
  return (
    <>
      <h1>Hello {nameFromProps}!</h1>
      <h2> Username </h2>
-     <h3>{userName}</h3>
-     <input value={userName} onChange={e => setUserName(e.target.value)} />
+     <h3 data-testid="userName-label">{userName}</h3>
+     <input
+       data-testid="userName-input"
+       value={userName}
+       onChange={e => setUserName(e.target.value)}
+     />
```

And now, we can use this IDs in our testing suite:
```diff
  it('should display a label and input elements with empty userName value', () => {
    // Arrange

    // Act
    const { getByTestId } = render(<MyComponent {...props} />);
-   const elements = getAllByText('')
+   const labelElement = getByTestId('userName-label');
+   const inputElement = getByTestId('userName-input') as HTMLInputElement;

    // Assert
+   expect(labelElement.textContent).toEqual('');
+   expect(inputElement.value).toEqual('');   
  });
```


This test so far is only checking if our newly defined elements are being rendered, we have yet to check if the state is being changed when we modify the value in the text field. In order to trigger this behaviour, we need to trigger the `change` event somehow. React Testing Library provides us with the following feature:
```diff
import * as React from 'react';
- import { render, cleanup } from '@testing-library/react';
+ import { render, fireEvent } from '@testing-library/react';
import { MyComponent, Props } from './myComponent';

const baseProps: Props = {
```

Let's create a new test where we use this `fireEvent` object to trigger actual HTML events for our test:

```diff
+  it('should update username label when the input changes', () => {
+    // Arrange
+    // Act
+    const { getByTestId } = render(<MyComponent {...props} />);
+
+    const labelElement = getByTestId('userName-label');
+    const inputElement = getByTestId('userName-input') as HTMLInputElement;
+
+    fireEvent.change(inputElement, { target: { value: 'John' } });
+
+    // Assert
+    expect(labelElement.textContent).toEqual('John');
+    expect(inputElement.value).toEqual('John');
+  });
```

Since we want to trigger the `change` event, we simply need to call the `fireEvent.change` method, provding both the element we want to trigger the event on (the input text field in our case), and the event object we want that event to be triggered with.

## Running asynchronous calls and unit tests

Now let us modify our component so that it performs a call against an API to retrieve some data after initialization. This is a side effect and can be implemented using a `useEffect` hook. We will also import the `getListOfFruit` method from `myApi` folder, which simulates an async call to retrieve a list of pieces of fruit. 

```diff
import * as React from 'react';
+import { getListOfFruit }  from '../myApi';

export interface Props {
  nameFromProps: string;
}

export const MyComponent: React.FunctionComponent<Props> = props => {
  const { nameFromProps } = props;
  const [userName, setUserName] = React.useState('');
+  const [fruits, setFruits] = React.useState([]);
+  React.useEffect(() => {
+    getListOfFruit().then(setFruits);
+  }, []);

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
+      <div>
+        <h4>Fruits galore</h4>
+        {fruits.map((fruit, index) => (
+          <li key={index} data-testid={fruit}>{fruit}</li>
+        ))}
+      </div>
    </>
  );
};
``` 

So now our component will always perform a (fake) fetch call on initialization, and display the retrieved list of fruit pieces as an unsorted list. Let's see now how we can test this behaviour with another new test.

```diff
import * as React from 'react';
-import { render, fireEvent } from '@testing-library/react';
+import { render, fireEvent, waitForElement } from '@testing-library/react';
+import * as myApi from '../myApi';
import { MyComponent, Props } from './myComponent';
...
+  it('should display the list of fruits after resolving the api call on initialization', async () => {
+    // Arrange
+    const getListOfFruitMock = jest
+      .spyOn(myApi, 'getListOfFruit')
+      .mockResolvedValue(['Melon', 'Apple', 'Pear']);
+
+    // Act
+    const {getByText} = render(<MyComponent {...props} />);
+    await waitForElement(() => getByText('Melon'));
+    const melonElement = getByText('Melon');
+    const appleElement = getByText('Apple');
+    const pearElement = getByText('Pear');
+
+    // Assert
+    expect(getListOfFruitMock).toHaveBeenCalled();
+    expect(melonElement).not.toBeUndefined();
+    expect(appleElement).not.toBeUndefined();
+    expect(pearElement).not.toBeUndefined();
+  });
```

In this case, we are mocking the API call to return a fix set of fruit pieces. Since the fetch call (and subsequently the mocked call as well) return a promise, we need to check for assertions after the Promise has been resolved. In order to do this, we could use the `done` callback provided as an optional parameter in our test func, or define said test func as async, thus enabling the use of the `async/await` ES2017 syntax. Finally, we need to tell the test to wait until the fetch call has been resolved successfully. In order to do that, we use the function `waitForElement` along with a callback that checks if one of the elements of our list of fruit pieces is present. The `waitForElement` function will be triggered whenever the DOM mutates, and returns a promise that will only resolve once the callback provided is returns a truthy value, i.e., it will only resolve once an element with text 'Melon' is found in the virtual DOM.

However, if we run the code (and we are using React 16.8.6 or lower), we will see that the tests pass, yet we get a warning about `act` function and performing state changes in a non-React way. For further information on the subject, you may check this [link](https://reactjs.org/docs/test-utils.html), but suffice it to say that React Testing Library methods wrap their `render` and `fireEvent` calls in `act` calls, yet there is an issue/bug regarding the use of async calls with act, which will be fixed in React 16.9 (concretely as part of a change in the React-DOM dependency). Nonetheless, if we want to fix this behaviour in our test presently, we just need to wrap our `render` call within an `async act` callback, like this:

```diff
import * as React from 'react';
-import { render, fireEvent, waitForElement } from '@testing-library/react';
+import { render, fireEvent, waitForElement, act, RenderResult } from '@testing-library/react';
import * as myApi from '../myApi';
import { MyComponent, Props } from './myComponent';
...
  it('should display the list of fruits after resolving the api call on initialization', async () => {
    // Arrange
    const getListOfFruitMock = jest
      .spyOn(myApi, 'getListOfFruit')
      .mockResolvedValue(['Melon', 'Apple', 'Pear']);

    // Act
+   let wrapper: RenderResult = null;
+   await act(async() => {
+     wrapper = render(<MyComponent {...props} />);
+   });
+   const {getByText} = wrapper;
-   const {getByText} = render(<MyComponent {...props} />);
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
```

This fixes the issue with this test. Technically, the other tests also share the problem, as we have modified the way the component initializes (and are performing a fetch call on initialization which we have not mocked, which is definitely wrong). We could mock the `getListOfFruit` call globally in the test suite and apply the same change we have here to the rest. Alternatively, we are going to move the code that generates the list of fruit pieces into a separate child component, like this:

```diff
import * as React from 'react';
-import { getListOfFruit }  from '../myApi';
+import { MyFruits } from './myFruits';

export interface Props {
  nameFromProps: string;
}

export const MyComponent: React.FunctionComponent<Props> = props => {
  const { nameFromProps } = props;
  const [userName, setUserName] = React.useState('');
-  const [fruits, setFruits] = React.useState([]);
-  React.useEffect(() => {
-    getListOfFruit().then(setFruits);
-  }, []);

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
-      <div>
-        <h4>Fruits gallore</h4>
-        {fruits.map((fruit, index) => (
-          <li key={index} data-testid={fruit}>{fruit}</li>
-        ))}
-      </div>
+      <MyFruits />
    </>
  );
};
``` 

And the code for our new `MyFruits` component can be found below
```javascript
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
```

Notice that if we run the tests again after doing this refactor, the tests still pass. This is because React Testing Library favors integration and functional testing, and as such it does not perform shallow-rendering of components, just mounts them straight-away. So, as long as our queries to retrieve elements are properly specified (for example, using unique values on the `data-testid` attribute), we can run the tests in a single file if needed. If you want to read more on why React Testing Library follows this approach, focusing more on a [testing trophy](https://twitter.com/kentcdodds/status/960723172591992832/photo/1) rather than the more classical testing pyramid, you can check these [two](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering) [links](https://kentcdodds.com/blog/write-tests)

Nonetheless, this does not mean that you cannot write unit tests using React Testing Library, and in fact we are going to change the code here to mock our `MyFruit` component and effectively make this a unit test in this regard. Notice though that React Testing Library's philosophy would not suggest to do this as regular practice, and in fact there is no real value to changing our current test battery from integration testing to unit testing in this case. We are just going to do so for illustration purposes alone.

The first thing we are going to do is disable the last test we coded as it does not make sense if the fruit rendering part is mocked (or we could move it into a new `myFruits.spec.tsx` file, which is definitely the better approach).
```diff
+ xit('should display the list of fruits after resolving the api call on initialization', async () => {
- it('should display the list of fruits after resolving the api call on initialization', async () => {
    // Arrange
    const getListOfFruitMock = jest
      .spyOn(myApi, 'getListOfFruit')
      .mockResolvedValue(['Melon', 'Apple', 'Pear']);

    // Act
```

And now, in order to mock our component, let us just mock the whole module that contains our `MyFruits` component and subsequently mock the component itself, as illustrated in the lines below.

```diff
import * as React from 'react';
import { render, fireEvent, waitForElement, act, RenderResult } from '@testing-library/react';
import * as myApi from '../myApi';
import { MyComponent, Props } from './myComponent';

+jest.mock('./myFruits.tsx', () => ({
+  MyFruits: () => <div />,
+}));

const baseProps: Props = {
  nameFromProps: null,
}
```

