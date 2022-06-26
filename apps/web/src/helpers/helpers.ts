export const getUrl = () => {
  let url = 'http://localhost:3333/graphql';

  if (
    process.env['NODE_ENV'] === 'development' ||
    process.env['NODE_ENV'] === 'test'
  ) {
    url = 'http://localhost:3333/graphql';
  } else if (process.env['NODE_ENV'] === 'production') {
    url = 'https://notely-web.herokuapp.com/graphql';
  }

  return url;
};
