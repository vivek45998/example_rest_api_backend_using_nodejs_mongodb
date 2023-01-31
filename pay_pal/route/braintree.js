const express = require("express");
const route = express();
const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "5fzr3ghybt5zpz7w",
  publicKey: "gdbv979mj5pqkjfb",
  privateKey: "0dc46675a7473f0c34ab8d0c7805d570",
});

// gateway.clientToken.generate(
//   {
//     customerId: aCustomerId,
//   },
//   (err, response) => {
//     // pass clientToken to your front-end
//       if (err) { console.log(JSON(err)) }
//       else {
//           const clientToken = response.clientToken;
//           console.log("client========"+clientToken);
//       }

//   }
// );
route.get("./checkout", async (req, res) => {
  console.log(req.query.nonce);
});

// route.post("/checkout", (req, res) => {
//   const nonceFromTheClient = req.body.payment_method_nonce;
//   const deviceDataFromTheClient = req.body.deviceData;
//   const price = req.body.amount;
//   console.log("nounce" + nounceFromTheClient);
//   // Use payment method nonce here
//   gateway.transaction.sale(
//     {
//       amount: price,
//       paymentMethodNonce: nonceFromTheClient,
//       deviceData: deviceDataFromTheClient,
//       options: {
//         submitForSettlement: true,
//       },
//     },
//     (err, result) => {
//       if (err != null) {
//         console.log("false" + JSON.stringify(err));
//       } else {
//         console.log("rsult ===" + JSON.stringify(result));
//       }
//     }
//   );
// });
module.exports = route;
