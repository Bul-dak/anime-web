import { renderAnimeDetails } from "./render-functions";
import { getAnimeById } from "./fetch-fuctions";

export const handleDetailsOpen = async (event) => {
  const animeObj = await getAnimeById(52991);
  renderAnimeDetails(animeObj);

  const dialog = document.querySelector("dialog");
  dialog.showModal();
};
