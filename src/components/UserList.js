import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

useEffect(() => {
  fetch('http://localhost:5072/api/user')
    .then(response => response.json())
    .then(data => {
      console.log(data); // أضف هذا
      setUsers(data);
    })
    .catch(error => console.error('Error:', error));
}, []);


  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
