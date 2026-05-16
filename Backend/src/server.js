import express from "express";
import dotenv from "dotenv";
import { connectDB} from "./config/db.js";
import router from "./routes/routes.js";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
import corsOptions from "./utils/corsSetup.js";
import logger from "./utils/logger.js";
import cookieParser from "cookie-parser";
import "./models/association.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());


//routes
app.use("/api/v1", router);

app.use(notFound);
app.use(errorHandler);


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Error in server", error.message);
    process.exit(1);
  }
};

startServer();
