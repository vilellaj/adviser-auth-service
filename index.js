const express = require("express");
const jwt = require('jsonwebtoken');
const app = express();
const secret = process.env.SECRET;

app.use((req, res) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secret, (err, decoded) => {
      if(err) {
        res.status(401).json({message: 'Invalid token.'});
      } else {
        res.send({message: 'Success!'});
      }
    });
  } else {
    res.status(401).json({message: 'Token not found.'});
  }
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`auth-service running on ${port}`)
})
