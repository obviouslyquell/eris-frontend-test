import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Navigation';
import Row from '../Components/Row';

function History() {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState([]);

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
        }); //catch въебать
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
  console.log(details);
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
          {data.map((e, index) => (
            <Row element={e} key={index} />
          ))}
          {/* {data.map((e, i) => {
            const MyDate = new Date(e.date);
            return (
              <div className="content-item">
                <div>
                  <p className={`event ${e.name}`}>
                    {e.name === 'MedicationStatement'
                      ? 'Medication'
                      : e.name === 'AllergyIntolerance'
                      ? 'Allergy'
                      : e.name}
                  </p>
                </div>
                <div>
                  <p>{`${e.resource}/${e.id}`}</p>
                </div>
                <div>
                  <p>Code</p>
                </div>
                <div>
                  <p>
                    {MyDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
    </>
  );
}

export default History;
