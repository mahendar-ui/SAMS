const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Invoice",
    link: 'http://example.com',
  },
});
exports.create = (req, res) => {
let transporter = nodemailer.createTransport({
	service:'gmail',
	secure: true,
	auth:{
		user:'nishith@pixehub.com',
		pass:'nishith@2025'
	}
});
const { invoice_name} = req.body;
  // then send the email
  let response = {
    body: {
	  name:invoice_name,
    intro: "Welcome to invoice!",
    },
  };
  let mail = MailGenerator.generate(response);
  let message = {
    from: 'invoice',
    to: 'nishith@pixehub.com',
    subject: "Invoice Details",
    html: mail,
    attachments: [  {  
      filename: 'invoice.pdf',
      content: req.body.fileContent,
      contentType: 'application/pdf'
  }]
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .json({ msg: "you should receive an email from us" });
    })
    .catch((error) => console.error(error));
};