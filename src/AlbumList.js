import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useParams } from 'react-router-dom';

function AlbumList({ user }) {
  // will map out the currentUsers playlist;
  const [albums, setAlbums] = useState([]);
  //   let username = user.name;

  useEffect(() => {
    setAlbums([]);
    const abortController = new AbortController();
    async function getAlbum() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`,
          { signal: abortController.signal }
        );
        const albumList = await response.json();
        setAlbums(albumList);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted", user.id);
        } else {
          throw error;
        }
      }
    }

    getAlbum();

    return () => abortController.abort();
  }, [user]);

  const list = albums.map((album) => {
    return (
      <div>
        <li key={album.id}>
          {album.id} - {album.title}
        </li>
      </div>
    );
  });


  if (albums) {
    return (
      <div>
        <h2>{user.name} Album List</h2>
        <ul>{list}</ul>
      </div>
    );
  }

  return "Loading...";

}

export default AlbumList;
