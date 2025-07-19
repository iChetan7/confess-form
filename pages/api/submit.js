export const config = {
  api: {
    bodyParser: false,
  },
};

import { parse } from 'querystring';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests allowed');
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    const formData = parse(body);

    const payload = new URLSearchParams();
    payload.append('displayName', formData.displayName);
    payload.append('confession', formData.confession);
    payload.append('category', formData.category);
    payload.append('_captcha', 'false');
    payload.append('_next', 'https://yourdomain.vercel.app/thankyou.html');

    try {
      const response = await fetch('https://formsubmit.co/infinitycsgamer@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
      });

      return res.writeHead(302, { Location: '/thankyou.html' }).end();
    } catch (error) {
      console.error(error);
      return res.status(500).send('Something went wrong');
    }
  });
}
