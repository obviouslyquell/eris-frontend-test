export const groupElems = (array) => {
  const groups = [];
  const group = [];
  for (let i = 0; i < array?.length; i++) {
    if (array[i].name === 'Appointment') {
      group.push(array[i]);
      for (let j = 0; j < array.length; j++) {
        if (array[j]?.appointmentId === array[i].id) {
          group.push(array[j]);
        }
      }
    } else if (!array[i]?.appointmentId) {
      group.push(array[i]);
    }
  }

  return group;
};

export const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
