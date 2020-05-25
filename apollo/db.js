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

export const QUERY_STOREPRODUCTCATALOG = {
  query: `
  query{
    storeProductCatalog{
      id
      name
      th
      storeProducts{
        id
        name
        price
        pictureUrl
        package
        stockOutDetail{
          name
          out
        }
      }
    }
  }
  `,
};

export const QUERY_ONLINEPRODUCTCATALOG = {
  query: `
  query{
    onlineProductCatalog{
      id
      name
      th
      onlineProducts{
        id
        name
        price
        pictureUrl
        package
        stockOutDetail{
          name
          out
        }
      }
    }
  }
  `,
};
