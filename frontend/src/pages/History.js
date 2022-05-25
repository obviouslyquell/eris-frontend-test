import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Navigation from '../Components/Navigation';
import Row from '../Components/Row';
import { store } from '../Store/store';
import { toJS } from 'mobx';

const History = observer(() => {
  const { events, resources, pseudo } = store;
  const [visibleItems, setVisibleItems] = useState([]);
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

  useEffect(() => {});

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      console.log('sadf');
    }
  };
  console.log(toJS(pseudo));
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
