import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import store from './utilities/store';
import Router from './router';
import { IntlProvider } from 'react-intl';
import { initializeApp } from '@scalprum/core';

initializeApp({
  id: 'catalog',
  name: 'catalog',
  unmount: () =>
    unmountComponentAtNode(document.getElementById('catalog-root')),
  update: console.log,
  mount: () =>
    render(
      <Provider store={store(true)}>
        <IntlProvider locale="en">
          <Router />
        </IntlProvider>
      </Provider>,
      document.getElementById('catalog-root')
    )
});
