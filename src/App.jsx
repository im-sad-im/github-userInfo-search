import { useEffect, useState } from "react";
import "./App.css";
import { UserDetails } from "./components/UserDetails";
import { SearchUsername } from "./components/SearchUsername";

function App() {
  //states
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");

  //Hold user's after fetching
  const [userData, setUserData] = useState(null);

  //Fetch the data
  useEffect(() => {
    async function fetchUserData() {
      if (username) {
        try {
          const response = await fetch(
            `https://api.github.com/users/${username}`
          );
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user data: " + error);
        }
      }
    }
    fetchUserData();
  }, [username]);

  function handleSearch(e) {
    setUsername(user);
    e.preventDefault();
  }

  function handleChange(e){
    setUser(e.target.value);
  }

  return (
    <>
      <h1>Find Github Search </h1>
      <SearchUsername handleSearch={handleSearch} user={user} handleChange={handleChange} />
      
      {userData != null ? (
        <UserDetails
          avatar={userData.avatar_url}
          username = {username}
          html_url={userData.html_url}
          bio={userData.bio}
          public_repos={userData.public_repos}
          followers={userData.followers}
          joinedAt={userData.created_at}
        />
      ) : (
        <UserDetails
          avatar={""}
          html_url={""}
          bio={""}
          public_repos={"----"}
          followers={"----"}
          joinedAt={"----"}
        />
      )}
    </>
  );
}

export default App;
