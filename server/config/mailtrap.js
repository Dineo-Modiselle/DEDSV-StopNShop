import mailtrap from 'mailtrap';
import { MailtrapClient } from 'mailtrap';
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
  endpoint: process.env.MAILTRAP_ENDPOINT,
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",//send.api.mailtrap.io
  name: "Mailtrap Test",
};


export const recipient = [
  {
    email: "charitymodiselle@yahoo.com",//charitymodiselle@yahoo.com
  }
];

