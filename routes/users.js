const users = [];

const addUser = ({ id, name, room }) => {
  try{
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const user = { id, name, room };

    users.push(user);

    return { user };
  } catch(e) {
    return { }
  }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
  
    if(index !== -1) return users.splice(index, 1)[0];
  }

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, getUser, removeUser, getUsersInRoom };