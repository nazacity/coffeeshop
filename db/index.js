import fetch from 'isomorphic-unfetch';

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
