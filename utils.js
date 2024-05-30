const utils = {
  widthGrid(n) {
    return n * 16;
  },
  gridRound(n) {
    let base16 = Math.round(n / 16);
    return base16 * 16;
  },
};
