import { useState } from "react"
import PostCard from "./components/PostCard";
import AppButton from "./components/AppButton";
import AppInput from "./components/AppInput";

const App = () => {
  let [posts, setPosts] = useState([])
  let [loginData, setLoginData] = useState({
    name: '',
    username: '',
  })
  let [user, setUser] = useState({})
  let [isLogined, setIsLogined] = useState(false)

  const getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setPosts(posts = json));
  }
  const inputHandler = () => {

    setLoginData(loginData = {
      ...loginData,
      [event.target.name]: event.target.value
    })
    console.log(loginData)
  }
  const submitHandler = () => {
    event.preventDefault()
    console.log(event.target)
  }

  const toggleIsLogined = async () => {
    if (isLogined) {
      setUser({});
      setIsLogined(isLogined = !isLogined)
      setPosts([]);
    } else {
      
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json();
      const foundUser = data.find(user => user.name === loginData.name && user.username === loginData.username);
  
      if (foundUser) {
        setUser(foundUser)
        setIsLogined(true)
        getPosts();
      } else {
        alert('Дані введені некоректно, або такого користувача не існує');
      }
      //TODO: Додати функціонал для скидання даних 
    }
  }

  const showLoginOrLogoutComponent = () => {
    if(isLogined) {
      return (
        <div>
          {user.name}
          <AppButton label={'log out'} clickHandler={toggleIsLogined}/>
        </div>
      )
    } else {
      return (
        <form onSubmit={submitHandler}>
      
        <AppInput propsType={'text'} propsPlaceholder={'name'} propsName={'name'} inputHandler={inputHandler}/>
        <AppInput propsType={'text'} propsPlaceholder={'username'} propsName={'username'} inputHandler={inputHandler}/>
        
        <AppButton label={'login'} clickHandler={toggleIsLogined}/>
      </form>
      )
    }
  }

  return (
    <>
    {showLoginOrLogoutComponent()}
    {
      posts.map((item) => (
        <PostCard key={item.id} item={item}/>
      ))
    }
    </>
  )
}

export default App


