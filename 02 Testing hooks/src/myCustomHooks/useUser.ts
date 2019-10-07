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
