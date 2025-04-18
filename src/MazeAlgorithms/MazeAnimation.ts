export const mazeGenerationAnimation = (theWalls: HTMLElement[]) => {
  const timeout = (index: number) => {
    setTimeout(() => {
      if (index === theWalls.length) {
        theWalls = [];
        return;
      }

      theWalls[index].className = "node node-wall";
      timeout(index + 1);
    }, 5);
  };

  timeout(0);
};
