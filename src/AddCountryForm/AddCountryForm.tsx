import React from "react"
import { useForm } from "react-hook-form";
import AddCountryFormModel from "../Countries/AddCountryFormModel";



type AddCountryFormProps = {
  addCountryWrapper: Function
  status: string
  error?: string
}

const AddCountryForm = (props: AddCountryFormProps) => {

  const onFormSubmit = async (values: AddCountryFormModel) => {
    await props.addCountryWrapper(values)
  }

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (values: any) => await onFormSubmit(values);

  //https://react-hook-form.com/
  //https://codesandbox.io/s/8n937m64o9

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input
        name="countryName"
        ref={register({
          required: "Required",
          validate: value => value.length > 2 || "Country name must be at least three characters"
        })}
      />
      {errors.countryName && errors.countryName.message}

      <input
        name="countryCode"
        ref={register({
          required: "Required",
          validate: value => value.length === 3 || "Country code must be three characters"
        })}
      />
      {errors.countryCode && errors.countryCode.message}

      <button type="submit">Submit</button>

      {!!props.error && <p className="error">{props.error}</p>}

      { <p>Status: {props.status}</p>}
    </form>
  );
};

export default AddCountryForm
