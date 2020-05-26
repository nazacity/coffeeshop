export const loadStoreCartsState = () => {
  try {
    const serializedState = localStorage.getItem('StoreCarts');
    if (serializedState === null) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (error) {
    return undefined;
  }
};

export const saveStoreCartsState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('StoreCarts', serializedState);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteStoreCartsState = (state) => {
  try {
    localStorage.removeItem('StoreCarts');
  } catch (error) {
    console.log(error.message);
  }
};

export const loadOnlineCartsState = () => {
  try {
    const serializedState = localStorage.getItem('OnlineCarts');
    if (serializedState === null) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (error) {
    return undefined;
  }
};

export const saveOnlineCartsState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('OnlineCarts', serializedState);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteOnlineCartsState = (state) => {
  try {
    localStorage.removeItem('OnlineCarts');
  } catch (error) {
    console.log(error.message);
  }
};
