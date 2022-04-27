const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("./model/User");
const { faker } = require("@faker-js/faker");

const createUser = async (numberOfUser) => {
  console.log("drop all user");
  await User.collection.drop();
  for (let i = 0; i < numberOfUser; i++) {
    const salt = await bcrypt.genSalt(10);
    let password = faker.animal.cat();
    password = await bcrypt.hash(password, salt);

    const singleUser = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
    };
    const found = await User.findOne({ email: singleUser.email });
    if (!found) {
      console.log("Creating user");
      const result = await User.create(singleUser);
      console.log("============");
      console.log(`Create ${result.name} success`);
    }
  }
  console.log("finish");
};
module.exports = createUser;

// const run = () => {
//   setTimeout(() => console.log("D"), 0); //macro so after
//   Promise.resolve().then(() => console.log("A")); //micro so before
//   console.log("B"); //2a
// };
// console.log("C"); //1
// run(); //2
