export const addPortfolioSchema = {
  type: 'object',
  properties: {
    name: { title: 'New Portfolio Name', type: 'string' },
    description: { title: 'Description', type: 'string' }
  },
  required: [ 'name', 'description' ]
};

export const editPortfolioSchema = {
  type: 'object',
  properties: {
    name: { title: 'Edit Portfolio', type: 'string' },
    description: { title: 'Description', type: 'string' }
  },
  required: [ 'name', 'description' ]
};
