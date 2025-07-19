export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { confession, display_name, category } = req.body;

    const data = {
      confession: confession || '',
      display_name: display_name || 'Anonymous',
      category: category || 'Other',
    };

    // Send mail using FormSubmit
    const response = await fetch('https://formsubmit.co/ajax/infinitycsgamer@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      res.writeHead(302, { Location: '/thankyou.html' });
      res.end();
    } else {
      res.status(500).send('Email failed');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
