const form = document.querySelector("#register_form");

form.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const formData = new FormData(form);

    const formDataObj = Object.fromEntries(formData.entries());

    console.log(JSON.stringify(formDataObj));

    try {
        const response = await fetch("http://localhost:8080/clients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObj)
        });
    
        if (!response.ok) {
            // Se a resposta não for bem sucedida, lança um erro com o texto da mensagem
            const errorText = await response.text(); // Pegamos o texto do erro
            throw new Error(errorText);
        }
    
        const data = await response.json();  // Se a resposta for bem sucedida
        console.log('Cliente registrado com sucesso:', data);

        var objetoQualquer = { email: data.email};
        window.localStorage.setItem('userData', JSON.stringify(objetoQualquer));        

        window.location.href = "verificacao.html";
    
    } catch (error) {
        let errorElements = document.querySelectorAll(".error_message");

        if(errorElements.length == 0){
            let errorMessage = document.createElement('p');
            errorMessage.textContent = error.message;

            errorMessage.classList.add('error_message');

            form.appendChild(errorMessage);
        }
    }})    