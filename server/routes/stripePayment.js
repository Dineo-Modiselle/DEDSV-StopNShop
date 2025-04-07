import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { cart } = req.body;

  const line_items = cart.map((item) => ({
    price_data: {
      currency: "eur",
      product_data: {
        name: item.product,
        images: [item.image],
        description: item.description,
        discount: item.discount,
        

      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));


  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 500, currency: "eur" }, // $5.00 shipping fee
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1500, currency: "eur" }, // $15.00 shipping fee
            display_name: "Express Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 3 },
            },
          },
        },
      ],
      line_items,
      mode: "payment",
      success_url: "https://dedsv-stopnshop.onrender.com/success",
      cancel_url: "https://dedsv-stopnshop.onrender.com/cancel",

      
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Error creating checkout session:", err.message);
    res.status(500).json({ error: err.message });
  }
});

//webhook events

export default router;



