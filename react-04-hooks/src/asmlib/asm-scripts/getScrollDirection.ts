function wrapper() {
  let oldScroll: number;
  return function () {
    const scrollDirection = oldScroll > window.scrollY ? 'UP' : 'DOWN';
    oldScroll = window.scrollY;
    return scrollDirection;
  };
}

export const getScrollDIrection = wrapper();
