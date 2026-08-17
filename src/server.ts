import { app } from "./app.js";

const start = async () => {
  try {
    app.listen(3333, () => {
      console.log(`Server is running on port: 3333`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
