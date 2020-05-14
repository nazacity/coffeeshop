export const getData = async (METHOD) => {
  const uri = process.env.APOLLO_URL;
  const response = await fetch(uri, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(METHOD),
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  }
};

export const QUERY_PRODUCTS = {
  query: `
  query{
    products{
      id
      name
      description
      price
      pictureUrl
      catalog
    }
  }
  `,
};

export const QUERY_CATALOGS = {
  query: `
  query{
    catalogs {
      name
      th
    }
  }
  `,
};

export const QUERY_PROMOTIONS = {
  query: `
  query{
    promotion{
      id
      title
      detail
      pictureUrl
      products{
        id
        name
        description
        price
        pictureUrl
        catalog
        createdAt
      }
      price
    }
  }
  `,
};

export const QUERY_USER = {
  query: `
  query{
    user{
      id
      lineId
      firstName
      lastName
      email
      phone
      pictureUrl
      state
      createdAt
      carts{
        id
        product{
          id
          name
          pictureUrl
          price
        }
        quantity
      }
    }
  }
  `,
};

export const QUERY_USERS = {
  query: `
  query{
    users{
      id
      firstName
      lastName
      email
      phone
      pictureUrl
      state
      createdAt
      carts{
        id
        product{
          id
          name
          pictureUrl
          price
        }
        quantity
      }
    }
  }
  `,
};

export const getUserByAccessToken = async (accessToken) => {
  const uri = process.env.APOLLO_URL;
  let user;
  if (accessToken) {
    const responseUser = await fetch(uri, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${accessToken}` || '',
      },
      body: JSON.stringify(QUERY_USER),
    });
    if (responseUser.ok) {
      user = await responseUser.json();
    }
  }
  return user.data.user;
};
