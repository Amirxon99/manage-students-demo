// const nodemailer = require("nodemailer");

// exports.sendVerificationMail = ({ to, vercode }) => {
//   console.log(to, vercode);
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "ibaydillayevamirullo@gmail.com",
//       pass: "vpuklacmmfusiemq",
//     },
//   });

//   const options = {
//     from: "ibaydillayevamirullo@gmail.com",
//     to: to,
//     subject: "Verification mail",
//     html: `<h1>Hi ${to}</h1><p>Please Verify</p><button style=padding:100px,background-color:blue><a href="http://localhost:3000/verify/${vercode}">Verify</a></button>`,
//   };

//   transporter.sendMail(options, (err, info) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("email sent");
//   });
// };
