// Create local storage helper functions.

// stores a value in local storage using a key
export const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// retrieves a value from local storage using a key
export const getLocalStorageKey = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};
