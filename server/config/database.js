const mongoose = require("mongoose");
require("dotenv").config();
require('tls').DEFAULT_MIN_VERSION = 'TLSv1.2';
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@edunovacluster.ywkadts.mongodb.net/EduNova`;

exports.connect = async () => {
  try {
    console.log("Connecting to Atlas...");
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      retryWrites: true,
      w: "majority"
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
};
