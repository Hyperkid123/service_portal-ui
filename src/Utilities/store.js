
import promiseMiddleware from 'redux-promise-middleware';
import { ReducerRegistry, applyReducerHash } from '@red-hat-insights/insights-frontend-components';
import reduxLogger from 'redux-logger';
import thunk from 'redux-thunk';
import orderReducer, { orderInitialState } from '../redux/reducers/orderReducer';
import platformReducer, { platformInitialState } from '../redux/reducers/platformReducer';
import portfolioReducer, { portfoliosInitialState } from '../redux/reducers/portfolioReducer';
import uiReducer, { uiInitialState } from '../redux/reducers/UiReducer';
import { notifications, notificationsMiddleware } from '@red-hat-insights/insights-frontend-components/components/Notifications';

const registry = new ReducerRegistry({}, [ promiseMiddleware(), notificationsMiddleware({
  errorDescriptionKey: 'message'
}), thunk, reduxLogger ]);

registry.register({
  orderReducer: applyReducerHash(orderReducer, orderInitialState),
  platformReducer: applyReducerHash(platformReducer, platformInitialState),
  portfolioReducer: applyReducerHash(portfolioReducer, portfoliosInitialState),
  uiReducer: applyReducerHash(uiReducer, uiInitialState),
  notifications
});

export default registry.getStore();
