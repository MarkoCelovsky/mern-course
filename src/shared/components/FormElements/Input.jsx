import React, { useEffect, useReducer } from "react";
import "./Input.css";
import { validate } from "../../util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = ({
  element,
  type,
  id,
  placeholder,
  rows,
  className,
  label,
  errorText,
  validators,
  onInput,
  initialValue,
  initialIsValid,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || "",
    isValid: initialIsValid || false,
    isTouched: false,
  });
  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  const changeHandler = (evt) => {
    evt.preventDefault();
    dispatch({
      type: "CHANGE",
      value: evt.target.value,
      validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const content =
    element === "input" ? (
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );

  return (
    <div
      className={`form-control ${className} ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {content}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
