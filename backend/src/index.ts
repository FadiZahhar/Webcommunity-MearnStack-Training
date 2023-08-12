import { connectToMongooseDB } from "./scripts/connectDB";
import app from "./app";

connectToMongooseDB();

const PORT = process.env.PORT || 6000;

app.listen(PORT, (): void => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
