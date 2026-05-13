import Order from "../models/Order.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { sendOrderConfirmation } from "../mailtrap/emails.js";

export const createOrder = async (req, res) => {
  try {
    const { customerName, email, items, totalAmount, shippingInfo } = req.body;

    if (!customerName || !email || !items || !totalAmount || !shippingInfo) {
      return res.status(400).json({ message: "Missing required order fields" });
    }

    let userId;
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (token && process.env.JWT_SECRET) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
      } catch {
        // Invalid or expired token — treat as guest checkout for this order
      }
    }

    const newOrder = new Order({
      orderId: uuidv4(),
      customerName,
      email,
      items,
      totalAmount,
      shippingAddress: shippingInfo,
      ...(userId ? { userId } : {}),
    });

    await newOrder.save();

    await sendOrderConfirmation(email, items, totalAmount);
    console.log("Order created successfully");
    res.status(201).json({ message: "Order created successfully", order: newOrder});
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


/**
 * Returns all orders (admin dashboard only — must be behind auth + requireAdmin).
 *
 * @type {import("express").RequestHandler}
 */
export const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Deletes a single order by Mongo id (admin only).
 *
 * @type {import("express").RequestHandler}
 */
export const deleteOrderAdmin = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};