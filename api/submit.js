export const config = {
  api: {
    bodyParser: false, // Disable built-in body parsing
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  try {
    const bodyText = await new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => (body += chunk));
      req.on('end', () => resolve(body));
      req.on('error', reject);
    });

    const formData = new URLSearchParams(bodyText);

    formData.append('_captcha', 'false');
    formData.append('_template', 'table');

    const response = await fetch('https://formsubmit.co/infinitycsgamer@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (response.ok) {
      res.writeHead(302, { Location: '/thankyou.html' });
      res.end();
    } else {
      console.error(await response.text());
      res.status(500).send('FormSubmit failed.');
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error submitting confession.');
  }
}
