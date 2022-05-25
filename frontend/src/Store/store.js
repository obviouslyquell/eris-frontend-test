import { makeAutoObservable, runInAction } from 'mobx';
import { groupElems, groupBy } from '../lib/groupElems';
import { sortElem } from '../lib/sortElem';
export const store = makeAutoObservable({
  events: null,
  resources: null,
  pseudo: {},
  fetchEvents: () => {
    fetch('http://localhost:5010/events', { method: 'POST' })
      .then((response) => response.json())
      .then((data) =>
        runInAction(() => {
          store.events = groupElems(data.items.sort(sortElem));
          store.pseudo = groupBy(data.items.sort(sortElem), 'appointmentId');
        }),
      )
      .catch((err) => console.error(err.message));
  },

  fetchResources: () => {
    const ids = store.events ? { ids: store.events.map((e) => `${e.resource}/${e.id}`) } : null;

    if (ids) {
      fetch('http://localhost:5010/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(ids),
      })
        .then((response) => response.json())
        .then((data) =>
          runInAction(() => {
            store.resources = data.items;
          }),
        )
        .catch((err) => console.error(err.message));
    }
  },
});
