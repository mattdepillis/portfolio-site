// sets the grid to 1, 2, or 3 cols based on screen width
export const setGridXs = (screenWidth) =>
screenWidth > 650 ?
  4 : screenWidth > 450 ?
    6 : 12

// determines the max number of items to show per section, dependent on screen width
export const setMaxItemsToShow = (screenWidth) =>
screenWidth > 650 ?
  21 : screenWidth > 450 ?
    16 : 10