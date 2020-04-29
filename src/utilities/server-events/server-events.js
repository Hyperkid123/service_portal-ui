import { getAxiosInstance } from '../../helpers/shared/user-login';
import { CATALOG_API_BASE } from '../constants';
import { UPDATE_CACHE_ENTRY } from '../../redux/reducers/cache-reducer';

const ServerEvents = {
  _instance: null,
  get instance() {
    if (!this._instance) {
      throw new Error('Server events were not initialized');
    }

    return this._instance;
  },

  initialize(user, store) {
    const eventSource = new EventSource(
      `http://localhost:5002/subscribe?username=${user.identity.user.username}&channel=${user.identity.account_number}`
    );

    eventSource.addEventListener('portfolio.update', (message) => {
      const data = JSON.parse(message.data);
      const portfoliosCache = this._instance.store.getState().cacheReducer
        .portfolios.allData;
      if (portfoliosCache[data.id]) {
        this._instance.axiosInstance
          .get(`${CATALOG_API_BASE}/portfolios/${data.id}`)
          .then((portfolio) =>
            this._instance.dispatch({
              type: UPDATE_CACHE_ENTRY,
              payload: { entity: 'portfolios', data: portfolio }
            })
          );
      }
    });

    this._instance = {
      eventSource,
      store,
      dispatch: store.dispatch,
      axiosInstance: getAxiosInstance()
    };
  }
};

export default ServerEvents;
