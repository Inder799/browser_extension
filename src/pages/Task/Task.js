import "./Task.css";
import { useBrowser } from "../../context/browser-context";
import { Fragment, useEffect, useState } from "react";
import { quotes } from "../../db/quotes";

const index = Math.floor(Math.random() * quotes.length);
const quote = quotes[index].quote;

export const Task = () => {
  const [isChecked, setIsChecked] = useState(false);

  const { name, time, message, task, browserDispatch } = useBrowser();

  useEffect(() => {
    const userTask = localStorage.getItem("task");
    browserDispatch({
      type: "TASK",
      payload: userTask,
    });
  }, []);

  useEffect(() => {
    getCurrentTime();
    const intervalId = setInterval(getCurrentTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const checkStatus = localStorage.getItem("checkedStatus");
    if (checkStatus === "true" ? setIsChecked(true) : setIsChecked(false));
  }, []);

  const getCurrentTime = () => {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();

    const hour = hours < 10 ? `0${hours}` : hours;
    const minute = minutes < 10 ? `0${minutes}` : minutes;

    const currentTime = `${hour} : ${minute}`;

    browserDispatch({
      type: "TIME",
      payload: currentTime,
    });

    browserDispatch({
      type: "MESSAGE",
      payload: hour,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleTaskChange = (event) => {
    if (event.key === "Enter" && event.target.value.length > 0) {
      browserDispatch({
        type: "TASK",
        payload: event.target.value,
      });
      localStorage.setItem("task", event.target.value);
      localStorage.setItem("date", new Date().toDateString());
    }
  };

  const handleCompleteTaskChange = (event) => {
    setIsChecked((isChecked) => !isChecked);
    localStorage.setItem("checkedStatus", !isChecked);
  };

  const handleClickChange = () => {
    browserDispatch({
      type: "CLEAR",
    });
    setIsChecked(false);
    localStorage.removeItem("task");
    localStorage.removeItem("checkedStatus");
  };

  return (
    <div className="task-container d-flex direction-column align-center">
      <span className="time">{time}</span>
      <span className="message">
        {message}, {name}
      </span>
      {name !== null && task === null ? (
        <Fragment>
          <span className="focus-question">
            What is your main focus for today?
          </span>
          <form onSubmit={handleFormSubmit}>
            <input
              required
              className="input task-input"
              onKeyDown={handleTaskChange}
            />
          </form>
        </Fragment>
      ) : (
        <div className="user-task-container d-flext direction-column align-center gap-sm">
          <span className="heading-2">Today's Focus</span>
          <div className="d-flex align-center gap">
            <label
              className={`${
                isChecked ? "strike-through" : ""
              } heading-3 d-flex align-center gap-sm cursor`}
              htmlFor="checkbox"
            >
              <input
                className="check cursor"
                id="custom-checkbox"
                type="checkbox"
                onChange={handleCompleteTaskChange}
                checked={isChecked}
              />
              {task}
            </label>
            <button className="button cursor" onClick={handleClickChange}>
              <span class="material-icons-outlined">clear</span>
            </button>
          </div>
        </div>
      )}
      <div className="quote-container">
        <span className="heading-3">{quote}</span>
      </div>
    </div>
  );
};
