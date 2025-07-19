export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  const formData = new URLSearchParams();
  Object.entries(req.body).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Prevent CAPTCHA and show thankyou.html after submission
  formData.append('_captcha', 'false');
  formData.append('_template', 'table'); // prettier email

  try {
    const response = await fetch('https://formsubmit.co/infinitycsgamer@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString(),
    });

    if (response.ok) {
      // Redirect to thank you page
      res.writeHead(302, { Location: '/thankyou.html' });
      res.end();
    } else {
      res.status(500).send('FormSubmit failed.');
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error submitting confession');
  }
}
