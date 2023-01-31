const route = require("express").Router();
const paypal = require("paypal-rest-sdk");

//const queryString = require("query-string");

route.get("/", (req, res) => {
  console.log("Hii");
});

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AfeEVUSf913s3tYa5UfdwGKeEP9Djbve-vYj45PBS90y9gM_mw5cjCfXJU2at8Ua7lgLid9VJ1NAq7zf",
  client_secret:
    "EAOnUSatQNSax_kmX4dZ9sS7nWe91T3Cb9iNrseQLKn17KNGyFOQhWEJelaLvvQ1-cX4glZGOIZNRoy6",
});

// route.get("/createPayPalPayment", (req, res) => {
//   console.log("hello=======" + req.query.amount);
//   const amount = req.query.amount;
//   const currency = req.query.currency;
//   console.log("hello=======" + req.query.currency);
//   const create_payment_json = {
//     intent: "sale",
//     payer: {
//       payment_method: "paypal",
//     },
//     redirect_urls: {
//       return_url: "http://10.10.20.52:5001/execute",
//       cancel_url: "http://cancel.url",
//     },
//     transactions: [
//       {
//         item_list: {
//           items: [
//             {
//               name: "Red Sox Hat",
//               sku: "001",
//               price: amount,
//               currency: currency,
//               quantity: 1,
//             },
//           ],
//         },
//         amount: {
//           currency: currency,
//           total: amount,
//         },
//         description: "Hat for the best team ever",
//       },
//     ],
//   };
//   paypal.payment.create(create_payment_json, function (error, payment) {
//     if (error) {
//       console.log("error======" + error.JSON);
//       throw error;
//     } else {
//       for (let i = 0; i < payment.links.length; i++) {
//         if (payment.links[i].rel === "approval_url") {
//           console.log("payment approval Link==" + payment.links[i].href);
//           res.redirect(payment.links[i].href);
//         }
//       }
//     }
//   });
// });

// route.get("/execute", (req, res) => {
//   const amount = req.query.amount;
//   const currency = req.query.currency;
//   console.log("execute=====");
//   const execute_payment_json = {
//     payer_id: req.query.payer_id,
//     transactions: [
//       {
//         amount: {
//           currency: currency,
//           total: amount,
//         },
//       },
//     ],
//   };
//   const paymentId = req.query.paymentId;
//   paypal.payment.execute(
//     paymentId,
//     execute_payment_json,
//     function (error, payment) {
//       if (error) {
//         console.log("err=====" + JSON.stringify(error));
//         // throw error;
//       } else {
//         console.log(JSON(payment));
//         res.redirect(
//           "http://return_url/?status=success&id=" +
//             payment.id +
//             "&state=" +
//             payment.state
//         );
//       }
//     }
//   );
// });

//route.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
//route.listen(PORT, () => console.log(`Server Started on ${PORT}`));
route.post("/pay", (req, res) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:5001/success",
      cancel_url: "http://localhost:5001/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Red Sox Hat",
              sku: "001",
              price: "25.00",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "25.00",
        },
        description: "Hat for the best team ever",
      },
    ],
  };
  route.get("/success", (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: "25.00",
          },
        },
      ],
    };

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          console.log("payement_error===" + error.response);
          throw error;
        } else {
          console.log("payment_ID=========" + paymentId);
          console.log("payment=========" + JSON.stringify(payment));
          res.send("Success");
        }
      }
    );
  });
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          console.log("payment approval Link==" + payment.links[i].href);
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});
route.get("/cancel", (req, res) => res.send("Cancelled"));
module.exports = route;
