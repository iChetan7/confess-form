export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  const formData = new URLSearchParams();
  Object.entries(req.body).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.append('_captcha', 'false');

  try {
    const response = await fetch('https://formsubmit.co/infinitycsgamer@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });

    return res.writeHead(302, { Location: '/thankyou.html' }).end();
  } catch (err) {
    console.error(err);
    return res.status(500).send('Submission failed');
  }
}
