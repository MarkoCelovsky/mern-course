import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useFetch } from "../../hooks/useFetch";
const Users = () => {
  const { isLoading, error, fetchData, clearError } = useFetch();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { users } = await fetchData({
          url: "http://localhost:8080/api/users",
        });
        setUsers(users);
      } catch (error) {}
    };
    getUsers();
  }, [fetchData]);
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && users && <UsersList users={users} />}
    </>
  );
};

export default Users;
