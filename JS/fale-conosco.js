document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    console.log("Valor de message:", message);
    const emailBody = `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`;
    
    window.location.href = `mailto:resgatefiel@outlook.com?subject=Contato%20do%20Site&body=${encodeURIComponent(emailBody)}`;
});
