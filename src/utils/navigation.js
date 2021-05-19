/**
 * Navigation
 * Permits navigation from outside of components.
 * For use in utilities, services and sagas
 */

import { NavigationActions, StackActions } from 'react-navigation';

let navigator;

export function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

export function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

export function navigateBack() {
  navigator.dispatch(NavigationActions.back());
}
