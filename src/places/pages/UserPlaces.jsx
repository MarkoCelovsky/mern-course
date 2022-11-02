import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import PlaceList from "../components/PlaceList";

const UserPlaces = () => {
  const userId = useParams().userId;
  const { fetchData, error, isLoading, clearError } = useFetch();
  const [places, setPlaces] = useState();

  useEffect(() => {
    const getUserPlaces = async () => {
      try {
        const { places } = await fetchData({
          url: `http://localhost:8080/api/places/user/${userId}`,
          method: "get",
        });
        setPlaces(places);
      } catch (error) {
        console.error(error);
      }
    };
    getUserPlaces();
  }, [fetchData]);

  const placeDeleteHandler = (placeId) => {
    setPlaces((currPlaces) =>
      currPlaces.filter((place) => place.id !== placeId)
    );
  };

  return (
    <>
      <ErrorModal onClear={clearError} error={error} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && places && (
        <PlaceList items={places} onDeletePlace={placeDeleteHandler} />
      )}
    </>
  );
};

export default UserPlaces;
