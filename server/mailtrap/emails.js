import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate.js";
import { mailtrapClient, recipient, sender } from "../config/mailtrap.js";


export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Account Verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Verfication Email sent successfully", response);
  } catch (error) {
    console.log("Error sending verification email", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};


export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "ee916077-613a-4cdf-a332-3a3bf07d5ac4",
      template_variables: {
        company_info_name: "DEDSV",
        name: name,
      },
    });
    console.log("Welcome, Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email`, error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};


export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.error(`Error sending password reset email`, error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};


export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset success email`, error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};


export const sendOrderConfirmation = async (email, _id) => {
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Order Confirmation",
      html: `
        <h2>Thank you  for your order!</h2>
        <p>Your order has been received.</p>
        <h3>Order Details:</h3>
        <ul>
          ${_id
            .map(
              (item) =>
                `<li>${item.name} - Quantity: ${item.quantity} - Price: $${item.price} </li>`
            )
            .join("")}
        </ul>
        <p>We will notify you once your order is shipped.</p>
      `,
    });

    console.log("Order confirmation email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

