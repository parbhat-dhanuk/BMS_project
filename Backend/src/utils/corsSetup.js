import dotenv from "dotenv";
dotenv.config();
const allowedOrigins = process.env.ALLOWED_ORIGINS
  .split(",")
  .map(origin => origin.trim());

const corsOptions={
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
  credentials: true,
};

export default corsOptions