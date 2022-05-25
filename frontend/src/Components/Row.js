import React from 'react';

function Row({ element, resources }) {
  const MyDate = new Date(element.date);

  let value = '';
  if (resources?.values) {
    if (resources.values.length === 0) {
      value = '';
    }
    if (resources.values.length > 0) {
      if (typeof resources.values[0] === 'object') {
        value = `${resources.values[0]?.value} ${resources.values[0]?.unit}`;
      } else {
        value = resources.values[0];
      }
    }
  }

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
        <p className="details">
          {value === ''
            ? `${
                resources?.details &&
                resources?.details.charAt(0).toUpperCase() + resources.details.slice(1)
              }`
            : `${
                resources?.details &&
                resources?.details.charAt(0).toUpperCase() + resources.details.slice(1)
              }: ${value}`}
        </p>
      </div>
      <div>
        <p>{resources?.code}</p>
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
