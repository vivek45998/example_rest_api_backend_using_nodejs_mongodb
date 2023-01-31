const express = require("express");

const router = express.Router();
const braintree = require("braintree");
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "5fzr3ghybt5zpz7w",
  publicKey: "gdbv979mj5pqkjfb",
  privateKey: "0dc46675a7473f0c34ab8d0c7805d570",
});
router.get("/employee", function (req, res) {
  res.send({ type: "GET rehhhhh" });
});
///for testing purpose
router.post("/employee", function (req, res) {
  console.log("req.body====" + req.body.name);
  res.send({
    type: "POST",
    name: req.body.name,
    deviceData: req.body.deviceData,
  });
});

router.post("/checkout", (req, res) => {
  const nonceFromTheClient = req.body.nonce;
  const deviceDataFromTheClient = req.body.deviceData;
  console.log("deviceData" + req.body.deviceData);
  const price = req.body.price;
  console.log("nounce" + req.body.nonce);
  console.log("amount" + req.body.price);
  // Use payment method nonce here
  gateway.transaction.sale(
    {
      amount: price,
      paymentMethodNonce: nonceFromTheClient,
      deviceData: deviceDataFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err != null) {
        console.log("false" + JSON.stringify(err));
        res.send({
          type: "POST",
          error: console.log("false" + JSON.stringify(err)),
        });
      } else {
        console.log("rsult ===" + JSON.stringify(result));
        res.send({ type: "POST", success: "success" });
      }
    }
  );
});

module.exports = router;
