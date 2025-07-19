export const config = {
  api: {
    bodyParser: false, // disable built-in parser
  },
};

import { parse } from 'querystring';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST allowed');
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    const formData = parse(body);

    const forward = new URLSearchParams(formData);
    forward.append('_captcha', 'false');

    try {
      const response = await fetch('https://formsubmit.co/infinitycsgamer@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: forward.toString(),
      });

      return res.writeHead(302, { Location: '/thankyou.html' }).end();
    } catch (err) {
      console.error('Error:', err);
      return res.status(500).send('Submission failed');
    }
  });
}
