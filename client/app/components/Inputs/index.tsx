'use client';

import React from 'react';

import { Field, useFormikContext } from 'formik';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export const Input = ({ ...props }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text">{props.label}</span>
    </label>
    <Field {...props} className={`input input-bordered ${props.className}`} />
    <ErrorField name={props.name} />
  </div>
);

export const PhoneNumberInput = ({ ...props }) => (
  <>
    <label className="label">
      <span className="label-text">{props.label}</span>
    </label>
    <Field name="PhoneNumber">
      {({ form: { setFieldValue } }: { form: any }) => (
        <PhoneInput
          {...props}
          onChange={(value) => setFieldValue('PhoneNumber', value)}
        />
      )}
    </Field>
    <ErrorField name={props.name} />
  </>
);

export const ErrorField = ({ name }: { name: string }) => {
  const { errors }: any = useFormikContext();

  if (!errors[name]) {
    return null;
  }

  return <p className="text-base text-red-600">{errors[name]}</p>;
};
