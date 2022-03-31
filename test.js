// var girl = {
//   name: "Caroline",
//   age: 24,
//   job: "EFC",
// };

// console.log(girl.name);

const promise = new Promise((resolve, reject) => {
  let value = false;
  if (value) {
    resolve("hey value is true");
  } else {
    reject("there was an error, value is false");
  }
});

async function asyncCall() {
  const result = await promise;
  console.log(result);
}

asyncCall();
