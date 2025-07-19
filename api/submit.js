export default async function handler(req, res) {
  if (req.method === "POST") {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      const formData = new URLSearchParams(body);

      // Optional: Add fallback fields if user left something blank
      if (!formData.has("display_name")) {
        formData.append("display_name", "Anonymous");
      }

      try {
        const response = await fetch("https://formsubmit.co/infinitycsgamer@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: formData.toString()
        });

        if (response.ok) {
          res.writeHead(302, { Location: "/thanks.html" }); // redirect to thank-you page
          res.end();
        } else {
          res.status(500).send("❌ Failed to send email");
        }
      } catch (error) {
        console.error("Error forwarding form:", error);
        res.status(500).send("❌ Internal Error");
      }
    });
  } else {
    res.status(405).send("❌ Method Not Allowed");
  }
}
