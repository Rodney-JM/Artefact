const form = document.querySelector("#verify_form");

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());

    // Recupera os dados armazenados no localStorage
    const storedData = JSON.parse(window.localStorage.getItem('userData')) || {};

    // Mescla os dados do formulário com os dados armazenados
    const mergedObj = {
        ...storedData, // Dados do localStorage
        ...formDataObj  // Dados do formulário
    };

    console.log(JSON.stringify(mergedObj));

    try {
        const response = await fetch("http://localhost:8080/clients/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mergedObj)
        });

        if (!response.ok) {
            throw new Error("Erro na requisição");
        }

        /* const data = await response.json();
        console.log("Resposta do servidor:", data);*/

        // Redireciona ou realiza outra ação com base na resposta
        window.location.href = "login.html";
    } catch (error) {
        console.error("Erro:", error);
    }
});
