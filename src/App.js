import React, { useState, useEffect } from "react";
import data from "./data.json";
import User from "./user";

function App() {
  const [users, getUsers] = useState(data);
  const [buttons, setButtons] = useState({
    newUsers: false,
    editors: false,
    moderators: false,
  });
  const { newUsers, editors, moderators } = buttons;
  let [inputText, setInputText] = useState("");

  const editorsFunc = (e) => {
    if (editors === false) {
      e.preventDefault();
      e.target.style.backgroundColor = "#849fff";
      e.target.style.color = "#fff";
      const setEditors = users.filter((person) => person.editor === "true");
      getUsers(setEditors);
      setButtons({ ...buttons, editors: true });
    } else {
      e.target.style.backgroundColor = "#fff";
      e.target.style.color = "#373c47";
      getUsers(data);
      setButtons({ ...buttons, editors: false });
    }
  };

  const moderatorsFunc = (e) => {
    if (moderators === false) {
      e.preventDefault();
      e.target.style.backgroundColor = "#849fff";
      e.target.style.color = "#fff";
      const setModerators = users.filter(
        (person) => person.moderator === "true"
      );
      getUsers(setModerators);
      setButtons({ ...buttons, moderators: true });
    } else {
      e.target.style.backgroundColor = "#fff";
      e.target.style.color = "#373c47";
      getUsers(data);
      setButtons({ ...buttons, moderators: false });
    }
  };

  const newUsersFunc = (e) => {
    if (newUsers === false) {
      e.preventDefault();
      e.target.style.backgroundColor = "#849fff";
      e.target.style.color = "#fff";
      const setNewUsers = users.filter(
        (person) => person.account_made[2] > "2021"
      );
      getUsers(setNewUsers);
      setButtons({ ...buttons, newUsers: true });
    } else {
      e.target.style.backgroundColor = "#fff";
      e.target.style.color = "#373c47";
      getUsers(data);
      setButtons({ ...buttons, newUsers: false });
    }
  };

  const search = () => {
    let textValue = inputText.toString().toLowerCase();
    const searched = users.filter((person) => {
      return (
        person.name.toString().toLowerCase().includes(textValue) ||
        person.last_name.toString().toLowerCase().includes(textValue)
      );
    });
    getUsers(searched);
    if (textValue === "") {
      getUsers(data);
    }
  };

  useEffect(() => {
    getUsers(data);
    search();
    // eslint-disable-next-line
  }, [inputText]);

  return (
    <>
      <h1>Users</h1>
      <input
        type="text"
        placeholder="Search users"
        className="search"
        onChange={(event) => {
          setInputText(event.target.value);
        }}
      ></input>
      <div className="filter">
        <button className="button-81" onClick={newUsersFunc}>
          New users
        </button>
        <button className="button-81" onClick={editorsFunc}>
          Editors
        </button>
        <button className="button-81" onClick={moderatorsFunc}>
          Moderators
        </button>
      </div>
      <div className="users">
        {users.map((user) => {
          return <User {...user} key={user.id} />;
        })}
      </div>
    </>
  );
}

export default App;
