export const cacheInitialState = {
  portfolios: {
    allData: {},
    scopedData: {}
  }
};

export const UPDATE_COLLECTION_CACHE =
  '@@cache-reducer/update-collection-cache';
export const UPDATE_CACHE_ENTRY = '@@cache-reducer/update-cache-entry';

const updateCollectionCache = (
  state,
  { payload: { entity, cacheKey, data } }
) => {
  const currentScope = [];
  const entityData = { ...state[entity].allData };
  data.forEach((item) => {
    currentScope.push(item.id);
    entityData[item.id] = item;
  });
  return {
    ...state,
    [entity]: {
      ...state[entity],
      allData: entityData,
      scopedData: {
        ...state[entity].scopedData,
        [cacheKey]: currentScope
      }
    }
  };
};

const updateCacheEntry = (state, { payload: { entity, data } }) => {
  const entityData = { ...state[entity].allData };
  entityData[data.id] = data;
  return {
    ...state,
    [entity]: {
      ...state[entity],
      allData: entityData
    }
  };
};

export default {
  [UPDATE_COLLECTION_CACHE]: updateCollectionCache,
  [UPDATE_CACHE_ENTRY]: updateCacheEntry
};
