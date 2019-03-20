import React from 'react';
import { ErrorMessages } from './ErrorMessages';

export const Input = ({ inputParams, meta, label }) => (
  <div>
    <label>
      {label}
      <input {...inputParams} />
    </label>

    <ErrorMessages
      status={meta.status}
      messages={meta.errors}
      showConditions={['touched', 'submitted']}
    />
  </div>
);
