export const loadCartsState = () => {
  try {
    const serializedState = localStorage.getItem('carts');
    if (serializedState === null) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (error) {
    return undefined;
  }
};

export const saveCartsState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('carts', serializedState);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCartsState = (state) => {
  try {
    localStorage.removeItem('carts');
  } catch (error) {
    console.log(error.message);
  }
};

export const saveBillState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('bill', serializedState);
  } catch (error) {
    console.log(error.message);
  }
};
