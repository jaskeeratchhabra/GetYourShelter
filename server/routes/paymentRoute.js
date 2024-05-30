
const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

router.post("/orders", async (req, res) => {
    function generateReceipt() {
        const timestamp = Date.now(); // Get the current timestamp
        const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string
        return `receipt_order_${timestamp}_${randomString}`;
    }
    console.log(req.body);
    var {price}= req.body;
    price = price *100;
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: price, 
            currency: "INR",
            receipt: generateReceipt(),
        };

        const order = await instance.orders.create(options);
        console.log(order)
        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
        
    }
});

router.post("/success", async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports= router;