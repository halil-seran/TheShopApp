import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

import ShopNavigator from "./ShopNavigator";

const navigationContainer = props => {
  const navRef = useRef();
  const isAuth = useSelector(state => !!state.auth.token)  // double !! is force true or force || not null or tanımlanmamış

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' })
      );
    }
  }, [isAuth]);

  return (
    <ShopNavigator ref={navRef} />
  );
};

export default navigationContainer;