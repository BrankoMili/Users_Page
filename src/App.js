import React, { useState } from "react";
import data from "./data.json";
import User from "./user";

function App() {
  // users data
  const [users] = useState(data);

  //buttons clicked/not clicked
  const [newUsers, setNewUsers] = useState(false);
  const [editors, setEditors] = useState(false);
  const [moderators, setModerators] = useState(false);

  // search input text
  let [inputText, setInputText] = useState("");

  const editorsFunc = (e) => {
    setEditors(!editors);
    // button colors
    if (editors === false) {
      e.preventDefault();
      e.target.style.backgroundColor = "#849fff";
      e.target.style.color = "#fff";
    } else {
      e.target.style.backgroundColor = "#fff";
      e.target.style.color = "#373c47";
    }
  };

  const moderatorsFunc = (e) => {
    setModerators(!moderators);
    // button colors
    if (moderators === false) {
      e.preventDefault();
      e.target.style.backgroundColor = "#849fff";
      e.target.style.color = "#fff";
    } else {
      e.target.style.backgroundColor = "#fff";
      e.target.style.color = "#373c47";
    }
  };

  const newUsersFunc = (e) => {
    setNewUsers(!newUsers);
    // button colors
    if (newUsers === false) {
      e.preventDefault();
      e.target.style.backgroundColor = "#849fff";
      e.target.style.color = "#fff";
    } else {
      e.target.style.backgroundColor = "#fff";
      e.target.style.color = "#373c47";
    }
  };

  /* Filter users depending on filters (new users, editors, moderators) and input
  on the search box */
  let textValue = inputText.toString().toLowerCase();
  const filtered = users.filter((person) => {
    const namelastname = person.name + person.last_name;
    const lastnamename = person.last_name + person.name;
    const namelastnamegap = person.name + " " + person.last_name;
    const lastnamenamegap = person.last_name + " " + person.name;
    return (
      (person.name.toString().toLowerCase().includes(textValue) ||
        person.last_name.toString().toLowerCase().includes(textValue) ||
        namelastname.toString().toLowerCase().includes(textValue) ||
        lastnamename.toString().toLowerCase().includes(textValue) ||
        namelastnamegap.toString().toLowerCase().includes(textValue) ||
        lastnamenamegap.toString().toLowerCase().includes(textValue)) &&
      (editors ? person.editor === "true" : true) &&
      (newUsers ? person.account_made[2] > "2021" : true) &&
      (moderators ? person.moderator === "true" : true)
    );
  });

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
    <section className="users-container">
      <div className="users">
        {filtered.map((user) => {
          return <User {...user} key={user.id} />;
        })}
      </div>
    </section>
    </>
  );
}

export default App;
