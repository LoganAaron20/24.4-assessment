import React, { useState, useEffect } from "react";
import "./App.css";

// import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const controller = new AbortController();
  const [users, setUsers] = useState([]);
  // Load data from https://jsonplaceholder.typicode.com/albums?userId=${user.id}
  useEffect(() => {
    const docTitle = document.title;

    // const signal = abortController.signal;
    async function loadUsers() {
      document.title = "Awesome Album App";
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err.name === "AbortError") {
          setUsers([]);
        } else {
          throw err;
        }
      }
    }

    loadUsers();
    return () => {
      document.title = docTitle;
      controller.abort();
    };
  }, []);

  return (
    <div className="App">
      <div className="left column" style={{ display: "flex" }}>
        <UserList users={users} />
      </div>
      {/* <div className="right column">
        {currentUser && <AlbumList user={currentUser} />}
      </div> */}
    </div>
  );
}

export default App;
