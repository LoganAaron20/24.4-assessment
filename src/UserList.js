import React, { useState } from "react";
import AlbumList from "./AlbumList";

function UserList({ users }) {
  const [user, setUser] = useState({});
  const [toggle, setToggle] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            <button
              type="button"
              onClick={() => {
                setToggle(true);
                setUser(user);
              }}
            >
              {user.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="right-side">
        {/* <h2>Please click on a user name please</h2> */}
        {/* <h2>
          {user
            ? `${user.name} Albums`
            : "Please click on a user name to the left"}
        </h2> */}
        {toggle ? (
          <AlbumList user={user} />
        ) : (
          <h2>Please click on a user name to the left</h2>
        )}
      </div>
    </div>
  );
}

export default UserList;
