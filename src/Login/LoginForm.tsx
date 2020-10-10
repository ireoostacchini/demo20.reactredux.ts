import React, { useState } from "react"
import { useHistory, useLocation, } from "react-router-dom";
import { useForm } from "react-hook-form";
import AddCountryFormModel from "../Countries/AddCountryFormModel";

interface LoginFormProps {
  loginHandler: Function
  setCurrentUser: Function
}

const LoginForm = (props: LoginFormProps) => {

  //react hook form's formState doesn't tell us whether the API call fails
  const [formStatus, setFormStatus] = useState("idle");
  const history = useHistory()
  const location = useLocation();

  const onFormSubmit = async (values: AddCountryFormModel) => {

    try {
      const currentUser = await props.loginHandler(values)
      props.setCurrentUser(currentUser)

      //redirect to previous page after login
      const referrerPage = location.state as string || "/"

      history.push(referrerPage)
    }
    catch (err) {
      console.log(err)
      setFormStatus("failed")
      return
    }

  }
  const { handleSubmit, register, errors, formState } = useForm();

  const onSubmit = async (values: any) => await onFormSubmit(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input
        placeholder="Username"
        name="username"
        ref={register({
          required: "Required"
        })}
      />
      {errors.username && errors.username.message}

      <input
        placeholder="Password"
        name="password"
        ref={register({
          required: "Required",
        })}
      />
      {errors.password && errors.password.message}

      <button type="submit" disabled={formState.isSubmitting}>Submit</button>

      {formStatus === "failed" && <p className="error">Login failed</p>}
    </form>
  )
}

export default LoginForm
