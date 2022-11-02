import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./PlaceForm.css";

const UpdatePlace = (props) => {
  const { userId } = useContext(AuthContext);
  const [loadedPlace, setLoadedPlace] = useState();
  const history = useHistory();
  const placeId = useParams().placeId;
  const { fetchData, clearError, error, isLoading } = useFetch();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const getPlace = async () => {
      try {
        const { place } = await fetchData({
          url: `http://localhost:8080/api/places/${placeId}`,
          method: "get",
        });
        setLoadedPlace(place);
        console.log(loadedPlace);
        setFormData(
          {
            title: {
              value: loadedPlace.title,
              isValid: true,
            },
            description: {
              value: loadedPlace.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    getPlace();
  }, [setFormData, fetchData, placeId]);

  const placeUpdateSubmitHandler = async (evt) => {
    evt.preventDefault();
    try {
      await fetchData({
        url: `http://localhost:8080/api/places/${placeId}`,
        method: "patch",
        body: {
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      history.push(`/${userId}/places`);
    } catch (error) {}
  };
  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <p>Could not find place!</p>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal onClear={clearError} error={error} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            element="input"
            type="text"
            id="title"
            label="Title"
            errorText="Please enter a valid title."
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialIsValid={true}
          />
          <Input
            id="description"
            label="Description"
            element="textarea"
            errorText="Please enter a valid description (at least 5 characters)."
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialIsValid={true}
          />
          <Button
            type="submit"
            disabled={!formState.formIsValid}
            children="Update place"
          />
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
