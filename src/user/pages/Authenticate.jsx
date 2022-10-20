import React, { useContext, useState } from "react";
import { useForm } from "../../hooks/useForm";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./Authenticate.css";

const Authenticate = (props) => {
  const { login } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (evt) => {
    evt.preventDefault();
    console.table(formState.inputs);
    login();
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((curr) => !curr);
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form action="" onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            type="text"
            label="Name"
            id="name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name"
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          onInput={inputHandler}
          id="email"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter valid email address."
        />
        <Input
          element="input"
          onInput={inputHandler}
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Password has to be at least 5 characters long."
        />
        <Button
          type="submit"
          children={`${isLoginMode ? "LOGIN" : "SIGN UP"}`}
          disabled={!formState.formIsValid}
        />
      </form>
      <Button
        inverse
        children={`SWITCH TO ${isLoginMode ? "SIGN UP" : "LOGIN"}`}
        onClick={switchModeHandler}
      />
    </Card>
  );
};

export default Authenticate;
