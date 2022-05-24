import React from 'react';

function Row({ element }) {
  const MyDate = new Date(element.date);
  return (
    <div className="content-item">
      <div>
        <p className={`event ${element.name}`}>
          {element.name === 'MedicationStatement'
            ? 'Medication'
            : element.name === 'AllergyIntolerance'
            ? 'Allergy'
            : element.name}
        </p>
      </div>
      <div>
        <p>{`${element.resource}/${element.id}`}</p>
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
}

export default Row;
