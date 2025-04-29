const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// E-posta ayarları
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pozstudiosh@gmail.com',
    pass: 'UYGULAMA_ŞİFRENİ_BURAYA_YAZ' // Gmail uygulama şifresi kullanmalısın
  }
});

// Geri bildirim endpointi
app.post('/send-feedback', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).send('Code missing');

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
  console.log(`Server listening on port ${PORT}`);
});
