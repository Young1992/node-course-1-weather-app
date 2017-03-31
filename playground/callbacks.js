const getUser = (id, callback) => {
  let user = {
    id: id,
    name: 'Young'
  };
  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(123, (userObject) => {
  console.log(userObject);
});
