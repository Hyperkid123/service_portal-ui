import React from 'react';
import { Provider } from 'react-redux';
import store from './utilities/store';
import Router from './router';
import { IntlProvider } from 'react-intl';
import { initializeApp } from '@scalprum/core';

console.log('%c Catalog UI started in development mode', 'color: blue');

const Catalog = () => (
  <Provider store={store()}>
    <IntlProvider locale="en">
      <Router />
    </IntlProvider>
  </Provider>
);

initializeApp({
  id: 'catalog',
  name: 'catalog',
  unmount: () => {
    console.log('%c unmounting catalog', 'color: blue');
  },
  update: console.log,
  // eslint-disable-next-line react/display-name
  mount: (api) => {
    console.log('mouting catalog', api, Catalog);
    return <Catalog />;
  }
});
