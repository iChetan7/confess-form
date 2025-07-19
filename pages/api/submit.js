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

  const formData = new URLSearchParams();
  formData.append('displayName', display_name || 'Anonymous');
  formData.append('confession', confession);
  formData.append('category', category || 'Other');
  formData.append('_subject', 'New Confession Submission');
  formData.append('_captcha', 'false');
  formData.append('_template', 'table'); // Prettier email format
  formData.append('_next', 'https://yourdomain.vercel.app/thankyou.html'); // Apna Vercel URL

  try {
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
      res.status(500).send('FormSubmit failed.');
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error submitting confession');
  }
}
