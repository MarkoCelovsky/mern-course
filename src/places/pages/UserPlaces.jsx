import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import PlaceList from "../components/PlaceList";

const UserPlaces = () => {
  const userId = useParams().userId;
  const { fetchData, error, isLoading, clearError } = useFetch();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const getUserPlaces = async () => {
      const { places } = await fetchData(
        `http://localhost:8080/api/users/${userId}`
      );
      setPlaces(places);
    };
    getUserPlaces();
  }, [fetchData]);

  return (
    <>
      <ErrorModal onClear={clearError} error={error} />
      {isLoading && <LoadingSpinner />}
      <PlaceList items={places} />
    </>
  );
};

export default UserPlaces;
