// * json is javascript obejct notation
// light weight format to store data
const fs = require("fs").promises;
const objs = {
  name: "ayush",
  age: 15,
  gender: "male",
  student: true,
};
// ? jSON stringify to convert object to json and parse for opposite

const jd = JSON.stringify(objs);

const ay = async () => {
  await fs.writeFile("./ayush.txt", jd);
  const first = await fs.readFile("./ayush.txt", "utf8");
  const obj = JSON.parse(first);
  console.log(obj);
};
ay();
