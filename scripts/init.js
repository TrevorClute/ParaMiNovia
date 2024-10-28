import { Overworld } from "./Overworld";
import { inject } from "@vercel/analytics";

const overworld = new Overworld({
  element: document.querySelector(".game-container"),
});
console.log(window.location.pathname);
overworld.init();
inject();
