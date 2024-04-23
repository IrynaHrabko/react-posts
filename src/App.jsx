import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PostCard from "./components/PostCard";
import AppButton from "./components/AppButton";
import AppInput from "./components/AppInput";

const App = () => {
  const navigate = useNavigate();

  let [posts, setPosts] = useState([]);
  let [loginData, setLoginData] = useState({
    name: "",
    username: "",
  });
  let [user, setUser] = useState({});
  let [isLogined, setIsLogined] = useState(false);

  const getPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json));
  };

  const inputHandler = (event) => {
    setLoginData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (isLogined) {
      handleLogout();
    } else {
      await handleLogin();
    }
  };

  const handleLogin = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    const foundUser = data.find(
      (user) =>
        user.name === loginData.name && user.username === loginData.username
    );

    if (foundUser) {
      setUser(foundUser);
      setIsLogined(true);
      getPosts();
      navigate(`/userpage/${foundUser.id}`);
    } else {
      alert("Дані введені некоректно, або такого користувача не існує");
    }
  };

  const handleLogout = () => {
    setUser({});
    setIsLogined(false);
    setPosts([]);
    navigate("/");
  };

  const showLoginOrLogoutComponent = () => {
    if (isLogined) {
      return (
        <div>
          <h3>User Info:</h3>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <AppButton label={"log out"} clickHandler={handleLogout} />
        </div>
      );
    } else {
      return (
        <form onSubmit={submitHandler}>
          <AppInput
            propsType={"text"}
            propsPlaceholder={"name"}
            propsName={"name"}
            inputHandler={inputHandler}
          />
          <AppInput
            propsType={"text"}
            propsPlaceholder={"username"}
            propsName={"username"}
            inputHandler={inputHandler}
          />
          <AppButton
            label={"login"}
            clickHandler={(event) => submitHandler(event)}
          />
        </form>
      );
    }
  };

  return (
    <>
      {showLoginOrLogoutComponent()}
      {isLogined &&
        posts.map((item) => <PostCard key={item.id} item={item} />)}
      <Outlet />
    </>
  );
};

export default App;
