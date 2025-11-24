import app from "./app";
import dotenv from "dotenv";
import { testDBConnection } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

//test db
testDBConnection();

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
