import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { mailtrapClient, sender } from "../config/mailtrap.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Account Verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category:"Email Verification"
        })
        console.log("Verfication Email sent successfully",response);
    } catch (error) {
        console.log("Error sending verification email", error);
       throw new Error(`Error sending verification email: ${error}`); 
        
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "28a8d18a-f2e1-4a9d-8da7-b25aebf9f4aa",
            template_variables: {
            company_info_name: "DEDSV",
            name: name,
        },
        });
        console.log("Welcome, Email sent successfully",response);
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
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category:"Password Reset" ,
        })
        
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
        category:"Password Reset",
    });
console.log("Password reset email sent successfully",response);
} catch (error) {
    console.error(`Error sending password reset success email`, error);
    throw new Error(`Error sending password reset success email: ${error}`);
}
};
