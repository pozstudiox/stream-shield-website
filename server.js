const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// ➡ Ana sayfa (/) isteğini karşıla
app.get('/', (req, res) => {
  res.send('StreamShield Server Çalışıyor!');
});

// ➡ Uninstall sonrası geri bildirim isteğini karşıla
app.post('/send-feedback', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).send('Code missing');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pozstudiosh@gmail.com',
      pass: 'GMAIL_APP_PASSWORD'  // Gerçek Gmail uygulama şifresi buraya
    }
  });

  const mailOptions = {
    from: 'StreamShield <pozstudiosh@gmail.com>',
    to: 'pozstudiosh@gmail.com',
    subject: '🎯 Bir Yeni Geri Bildirim Geldi!',
    html: `
      <div style="background-color:#0d1117;padding:20px;border-radius:12px;font-family:'Segoe UI',sans-serif;color:#e6edf3;">
        <h2 style="color:#58a6ff;">StreamShield - Geri Bildirim</h2>
        <p><strong>Geri Bildirim Kodu:</strong> ${code}</p>
        <p style="margin-top:20px;">Yeni bir kullanıcı uzantıyı kaldırdı.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Mail gönderildi!');
    res.status(200).send('Feedback gönderildi');
  } catch (error) {
    console.error('Mail gönderilemedi:', error);
    res.status(500).send('Feedback gönderilemedi');
  }
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor.`);
});
