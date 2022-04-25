const fs = require("fs");

const nameArray = ["tuan", "anh", "trung", "nhat"];

let data = nameArray.map((name) => {
  const singleData = {
    name,
    age: Math.floor(Math.random() * 30),
  };
  return singleData;
});
// console.log(data);
data = JSON.stringify(data);
fs.writeFileSync("auto.json", data);
