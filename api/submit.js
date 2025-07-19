export const config = {
  api: {
    bodyParser: false, // turn off default parsing
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  try {
    const body = await new Promise((resolve, reject) => {
      let data = '';
      req.on('data', chunk => (data += chunk));
      req.on('end', () => resolve(data));
      req.on('error', reject);
    });

    const formData = new URLSearchParams(body);
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
      const errorText = await response.text();
      console.error('FormSubmit error:', errorText);
      res.status(500).send('FormSubmit failed.');
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal server error.');
  }
}
