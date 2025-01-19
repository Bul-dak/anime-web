import { handleDetailsOpen } from "./dom-helpers";

const main = async () => {
  const button = document.getElementById("test-modal");
  button.addEventListener("click", handleDetailsOpen);
};

main();
