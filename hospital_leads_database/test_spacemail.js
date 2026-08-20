const nodemailer = require('nodemailer');
const imaps = require('imap-simple');

async function testSpacemail() {
  console.log('Testing Spacemail SMTP for mharcgatan@linkable.it.com...');

  const transporter465 = nodemailer.createTransport({
    host: 'mail.spacemail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'mharcgatan@linkable.it.com',
      pass: 'Melonjuice01!'
    }
  });

  try {
    const verified = await transporter465.verify();
    console.log('✅ Spacemail SMTP Port 465 Verified Successfully:', verified);

    const info = await transporter465.sendMail({
      from: '"Mharc Gatan • LinkableAI" <mharcgatan@linkable.it.com>',
      to: 'mckinsyo01@gmail.com',
      subject: '⚡ LinkableAI Official Spacemail SMTP Active • mharcgatan@linkable.it.com',
      html: '<h3>Congratulations Mharc!</h3><p>Your official domain email <strong>mharcgatan@linkable.it.com</strong> is now 100% active, authenticated, and verified for enterprise dispatches!</p>'
    });
    console.log('✅ Live Email Sent from mharcgatan@linkable.it.com! MessageId:', info.messageId);
  } catch (err) {
    console.error('❌ SMTP Error:', err.message);
  }

  console.log('\nTesting Spacemail IMAP for mharcgatan@linkable.it.com...');
  const imapConfig = {
    imap: {
      user: 'mharcgatan@linkable.it.com',
      password: 'Melonjuice01!',
      host: 'mail.spacemail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 10000
    }
  };

  try {
    const connection = await imaps.connect(imapConfig);
    console.log('✅ Spacemail IMAP Connected Successfully!');
    await connection.openBox('INBOX');
    console.log('✅ INBOX opened successfully!');
    connection.end();
  } catch (err) {
    console.error('❌ IMAP Error:', err.message);
  }
}

testSpacemail();
