import { UPDATE_COLLECTION_CACHE } from '../redux/reducers/cache-reducer';
const cacheMiddleware = () => (dispatch) => (action) => {
  const nextAction = { ...action };
  /**
   * Store the requests to the entity cache
   */
  if (
    action.type.match(/_FULFILLED$/) &&
    action?.meta?.entity &&
    Array.isArray(action?.payload?.data)
  ) {
    const { filter, entity, limit, offset } = action.meta;
    const cacheKey = `limit=${limit}&offset=${offset}&filter=${filter}`;
    dispatch({
      type: UPDATE_COLLECTION_CACHE,
      payload: {
        cacheKey,
        data: action.payload.data,
        entity
      }
    });
  }

  return dispatch(nextAction);
};

export default cacheMiddleware;
