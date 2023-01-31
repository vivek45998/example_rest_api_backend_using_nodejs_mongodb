const express = require("express");
const route = express();
const paypal = require("paypal-rest-sdk");
//const queryString = require("query-string");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AfeEVUSf913s3tYa5UfdwGKeEP9Djbve-vYj45PBS90y9gM_mw5cjCfXJU2at8Ua7lgLid9VJ1NAq7zf",
  client_secret:
    "EAOnUSatQNSax_kmX4dZ9sS7nWe91T3Cb9iNrseQLKn17KNGyFOQhWEJelaLvvQ1-cX4glZGOIZNRoy6",
});

route.get("/createpaypalpayment", async (req, res) => {
  const amount = req.query.amount;
  const currency = req.query.currency.toUpperCase();

  var create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    /// Return url which will be executed once the intent is created.
    /// "https://us-central1-paypal.cloudfunctions.net/paypalTestPaymentExecute",
    ///
    redirect_urls: {
      return_url: `http://10.10.20.52:5001/execute?amount=${amount}&currency=${currency}`, //`http://10.10.20.52:5001/execute?amount=${amount}&currency=${currency}`,
      cancel_url: "http://cancel.url",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "item",
              sku: "item",
              price: amount,
              currency: currency,
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: currency,
          total: amount,
        },
        description: "This is the payment description.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log("create payment response");
      console.log(payment);
      for (var index = 0; index < payment.links.length; index++) {
        if (payment.links[index].rel === "approval_url") {
          res.redirect(payment.links[index].href);
        }
      }
    }
  });
});

route.get("/execute", async (req, res) => {
  const amount = req.query.amount;
  const currency = req.query.currency.toUpperCase();

  var execute_payment_json = {
    payer_id: req.query.PayerID,
    transactions: [
      {
        amount: {
          currency: currency,
          total: amount,
        },
      },
    ],
  };
  const paymentId = req.query.paymentId;
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        res.redirect(
          "http://return_url/?status=success&id=" +
            payment.id +
            "&state=" +
            payment.state
        );
      }
    }
  );
});

module.exports = route;
