const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("./model/User");
const { faker } = require("@faker-js/faker");

const createUser = async (numberOfUser) => {
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
