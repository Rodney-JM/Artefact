const form = document.querySelector("#login_form");

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObject)
        });

        if (!response.ok) {
            // Se a resposta não for bem sucedida, lança um erro com o texto da mensagem
            const errorText = await response.text(); // Pegamos o texto do erro
            throw new Error(errorText);
        }

        const data = await response.json();

        if (!response.ok) {
            errorMessage.classList.remove("hidden");
            errorMessage.textContent = data.errorMessage;
            return; 
        }

        window.localStorage.setItem("authorizationToken", data.token);
        window.localStorage.setItem("clientId", data.id);
        window.location.href = "home.html";
    } catch (error) {
       // Suponha que 'error.message' seja o que está vindo do erro
        let errorElements = document.querySelector(".error_message");

        if (!errorElements) {
            let errorMessage = document.createElement('p');
            errorMessage.textContent = error.message;
            errorMessage.classList.add('error_message');
            form.appendChild(errorMessage);
        } else {
            if (errorElements.textContent !== error.message) {
                errorElements.textContent = error.message; // Atualiza o texto com a nova mensagem de erro
            }
        }

        }
});
