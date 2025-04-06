export const handleChatbotMessage = async (req, res) => {
  const { message } = req.body;

  const lowerCaseMessage = message.toLowerCase();

  const responses = {
    greeting: "Hello! How can I assist you today?",
    shipping: "We offer free shipping on orders over $10000!",
    returns: "You can return items within 30 days of purchase.",
    payment: "We accept Visa, MasterCard, and PayPal.",
    contact: "You can contact us at DEDSV@STOPNSHOP.com",
    default: "I'm sorry, I didn't understand that. Can you please rephrase?",
  };

  let reply = responses.default;
  if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hey")) {
    reply = responses.greeting;
  } else if (lowerCaseMessage.includes("shipping")) {
    reply = responses.shipping;
  } else if (lowerCaseMessage.includes("return")) {
    reply = responses.returns;
  } else if (lowerCaseMessage.includes("payment")) {
    reply = responses.payment;
  } else if (lowerCaseMessage.includes("contact")) {
    reply = responses.contact;
  }

  res.json({ reply });
};
