/**
 * Function that looks for current data requests in cache. If the data is found, it will retrive them from cache.
 * If the data is not present in current chache, the next redux action is dispatched.
 * @param {Object} action redux action object
 * @param {function} next action creator to be dispatched if the data is not in cache
 * @param {function} dispatch redux store dispatcher
 * @param {function} getState function to get current redux store state
 */
const cachedActionCreator = (action, next, dispatch, getState) => {
  const { limit, offset, filter, entity } = action.nextOptions;
  const cacheKey = `limit=${limit}&offset=${offset}&filter=${filter}`;
  const { cacheReducer } = getState();
  const list = cacheReducer[entity].scopedData[cacheKey];
  if (Array.isArray(list) && list.length > 0) {
    const allEntities = cacheReducer[entity].allData;
    const data = list.map((id) => allEntities[id]);
    const nextAction = {
      type: `${action.type}_FULFILLED`,
      payload: {
        data,
        meta: action.nextOptions
      }
    };
    return Promise.resolve(dispatch(nextAction));
  }

  return dispatch(next(action.nextOptions));
};

export default cachedActionCreator;
