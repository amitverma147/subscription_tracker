import transporter, { accountEmail } from "../config/nodemailer.js";

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) {
    throw new Error("Missing required parameters");
  }

  const template = emailTemplates.find((t) => t.label === type);

  if (!template) {
    throw new Error("Template not found");
  }

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("MMM D, YYYY"),
    planName: subscription.name,
    price: `${subscription.currency}${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
  };

  const message = template.generateEmail(mailInfo);
  const subject = template.subject(mailInfo);
  const mailOptions = {
    from: accountEmail,
    to: to,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
