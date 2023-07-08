import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";

export const connectToMongooseDB = async () => {
  let db: Connection | undefined;
  try {
    dotenv.config({ path: __dirname + "./../.env" });

    const uri = process.env.ATLAS_URI;
    if (uri) {
      const db = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      return db.connection;
    } else {
      console.log("uri not found");
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
