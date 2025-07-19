export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  const formData = new URLSearchParams();
  Object.entries(req.body).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Add email address here privately
  formData.append('_captcha', 'false');
  formData.append('_template', 'box');
  formData.append('_next', 'https://your-domain.vercel.app/thankyou.html');

  try {
    const response = await fetch('https://formsubmit.co/infinitycsgamer@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString(),
    });

    res.writeHead(302, { Location: '/thankyou.html' });
    res.end();
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error submitting confession');
  }
}
