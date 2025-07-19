export default async function handler(req, res) {
  if (req.method === "POST") {
    const formData = new URLSearchParams(req.body).toString();

    const response = await fetch("https://formsubmit.co/infinitycsgamer@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData
    });

    if (response.ok) {
      res.redirect(302, "/thanks.html");
    } else {
      res.status(500).send("Failed to submit form");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}

