const router = require("express").Router();
const request = require("request");
const accessToken = require("../middleware/generateAccessToken");

router.get("/simulate/:phoneNumber/:amount", accessToken, async (req, res) => {
     // get phone number and amount from url params
     const { phoneNumber } = req.params
     const { amount } = req.params
 
 
     let url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
     let auth = "Bearer " + req.access_token
 
     // Get current date
     let datenow = new Date();
 
     const timestamp = datenow.getFullYear() + "" + "" + 10 + "" + "" + 0 + datenow.getDate() + "" + "" + 0 + datenow.getHours() + "" + "" + datenow.getMinutes() + "" + "" + datenow.getSeconds()
     const password = new Buffer.from("174379" + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + timestamp).toString("base64");

     console.log(timestamp)
     request(
         {
             url: url,
             method: "POST",
             headers: {
                 Authorization: auth
             },
             json: {
                 BusinessShortCode: "174379",
                 Password: password,
                 Timestamp: timestamp,
                 TransactionType: "CustomerPayBillOnline",
                 Amount: amount,
                 PartyA: phoneNumber,
                 PartyB: "174379",
                 PhoneNumber: phoneNumber,
                 CallBackURL: `${process.env.APP_URL}/transactionsStatus`,
                 AccountReference: "Epic collective",
                 TransactionDesc: "Epic collective"
             }
         },
         (error, response, body) => {
             if (error) { console.log(error) }
             else { res.status(200).json(body) }
         }
     )
});

router.post("/transactionsStatus", async (req, res) => {
    console.log(".......................STK............................")
    console.log(req.body)
});



module.exports = router;