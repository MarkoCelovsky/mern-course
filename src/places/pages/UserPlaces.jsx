import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

export const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Capitol of Texas in Austin",
    description: "Capitol of Texas in Austin",
    imageUrl:
      "https://images.pexels.com/photos/3643592/pexels-photo-3643592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "1100 Congress Ave., Austin, TX 78701",
    location: {
      lat: 30.266666,
      lng: -97.73333,
    },
    creator: "u1",
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
