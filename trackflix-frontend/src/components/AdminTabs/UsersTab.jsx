import React from "react";
import UserList from "../Extraadmin/UserList";

// UserList already renders its own title and total, so the tab only hosts it.
const UsersTab = ({ users }) => <UserList users={users} />;

export default UsersTab;
