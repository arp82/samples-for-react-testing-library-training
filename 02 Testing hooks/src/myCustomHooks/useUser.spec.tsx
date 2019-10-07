import * as React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useUser, User } from './useUser';
import { useUserWithContext } from './useUserWithContext';
import { DessertProvider } from '../myComponent/dessertContext';

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

  it('should increment user\'s age when having birthday', () => {
    const expectedNewAge = 18;
    const { result } = renderHook(() => useUser({...baseUser}));
    act(() => {
      result.current.hasBirthday();
    });
    expect(result.current.user.age).toBe(expectedNewAge);
  });

  it('should reset user to updated initial value', () => {
    const props = {
      initialUser: {...baseUser},
    };
    const { result, rerender } = renderHook(({ initialUser }) => useUser(initialUser), {
      initialProps: props,
    });
  
    const newProps = { initialUser: {...baseUser, firstName: 'Pepin', lastName: 'Illos'} };
    rerender(newProps);
  
    act(() => {
      result.current.resetToInitialValue();
    });
  
    expect(result.current.user.firstName).toBe('Pepin');
  });

  it('should get a list of hobbies on initialization for the user', async () => {
    const expectedHobbies = ['eating Ramen', 'catching Pikachus'];
    const { result, waitForNextUpdate } = renderHook(() => useUser({...baseUser}));
    expect(result.current.user.hobbies).toBeUndefined();
    
    await waitForNextUpdate();

    expect(result.current.user.hobbies).toEqual(expectedHobbies);
  });

  it('should increase the user age automatically', async () => {
    const expectedAge = baseUser.age + 3;
    const { result, waitForNextUpdate } = renderHook(() => useUser({...baseUser}));
    expect(result.current.user.age).toBe(baseUser.age);
    
    await waitForNextUpdate();
    await waitForNextUpdate();
    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.user.age).toBe(expectedAge);
  });

  it('should release the resources taken for age updating when unmounting', async () => {
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
    const expectedAge = baseUser.age + 1;
    const { result, waitForNextUpdate, unmount } = renderHook(() => useUser({...baseUser}));  
    await waitForNextUpdate();
    await waitForNextUpdate();
    expect(result.current.user.age).toBe(expectedAge);
    expect(clearIntervalSpy).not.toHaveBeenCalled();

    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('should update the list of hobbies when the favourite hobby changes if applicable', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useUser({...baseUser}));
    expect(result.current.user.hobbies).toBeUndefined();
    
    await waitForNextUpdate();  // Get the "hobbies" property populated

    act(() => { result.current.setFavouriteHobby('playing guitar'); });
    expect(result.current.user.hobbies).toEqual(['eating Ramen', 'catching Pikachus']);
    await waitForNextUpdate();
    expect(result.current.user.hobbies).toEqual(['eating Ramen', 'catching Pikachus', 'playing guitar']);

    act(() => { result.current.setFavouriteHobby('eating Ramen'); }); // Existing hobbies should trigger no changes
    await waitForNextUpdate();
    expect(result.current.user.hobbies).toEqual(['eating Ramen', 'catching Pikachus', 'playing guitar']);
  });

  it('should use the dessert context to indicate the user\'s favourite desserts', () => {
    const wrapper = ({ children }) => <DessertProvider>{children}</DessertProvider>
    const expectedFavouriteDesserts = ['brownie', 'cheesecake'];
    const { result } = renderHook(() => useUserWithContext({...baseUser}), { wrapper });

    act(() => { result.current.addFavouriteDessert('brownie'); });
    act(() => { result.current.addFavouriteDessert('cheesecake'); });
    act(() => { result.current.addFavouriteDessert('ice-cream'); });
    act(() => { result.current.removeFavouriteDessert('ice-cream'); });
    act(() => { result.current.removeFavouriteDessert('carrotcake'); });

    expect(result.current.user.myFavouriteDesserts).toEqual(expectedFavouriteDesserts);
  });
});
