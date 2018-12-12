import React from 'react';
import PortfolioItem from '../../SmartComponents/Portfolio/PortfolioItem';
import { getUserApi } from '../Shared/userLogin';

const userApi = getUserApi();

export function listPortfolios() {
  return userApi.listPortfolios().then(data => data, error => console.error(error));
}

export function getPortfolioItems() {
  return listPortfolioItems();
}

export function listPortfolioItems() {
  return userApi.listPortfolioItems().then(data => processPortfolioItems(data), error => console.error(error));
}

export function getPortfolioItem(portfolioId, portfolioItemId) {
  return userApi.fetchPortfolioItemFromPortfolio(portfolioId, portfolioItemId)
  .then(data => data, error => console.error(error));
}

export function getPortfolio(portfolioId) {
  return userApi.fetchPortfolioWithId(portfolioId).then(data => data, error => console.error(error));
}

export function getPortfolioItemsWithPortfolio(portfolioId) {
  return userApi.fetchPortfolioItemsWithPortfolio(portfolioId)
  .then(data => processPortfolioItems(data), error => console.error(error));
}

function processPortfolioItems(items) {
  return { portfolioItems: items.map((item, row) => processPortfolioItem(row, item)) };
}

// Again why components in Redux?
function processPortfolioItem(data) {
  return <PortfolioItem { ...data } />;
}

export async function addPortfolio(portfolioData, items) {
  let portfolio = await userApi.addPortfolio(portfolioData);

  let portfolioItems = [];
  let idx = 0;
  if (portfolio && items && items.length > 0) {
    // ForEach?
    for (idx = 0; idx < items.length; idx++) {
      let newItem = await userApi.addPortfolioItem (JSON.stringify ({ service_offering_ref: items[idx].id }));
      portfolioItems.push(newItem);
    }

    return userApi.addPortfolioItemToPortfolio(portfolio.id, JSON.stringify({ portfolio_item_id: portfolioItems[0].id })).then(() => {
      console.log('Add Portfolio Called successfully.');
    }, (error) => {
      window.console.error(error);
    });
  }
  else {
    return portfolio;
  }
}

// Why no .catch block?
export async function updatePortfolio(portfolioData) {
  return userApi.updatePortfolio(portfolioData).then(() => {
    console.log('Update Portfolio Called successfully.');
  }, (error) => {
    window.console.error(error);
  });
}
