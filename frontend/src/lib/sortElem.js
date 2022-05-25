export const sortElem = (a, b) => {
  if (Date.parse(a.date) > Date.parse(b.date)) {
    return -1;
  }
  if (Date.parse(a.date) < Date.parse(b.date)) {
    return 1;
  }
  return 0;
};
