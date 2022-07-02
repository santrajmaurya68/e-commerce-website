const express = require("express");
const cors = require("cors");
require('./db/config');
const User = require('./db/User')
const Product = require('./db/Product')

const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comms'

const app = express();
app.use(express.json())
app.use(cors())

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let data = await user.save();
  data = data.toObject();
  delete data.password
  Jwt.sign({ data }, jwtkey, { expiresIn: "5h" }, (err, token) => {
    if (err) {
      resp.send({ result: 'Something went to wrong , please try after some time' })
    }
    resp.send({ data, auth: token })
  })
  console.log(data)
})
app.post("/login", async (req, resp) => {
  console.log(req.body)
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtkey, { expiresIn: "99999999" }, (err, token) => {
        if (err) {
          resp.send({ result: 'Something went to wrong , please try after some time' })
        }
        resp.send({ user, auth: token })
      })
    }
    else {
      resp.send({ result: 'No user found' })
    }
  }
  else {
    resp.send({ result: 'No user found' })
  }
})

app.post("/add-product", verifytoken , async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
  console.log(result)
})
app.get("/product", verifytoken,  async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No Products " })
  }
  console.log(products)
})
app.delete("/product/:id", verifytoken, async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id })
  resp.send(result)
  console.log(result);
})
app.get("/product/:id", verifytoken, async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id })
  if (result) {
    resp.send(result)
  }
  else {
    resp.send({ result: "No reslt is found" })
  }
  console.log(result);
})

app.put("/product/:id", verifytoken, async (req, resp) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body
    }
  )
  resp.send(result);
  console.log(result)
})

app.get("/search/:key", verifytoken, async (req, resp) => {
  let result = await Product.find({
    "$or": [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } }

    ]
  });
  resp.send(result)
  // console.log(result);
})

function verifytoken(req, resp, next) {
  let token = req.headers['authorization'];
  if (token) {
    token = token.split(' ')[1];
    // console.log("varifed middleware called" ,token)
    Jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "please  provide valid token " })
      } else {
        next();
      }
    })
  }
  else {
    resp.status(403).send({ result: "please add token with header" })
  }
  //console.log("varifed middleware called"  )

}

app.listen(5000);