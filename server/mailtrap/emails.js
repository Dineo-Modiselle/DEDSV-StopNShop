import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate.js";
import { transporter, sender } from "../config/mailtrap.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Account Verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    });
    console.log("Verification email sent successfully");
  } catch (error) {
    console.log("Error sending verification email", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Welcome to DEDSV StopNShop!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #6C6A61;">Welcome to DEDSV StopNShop, ${name}!</h2>
          <p>Thank you for joining us. We're thrilled to have you as part of our luxury fashion community.</p>
          <p>Start exploring our exclusive collections today.</p>
          <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
            <p style="color: #45423D; font-style: italic;">Elegance is not about being noticed, it's about being remembered.</p>
          </div>
          <p style="margin-top: 20px;">The DEDSV Team</p>
        </div>
      `,
    });
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email", error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
    console.log("Password reset success email sent successfully");
  } catch (error) {
    console.error("Error sending password reset success email", error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};

export const sendOrderConfirmation = async (email, items) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Order Confirmation - DEDSV StopNShop",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f7fa;">
          <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 25px;">
              <div style="width: 70px; height: 70px; margin: 0 auto 20px; background-color: #2c8a56; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 40px;">✓</span>
              </div>
              <h2 style="color: #2c8a56;">Thank you for your order!</h2>
              <p>Your order has been received and is being processed.</p>
            </div>
            <div style="background: #f0f7f3; border: 1px dashed #2c8a56; border-radius: 4px; padding: 10px; margin: 20px 0; text-align: center; font-family: monospace; font-size: 16px;">
              Order #: TR-${Math.floor(Math.random() * 900000) + 100000}
            </div>
            <h3 style="color: #444; border-bottom: 2px solid #eee; padding-bottom: 10px;">Order Details:</h3>
            <ul style="padding-left: 5px; list-style-type: none;">
              ${items.map((item) => `
                <li style="margin-bottom: 15px; padding: 15px; border-radius: 8px; background-color: #f9f9f9;">
                  <div style="font-weight: bold; color: #2c8a56;">🛍️ ${item.name}</div>
                  <div style="display: flex; justify-content: space-between; max-width: 250px; margin-top: 5px; color: #666;">
                    <span>Quantity: ${item.quantity}</span>
                    <span>Price: €${item.price}</span>
                  </div>
                </li>
              `).join("")}
            </ul>
            <div style="text-align: center; margin-top: 30px; color: #777; font-size: 14px; padding-top: 20px; border-top: 1px dashed #eee;">
              <p>We will notify you once your order is shipped.</p>
              <p style="font-style: italic; color: #2c8a56;">We appreciate your business!</p>
            </div>
          </div>
        </div>
      `,
    });
    console.log("Order confirmation email sent to:", email);
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
  }
};
