import { Overworld } from "./Overworld";

const overworld = new Overworld({
  element: document.querySelector(".game-container"),
});
console.log(window.location.pathname);
overworld.init();
