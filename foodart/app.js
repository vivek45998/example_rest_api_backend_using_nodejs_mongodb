const functions = require("firebase-functions");
const braintree = require("braintree");
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "ndndjflhjh",
  publicKey: "bhjfjhfdfh",
  privateKey: "bsfjbddhbsfs",
});
exports.paypalPayment = functions.https.onRequest(async (res, req) => {
  const nounceFromClient = req.body.payment_method_nounce;
  const device_data = req.body.device_data;
  gateway.transaction.sale(
    {
      amount: "10.0",
      paymentMethodNonce: nounceFromClient,
      deviceData: device_data,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err != null) {
        console.log(err);
      } else {
        res.json({
          result: "success",
        });
      }
    }
  );
});
