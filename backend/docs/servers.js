require('dotenv').config()

module.exports = {
    servers: [
      {
        url: "http://localhost:3000/", // url
        description: "Local server", // name
      },
      {
        url: process.env.EC2_IP || "http://localhost:3000", // url
        description: "EC2 server", // name
      },
    ],
  };