import "./UsersList.css";

function UsersList({ users, removeUser }) {
  const handleRemoveUser = (userId) => {
    removeUser(userId);
  };
  return (
    <div className="users">
      <ul className="users_list">
        {users.map((user) => (
          <li key={user.id} className="user">
            <div className="user_id">Customer ID: [ {user.id} ]</div>
            <div className="user_name">Name: [ {user.name} ]</div>
            <div className="user_gender">Gender: [ {user.gender} ]</div>
            <div className="user_email">Email: [ {user.email} ]</div>
            {!user.isAdmin && (
              <button
                className="remove_user_btn"
                onClick={() => handleRemoveUser(user.id)}
              >
                Remove user
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
