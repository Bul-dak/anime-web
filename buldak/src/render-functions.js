export const renderAnimeDetails = (animeObj) => {
  const dialog = document.getElementById("detailed-view");

  const img = document.createElement("img");
  img.setAttribute("src", animeObj.largeImageUrl);
  img.setAttribute("alt", `Picture of ${animeObj.title}`);

  const title = document.createElement("h3");
  title.textContent = animeObj.title;
  title.setAttribute("id", "main-title");

  dialog.append(img, title);

  if (animeObj.titleEnglish) {
    const title2 = document.createElement("h4");
    title2.textContent = animeObj.titleEnglish;
    dialog.append(title2);
  }
  if (animeObj.type) {
    const type = document.createElement("p");
    type.textContent = `Type: ${animeObj.type}`;
    type.setAttribute("id", "type");
    dialog.append(type);
  }
  if (animeObj.episodes) {
    const episodes = document.createElement("p");
    episodes.textContent = `Episodes: ${animeObj.episodes}`;
    episodes.setAttribute("id", "episodes");
    dialog.append(episodes);
  }
  if (animeObj.season) {
    const season = document.createElement("p");
    season.textContent = `Season: ${animeObj.season}`;
    season.setAttribute("id", "season");
    dialog.append(season);
  }
  if (animeObj.studio) {
    const studio = document.createElement("p");
    studio.textContent = `Studio: ${animeObj.studio}`;
    studio.setAttribute("id", "studio");
    dialog.append(studio);
  }
  if (animeObj.rank) {
    const rank = document.createElement("p");
    rank.textContent = `Rank: ${animeObj.rank}`;
    rank.setAttribute("id", "rank");
    dialog.append(rank);
  }
  if (animeObj.popularity) {
    const popularity = document.createElement("p");
    popularity.textContent = `Popularity: ${animeObj.popularity}`;
    popularity.setAttribute("id", "popularity");
    dialog.append(popularity);
  }
  if (animeObj.year) {
    const year = document.createElement("p");
    year.textContent = `Year: ${animeObj.year}`;
    dialog.append(year);
  }
  if (animeObj.aired) {
    const aired = document.createElement("p");
    aired.textContent = `Aired: ${animeObj.aired}`;
    aired.setAttribute("id", "aired");
    dialog.append(aired);
  }
  if (animeObj.synopsis) {
    const synopsis = document.createElement("p");
    synopsis.textContent = `Synopsis: ${animeObj.synopsis}`;
    synopsis.setAttribute("id", "synopsis");
    dialog.append(synopsis);
  }
  if (animeObj.trailer) {
    const trailer = document.createElement("video");
    trailer.textContent = `Trailer: ${animeObj.trailer}`;
    trailer.setAttribute("width", 320);
    trailer.setAttribute("height", 240);
    const vidSource = document.createElement("source");
    vidSource.setAttribute("src", `${trailer}`);
    trailer.append(vidSource);
    dialog.append(trailer);
  }
};

// function that renders anime in array stored in local storage with top 5 rankings.
export const renderTopFiveAnime = () => {
  // retrieve anime data from local storage
  const allAnimeArray = getLocalStorageKey("allAnime");

  // store the div where we'll be rendering our top ranked anime in a variable
  const topFiveDiv = document.querySelector("#top-five-anime");
  // Iterate through the first 5 items in array since anime in array are already stored in a rank base order.
  for (let i = 0; i <= 5; i++) {
    // create a div and with two elements inside. (top one will be the image and second one will be the title)
    const div = document.createElement("div");
    div.classList = "anime-card";

    const img = document.createElement("img");
    img.src = allAnimeArray[i].image;

    const title = document.createElement("h3");
    title.classList = "anime-title";
    title.textContent = allAnimeArray[i].title;

    // append the elements to div with class "anime-card"
    div.append(img);
    div.append(title);

    // append div to topFiveDiv
    topFiveDiv.append(div);
  }
};