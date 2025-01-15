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
