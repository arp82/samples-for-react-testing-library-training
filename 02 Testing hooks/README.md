# Testing React Hooks

React Testing Library is a library built on DOM Testing Library to provide support for React component testing. DOM Testing Library is a light-weight solution to write maintainable tests for UI applications. The main idea behind this library is to focus on the actual functionality behind a given application, so that the tests are more concerned with that the application does and what the user sees rather than implementation details and the abstractions behind them. This approach also favors maintainability in the long term, as the tests themselves should not break when refactoring or performing implementation changes as long as the same outwards functionality is kept.

In this sample, we will explore the details of custom hooks testing using React Hooks Testing Library

## Getting started

We will take the `00 Base` sample as the starting point for the tutorial. After installing our node dependencies, let us install as well both React Test Renderer and React Hooks Testing Library as dev-dependencies

```
npm install @testing-library/react-hooks react-test-renderer -D
```

Now we can use the tools from React Hooks Testing Library to properly test our custom hooks. It is important to mention that we should not test every hook though, as most of the behaviour behind our hooks will be tested as part of the regular functional tests covering their containing components. However, we might have custom hooks that are not bound to a specific component, or hooks whose complexity demands separate testing suites. Those are the intended targets for the kind of tests we are going to be presenting in this sample

## Testing stateful logic

So, let's create a basic custom hook to use as the target of our test battery. Create a new folder called `myCustomHooks` under the `src` folder, and populate it with the following `useUser.ts` file

```javascript
import * as React from 'react';

interface User {
  firstName: string;
  lastName: string;
  age: number;
}

export const useUser = (initialUser: User = {firstName: '', lastName: '', age: 0}) => {
  const [user, setUser] = React.useState<User>({...initialUser});
  const hasBirthday = React.useCallback(() => setUser((u) => ({...u, age: u.age + 1})), []);
  const resetToInitialValue = React.useCallback(() => setUser({...initialUser}), [initialUser]);
  const getFullName = React.useCallback(() => `${user.firstName} ${user.lastName}`, []);
  
  return {
    user,
    hasBirthday,
    resetToInitialValue,
    getFullName,
  };
};
```

So this hook creates a user (three properties: firstname, lastname and age) accepting an initial user as default value and returns as well some utility functions to access or modify the user created. Let's start with the most basic test example possible, in a new file called `useUser.spec.ts`

```javascript
import { renderHook } from '@testing-library/react-hooks';
import { useUser, User } from './useUser';

const baseUser: User = {
  firstName: 'Jenny',
  lastName: 'Doe',
  age: 17,
}

describe('useUser', () => {
  it('should provide a default user with the initial values provided', () => {
    const fullName = `${baseUser.firstName} ${baseUser.lastName}`;
    const { result } = renderHook(() => useUser({...baseUser}));
    expect(result.current.user).toEqual(baseUser);
    expect(result.current.getFullName()).toBe(fullName);
    expect(typeof result.current.getFullName).toBe('function');
    expect(typeof result.current.hasBirthday).toBe('function');
    expect(typeof result.current.resetToInitialValue).toBe('function');
  });
});
```

