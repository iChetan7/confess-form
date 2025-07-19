export const config = {
  api: {
    bodyParser: true, // Enable body parsing
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST requests allowed');
  }

  const { confession, display_name, category } = req.body;

  if (!confession) {
    return res.status(400).send('Confession is required');
  }

  const formPayload = new URLSearchParams();
  formPayload.append('displayName', display_name || 'Anonymous');
  formPayload.append('confession', confession);
  formPayload.append('category', category || 'Other');
  formPayload.append('_subject', 'New Confession Submission');
  formPayload.append('_captcha', 'false');
  formPayload.append('_next', 'https://yourdomain.vercel.app/thankyou.html'); // Apna Vercel URL

  try {
    const response = await fetch('https://formsubmit.co/infinitycsgamer@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formPayload.toString(),
    });

    if (!response.ok) {
      throw new Error(`Formsubmit error: ${response.statusText}`);
    }

    return res.writeHead(302, { Location: '/thankyou.html' }).end();
  } catch (error) {
    console.error('Error sending to Formsubmit:', error);
    return res.status(500).send('Something went wrong, please try again later');
  }
}
