import React, { useContext, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./Authenticate.css";

const Authenticate = (props) => {
  const { login } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { error, isLoading, fetchData, clearError } = useFetch();
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

  const authSubmitHandler = async (evt) => {
    evt.preventDefault();
    if (isLoginMode) {
      try {
        const { user } = await fetchData({
          url: "http://localhost:8080/api/users/login",
          method: "post",
          body: {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          },

          headers: {
            "Content-Type": "application/json",
          },
        });

        login(user.id);
      } catch (error) {}
    } else {
      try {
        const { user } = await fetchData({
          url: "http://localhost:8080/api/users/signup",
          method: "post",
          body: {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            name: formState.inputs.name.value,
          },

          headers: {
            "Content-Type": "application/json",
          },
        });

        login(user.id);
      } catch (error) {}
    }
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
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
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
    </>
  );
};

export default Authenticate;
