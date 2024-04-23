import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const postDataResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

        if (!userResponse.ok || !postDataResponse.ok) {
          throw new Error('Failed to fetch user data or posts');
        }

        const userData = await userResponse.json();
        const userPosts = await postDataResponse.json();

        setUserData(userData);
        setUserPosts(userPosts);
      } catch (error) {
        console.error('Error fetching user data or posts:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      <h2>User</h2>
      {userData ? (
        <div>
          <p>{userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Address: {userData.address.street}, {userData.address.suite}, {userData.address.city}, {userData.address.zipcode} </p>
          <p>Phone: {userData.phone}</p>
          <p>Website: {userData.website}</p>
          <p>Company: {userData.company.name}</p>

          
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <h2>Posts</h2>
      {userPosts.length > 0 ? (
        userPosts.map((post) => (
          <div className='post' key={post.id}>
            <h3 className='post__title'>{post.title}</h3>
            <p className='post__card'>{post.body}</p>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default UserPage;
