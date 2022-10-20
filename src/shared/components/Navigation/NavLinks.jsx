import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "../FormElements/Button";
import Modal from "../UIElements/Modal";
import "./NavLinks.css";

const NavLinks = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const openModalHandler = () => {
    setShowModal(true);
  };
  return (
    <>
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact>
            ALL USERS
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink to="/u1/places">MY PLACES</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
          </li>
        )}
        {isLoggedIn ? (
          <li>
            <button className="logout-btn" onClick={openModalHandler}>
              LOGOUT
            </button>
          </li>
        ) : (
          <li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
          </li>
        )}
      </ul>

      <Modal
        onCancel={() => setShowModal(false)}
        show={isLoggedIn && showModal}
        header="Logout"
        footerClass="logout-footer"
        footer={
          <>
            <Button
              inverse
              children="CANCEL"
              onClick={() => setShowModal(false)}
            />
            <Button danger children="LOGOUT" onClick={logout} />
          </>
        }
      >
        <p>Do you want to logout?</p>
      </Modal>
    </>
  );
};

export default NavLinks;
