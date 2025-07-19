const jsConfetti = new JSConfetti();

function showPopup(event) {
  event.preventDefault();
  const form = event.target;

  document.getElementById('popup').classList.add('active');
  jsConfetti.addConfetti({
    confettiNumber: 100,
    confettiRadius: 6
  });

  setTimeout(() => {
    const formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(() => {
      window.location.href = "thankyou.html";
    }).catch(() => {
      alert("Oops! Something went wrong.");
    });
  }, 1500);
}
