// Create local storage helper functions.

// stores a value in local storage using a key
export const setLocalStorageKey = (key, value) => {
  // used to create new local storage saves for data with future uses
  localStorage.setItem(key, JSON.stringify(value));
};

// retrieves a value from local storage using a key
export const getLocalStorageKey = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// These functions are to be used with saving the anime to a users profile

export const getUsers = () => {
  // for when a new user is added
  getLocalStorageKey("users");
};

export const setSavedAnime = (animeToBeSaved) => {
  try {
    console.log(" Anime to be saved: ", animeToBeSaved);
    const storedAnime = getLocalStorageKey("savedAnime");
    storedAnime[animeToBeSaved.id] = animeToBeSaved;
    return storedAnime;
  } catch (error) {
    console.error(error.message);
  }
};

export const getSavedAnime = () => {
  return getLocalStorageKey("saved-anime") || {};
};

// These functions for when getting recommendations for a user based off of criteria provided by the form

// this in particular needs to be reset when a user hits the "save to watch list button" signifying that the anime is satisfactory
export const setRecommendedAnime = () => {
  setLocalStorageKey("recommendedAnime", []);
};
export const getRecommendedAnime = () => {
  return getLocalStorageKey("recommendedAnime") || {};
};
export const addRecommendedAnime = (recommendation) => {
  const previousRecommendations = getRecommendedAnime();
  previousRecommendations[recommendation.id] = recommendation;
  return previousRecommendations;
};
