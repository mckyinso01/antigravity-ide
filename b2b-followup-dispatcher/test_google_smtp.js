import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'mckinsyo01@gmail.com',
    pass: process.env.SMTP_PASS
  }
});

async function test() {
  const info = await transporter.sendMail({
    from: '"Mharc Gatan - Linkable Systems" <mharcgatan@linkable.it.com>',
    to: 'mckinsyo01@gmail.com',
    subject: 'Google SMTP Pipeline Test - Linkable Systems',
    text: 'Verified Google SMTP Pipeline 100% Operational via mharcgatan@linkable.it.com alias.'
  });
  console.log('✅ Google SMTP Send with Linkable Alias SUCCEEDED! MessageId:', info.messageId);
}

test().catch(console.error);
