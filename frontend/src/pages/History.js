import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Navigation from '../Components/Navigation';
import Row from '../Components/Row';
import { store } from '../Store/store';
import { toJS } from 'mobx';

const History = observer(() => {
  const { events, resources } = store;
  console.log('render');

  useEffect(() => {
    async function fetchEv() {
      await store.fetchEvents();
    }
    fetchEv();
  }, []);

  useEffect(() => {
    async function fetchRes() {
      await store.fetchResources();
    }
    fetchRes();
  }, [events]);

  return (
    <>
      <Navigation />
      <div className="table">
        <div className="header">
          <p>Event type</p>
          <p>Details</p>
          <p>Code</p>
          <p>Date</p>
        </div>
        <div className="content">
          {events &&
            resources &&
            toJS(events).map((e) => {
              const deIndex = toJS(resources).findIndex(
                (item) => item.id === `${e.resource}/${e.id}`,
              );
              return <Row element={e} key={e.id} resources={resources[deIndex]} />;
            })}
        </div>
      </div>
    </>
  );
});

export default History;