So, if you have ever tried to test a hook straight-way without setting it inside a component, you'd probably familiar with a log error indicating that 'Hooks can only be called inside the body of a function component (https://fb.me/react-invalid-hook-call)'. To avoid this, the magic here is performed inside the `renderHook` method, which accepts a callback in whose body our custom hook is called. The returned value is stored in `result.current`, and here our test checks that we're getting what we expect from the hook (a user object and three functions) as well as that the method `getFullName` does indeed return the user's fullname.

Let us move now onto a second test to check state updates

```diff
-import { renderHook } from '@testing-library/react-hooks';
+import { renderHook, act } from '@testing-library/react-hooks';
import { useUser, User } from './useUser';

const baseUser: User = {
  firstName: 'Jenny',
  lastName: 'Doe',
  age: 17,
}

describe('useUser', () => {
  it('should provide a default user with the initial values provided', () => {
    const fullName = `${baseUser.firstName} ${baseUser.lastName}`;
    const { result } = renderHook(() => useUser({...baseUser}));
    expect(result.current.user).toEqual(baseUser);
    expect(result.current.getFullName()).toBe(fullName);
    expect(typeof result.current.getFullName).toBe('function');
    expect(typeof result.current.hasBirthday).toBe('function');
    expect(typeof result.current.resetToInitialValue).toBe('function');
  });

+  it('should increment user\'s age when having birthday', () => {
+    const expectedNewAge = 18;
+    const { result } = renderHook(() => useUser({...baseUser}));
+    act(() => {
+      result.current.hasBirthday();
+    });
+    expect(result.current.user.age).toBe(expectedNewAge);
+  });
});
```

In this second test, we call `hasBirthday` and check that, effectively, the user's age is increased by 1. Since we are changing the state this time, we need to wrap the state change operation in an `act` callback to ensure that the test execution follows the same behaviour as React. 

Imagine now that we want to simulate that, due to a change in the containing component's props, we need to recreate the user with a different set of initial params. We can simulate this scenario with the test below.

```diff
+  it('should reset user to updated initial value', () => {
+    const props = {
+      initialUser: {...baseUser},
+    };
+    const { result, rerender } = renderHook(({ initialUser }) => useUser(initialUser), {
+      initialProps: props,
+    });
+  
+    const newProps = { initialUser: {...baseUser, firstName: 'Pepin', lastName: 'Illos'} };
+    rerender(newProps);
+  
+    act(() => {
+      result.current.resetToInitialValue();
+    });
+  
+    expect(result.current.user.firstName).toBe('Pepin');
+  });
```

In this case, we extract the `rerender` callback from the returned values from `renderHook`, and we have also changed the way we call the latter: now we provide props as an argument of the wrapping callback, and we also provide a second options argument that sets up the initial props to be used. When we call the `rerender` method, we also call it with a prop object to specify the new props to use in the next rendering. If we then call the `resetToInitialValue` after rerendering (which involves a change in the state and must thus be enveloped in an `act` callback), our rendered result is automatically updated with the values for the user object.

## Testing side effect management

In this section, we are going to delve deeper into hook testing covering now side effect management. Let us start by modifying our custom hook so that it includes some side effects as part of its functionality.

```diff
import * as React from 'react';

export interface User {
  firstName: string;
  lastName: string;
  age: number;
+  hobbies?: string[];
}

export const useUser = (initialUser: User = {firstName: '', lastName: '', age: 0}) => {
  const [user, setUser] = React.useState<User>({...initialUser});
+ const [favouriteHobby, setFavouriteHobby] = React.useState<string>();
  const hasBirthday = React.useCallback(() => setUser((u) => ({...u, age: u.age + 1})), []);
  const resetToInitialValue = React.useCallback(() => setUser({...initialUser}), [initialUser]);
  const getFullName = React.useCallback(() => `${user.firstName} ${user.lastName}`, []);

+  // Side-effects
+  React.useEffect(() => { // On initialization (componentDidMount)
+    setTimeout(() => {
+      setUser({...user, hobbies: ['eating Ramen', 'catching Pikachus']});
+    }, 500);
+  }, []);
+
+  React.useEffect(() => { // On initialization (componentDidMount)
+    const interval = setInterval(() => {
+      hasBirthday();
+    }, 1000);
+
+    return () => {        // On removal (componentWillUnmount)
+      clearInterval(interval);
+    };
+  }, []);
+
+ React.useEffect(() => { // On state change/update
+   setTimeout(() => {
+     setUser((u) => {
+       if (u.hobbies && u.hobbies.indexOf(favouriteHobby) < 0) {
+         return { ...u, hobbies: [...u.hobbies, favouriteHobby] };
+       }
+       return u;
+     });
+   }, 100);
+ }, [favouriteHobby]);
  
  return {
    user,
    hasBirthday,
    resetToInitialValue,
    getFullName,
+   setFavouriteHobby, 
  };
};
```

OK, so we got some big changes here, let's see them little by little. First of all, we have extended our User interface with two new optional properties: a list of hobbies for the user, and a property that indicates which is his/her favourite dessert. Additionally, we have added a set of new side-effects:
- When the user is created, they get a list of hobbies automatically assigned. This sort of represents a call to some kind of service and it would stand to reason that it would get different values for different users, but for simplicity we are always returning the same list regardless of the user. This would be the typical call you would perform on the componentDidMount lifecycle stage of a given component using this hook.
- Whenever a second passes, the user turns one year older (now, that's a hyper-accelerated user!). Since we are using an interval to periodically update the user's age, we need to remove it from memory once the component containing the user is unmounted. This side effect takes place both in the componentDidMount and componentDidUnmount lifecycle stages, if we were using the class-based approach.
- Finally, whenever we update the favourite hobby piece of state, we also update the corresponding list of hobbies in the user object, appending it to the list if it was not present already (to illustrate a side effect akin to behaviour covered by the componentDidUpdate/getDerivedStateFromProps methods). Notice that the update is asynchronous, due to the fact that we have wrapped the actual call to `setUser` in a `setTimeout` callback.

Now let's move on to how to test this rather complex amalgam of side-effects.

```diff
+  it('should get a list of hobbies on initialization for the user', async () => {
+    const expectedHobbies = ['eating Ramen', 'catching Pikachus'];
+    const { result, waitForNextUpdate } = renderHook(() => useUser({...baseUser}));
+    expect(result.current.user.hobbies).toBeUndefined();
+    
+    await waitForNextUpdate();
+
+    expect(result.current.user.hobbies).toEqual(expectedHobbies);
+  });
```

With this new test we check that the user's hobbies get updated on initialization according to the first side effect we have added into our hook. The key element here is the `waitForNextUpdate` method, which returns a promise that resolves once the hook is updated by the side effect. You may notice that several warning regarding the use of the `act` wrapper will appear in the console logs, but since the update of the state is internal to the hook code and not the test, you cannot actually wrap it in an `act` callback. This is an issue that will be fixed in React 16.9 though.

Let's see now if we are actually updating the user's age every second with another test.

```diff
+  it('should increase the user age automatically', async () => {
+    const expectedAge = baseUser.age + 3;
+    const { result, waitForNextUpdate } = renderHook(() => useUser({...baseUser}));
+    expect(result.current.user.age).toBe(baseUser.age);
+    
+    await waitForNextUpdate();
+    await waitForNextUpdate();
+    await waitForNextUpdate();
+    await waitForNextUpdate();
+
+    expect(result.current.user.age).toBe(expectedAge);
+  });
```

Given the rather contrieved example we are using here (I would not expect your custom hooks to have this kind of interval-update-based logic), we need to wait for 4 updates in order to have the age increased by 3. This is so because the first update corresponds to the first time we "fetch" the hobbies for the user. Other than that, the test behaves in a very similar way to the previous one. Let's see if we can trigger the on-unmount behaviour.
```diff
+  it('should release the resources taken for age updating when unmounting', async () => {
+    const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
+    const expectedAge = baseUser.age + 1;
+    const { result, waitForNextUpdate, unmount } = renderHook(() => useUser({...baseUser}));  
+    await waitForNextUpdate();
+    await waitForNextUpdate();
+    expect(result.current.user.age).toBe(expectedAge);
+    expect(clearIntervalSpy).not.toHaveBeenCalled();
+
+    unmount();
+    expect(clearIntervalSpy).toHaveBeenCalled();
+  });
```

Finally, let's build a test to cover the side effect for whenever the favouriteDessert prop changes.

```diff
+  it('should update the list of hobbies when the favourite hobby changes if applicable', async () => {
+    const { result, waitForNextUpdate } = renderHook(() => useUser({...baseUser}));
+    expect(result.current.user.hobbies).toBeUndefined();
+    
+    await waitForNextUpdate();  // Get the "hobbies" property populated
+
+    act(() => { result.current.setFavouriteHobby('playing guitar'); });
+    expect(result.current.user.hobbies).toEqual(['eating Ramen', 'catching Pikachus']);
+    await waitForNextUpdate();
+    expect(result.current.user.hobbies).toEqual(['eating Ramen', 'catching Pikachus', 'playing guitar']);
+
+    act(() => { result.current.setFavouriteHobby('eating Ramen'); }); // Existing hobbies should trigger no changes
+    await waitForNextUpdate();
+    expect(result.current.user.hobbies).toEqual(['eating Ramen', 'catching Pikachus', 'playing guitar']);
+  });
```

So, first of all, we wait for the first update, the one that populates our `hobbies` property simulating a fetch call. Then, we proceed to set the state for the `favouriteHobby` user property. This triggers the side-effect, but since the actual `user` state update lies inside a `setTimeout` callback, it will not be triggered as part of the same `act` call in which we are updating `favouriteHobby`. Insted, we have to wait for the next update for this timeout to resolve. Notice that, given our implementation for updating `user` state through this side effect, we do not change the effective contents of `hobbies` if the new `favouriteHobby` provided is already in the list.

## Testing hooks with Context

In this section, we are going to add custom React Context and Context Provider to application and code some tests to properly check how our custom hooks works alongside the aforementioned context. First of all, let's create a new file called `dessertContext.tsx` in our component's folder.

```javascript
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
```

This file simply defines a Context with three properties: an array of strings representing a list of desserts, and suitable methods to add or remove items from said array. The `DessertProvider` component already acts as a wrapper that automatically includes the context provider with suitable implementations for the different properties of said context, storing the list of desserts in an internal piece of state.

Now we want to use this context within our custom hook. However, since this code is meant only for illustration purposes, instead of just modifying out existing hook (and potentially changing the behaviour of our component and hence making it necessary to refactor our tests), we are going to create a new file `useUserWithContext.ts`, and we are going to populate it with the same contents as `useUser.ts`, replicated below for clarity.
```javascript
import * as React from 'react';

export interface User {
  firstName: string;
  lastName: string;
  age: number;
  hobbies?: string[];
}

export const useUser = (initialUser: User = {firstName: '', lastName: '', age: 0}) => {
  const [user, setUser] = React.useState<User>({...initialUser});
  const [favouriteHobby, setFavouriteHobby] = React.useState<string>();
  const hasBirthday = React.useCallback(() => setUser((u) => ({...u, age: u.age + 1})), []);
  const resetToInitialValue = React.useCallback(() => setUser({...initialUser}), [initialUser]);
  const getFullName = React.useCallback(() => `${user.firstName} ${user.lastName}`, []);

  // Side-effects
  React.useEffect(() => { // On initialization (componentDidMount)
    setTimeout(() => {
      setUser({...user, hobbies: ['eating Ramen', 'catching Pikachus']});
    }, 500);
  }, []);

  React.useEffect(() => { // On initialization (componentDidMount)
    const interval = setInterval(() => {
      hasBirthday();
    }, 1000);

    return () => {        // On removal (componentWillUnmount)
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => { // On state change/update
    setTimeout(() => {
      setUser((u) => {
        if (u.hobbies && u.hobbies.indexOf(favouriteHobby) < 0) {
          return { ...u, hobbies: [...u.hobbies, favouriteHobby] };
        }
        return u;
      });
    }, 100);
  }, [favouriteHobby]);
  
  return {
    user,
    hasBirthday,
    resetToInitialValue,
    getFullName,
    setFavouriteHobby,
  };
};
```

Next, let's modify our new custom hook `useUserWithContext.ts` so that it uses the newly created context.

```diff
import * as React from 'react';
+import { DessertContext } from '../myComponent/dessertContext';

export interface User {
  firstName: string;
  lastName: string;
  age: number;
  hobbies?: string[];
+  myFavouriteDesserts?: string[];
}

-export const useUser = (initialUser: User = {firstName: '', lastName: '', age: 0}) => {
+export const useUserWithContext = (initialUser: User = {firstName: '', lastName: '', age: 0}) => {
  const [user, setUser] = React.useState<User>({...initialUser});
  const [favouriteHobby, setFavouriteHobby] = React.useState<string>();
+  const {desserts, addDessert, removeDessert} = React.useContext(DessertContext);
  const hasBirthday = React.useCallback(() => setUser((u) => ({...u, age: u.age + 1})), []);
...

+  React.useEffect(() => {
+    setUser(u => ({...u, myFavouriteDesserts: [...desserts]}));
+  }, [desserts]);
  
  return {
    user,
    hasBirthday,
    resetToInitialValue,
    getFullName,
    setFavouriteHobby,
+    addFavouriteDessert: addDessert,
+    removeFavouriteDessert: removeDessert,
  };
};

```

So, basically, we are exposing the `addDessert` and `removeDessert` as part of our hook's returned object, and we have also added a new side-effect so that a new property called `myFavouriteDesserts` stores a copy of the list of desserts provided by the context. Next, we will add a test to ensure that our custom hook is indeed using the newly defined context. First of all, we are going to need React/JSX specific syntax, so we are changing the extension of our test file from `useUser.spec.ts` to `useUser.spec.tsx`. Then, we add the changes below to its contents.

```diff
+import * as React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useUser, User } from './useUser';
+import { useUserWithContext } from './useUserWithContext';
+import { DessertProvider } from '../myComponent/dessertContext';
...

+  it('should use the dessert context to indicate the user\'s favourite desserts', () => {
+    const wrapper = ({ children }) => <DessertProvider>{children}</DessertProvider>
+    const expectedFavouriteDesserts = ['brownie', 'cheesecake'];
+    const { result } = renderHook(() => useUserWithContext({...baseUser}), { wrapper });
+
+    act(() => { result.current.addFavouriteDessert('brownie'); });
+    act(() => { result.current.addFavouriteDessert('cheesecake'); });
+    act(() => { result.current.addFavouriteDessert('ice-cream'); });
+    act(() => { result.current.removeFavouriteDessert('ice-cream'); });
+    act(() => { result.current.removeFavouriteDessert('carrotcake'); });
+
+    expect(result.current.user.myFavouriteDesserts).toEqual(expectedFavouriteDesserts);
+  });
```

In this test, we have created a Context Wrapper component that wraps a child component within the Provider we defined previously. This is the reason why we need the React/JSX dependencies this time for the test, but how do we tell React Hooks Testing Library to use this wrapper when rendering our custom hook for testing purposes? Fortunately, the `renderHook` method's second option argument also has a `wrapper` property (similar to the `initialProps` property we used in some of our previous tests) which we can use to provide this wrapping component. By doing so, the context that our `useUserWithContext` hook is expecting is properly initialized, and we can now perform several actions to modify the context and trigger the subsequent side effects that also update the state of our custom hook, ultimately modifying the `myFavouriteDesserts` property of `user`.