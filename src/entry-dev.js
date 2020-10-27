import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './utilities/store';
import Router from './router';
import { IntlProvider } from 'react-intl';
import { initializeApp } from '@scalprum/core';

console.log('%c Catalog UI started in development mode', 'color: blue');

initializeApp({
  id: 'catalog',
  name: 'catalog',
  unmount: () =>
    unmountComponentAtNode(document.getElementById('catalog-root')),
  update: console.log,
  mount: () =>
    render(
      <Provider store={store()}>
        <IntlProvider locale="en">
          <Router />
        </IntlProvider>
      </Provider>,
      document.getElementById('catalog-root')
    )
});
