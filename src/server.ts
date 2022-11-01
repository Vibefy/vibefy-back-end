import app from "./app";

async function initialize() {
  app.listen(3000, () => {
    console.log("Executing application!");
  });
}
