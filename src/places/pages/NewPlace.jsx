import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";

const NewPlace = () => {
  const { fetchData, isLoading, error, clearError } = useFetch();
  const { userId } = useContext(AuthContext);
  const history = useHistory();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = async (evt) => {
    evt.preventDefault();
    try {
      await fetchData({
        url: "http://localhost:8080/api/places",
        method: "post",
        body: {
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: userId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {}
    history.push("/");
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner />}
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          errorText="Please enter a valid title."
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />

        <Input
          id="description"
          label="Description"
          element="textarea"
          errorText="Please enter a valid description (at least 5 characters)."
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />

        <Input
          id="address"
          label="Address"
          element="input"
          errorText="Please enter a valid address."
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />

        <Button
          type="submit"
          disabled={!formState.formIsValid}
          children="Add Place"
        />
      </form>
    </>
  );
};

export default NewPlace;
