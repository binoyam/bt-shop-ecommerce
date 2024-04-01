import  "./UsersList.css";

function UsersList({ users }) {
  return (
    <div className="users_list">
      <h3>Users:[{users.length}]</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            Customer ID: [{user.id}] Name: [{user.name}], Email: [{user.email}],
            Gender: [{user.gender}]{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
