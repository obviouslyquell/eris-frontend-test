import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Navigation';
import Row from '../Components/Row';

function History() {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState([]);
  console.log('render');
  const sortElem = (a, b) => {
    if (Date.parse(a.date) > Date.parse(b.date)) {
      return -1;
    }
    if (Date.parse(a.date) < Date.parse(b.date)) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    async function fetchData() {
      await fetch('http://localhost:5010/events', { method: 'POST' })
        .then((response) => response.json())
        .then((data) => {
          setData(data.items.sort(sortElem));
        })
        .catch((err) => console.error(err.message));
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchRes() {
      const ids = { ids: data.map((e) => `${e.resource}/${e.id}`) };
      await fetch('http://localhost:5010/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(ids),
      })
        .then((response) => response.json())
        .then((data) => {
          setDetails(data.items);
        })
        .catch((err) => console.error(err.message));
    }
    fetchRes();
  }, [data]);
  console.log('render');
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
          {data.map((e) => {
            const deIndex = details.findIndex((item) => item.id === `${e.resource}/${e.id}`);
            return <Row element={e} key={e.id} resources={details[deIndex]} />;
          })}
        </div>
      </div>
    </>
  );
}

export default History;
