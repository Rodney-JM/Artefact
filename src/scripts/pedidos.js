const button = document.querySelector(".p_button")

const p_form = document.querySelector(".pedido-form")
const back_button = document.querySelector(".fa-xmark")

button.addEventListener("click", ()=>{
    p_form.classList.remove("hidden")
    back_button.classList.remove("hidden")
})


back_button.addEventListener('click', ()=>{
    p_form.classList.add("hidden")
    back_button.classList.add("hidden")
})

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const assunto = document.querySelector('input[name="assunto"]').value;
    const mensagem = document.querySelector('input[name="mensagem"]').value;
    
    const token = window.localStorage.getItem("authorizationToken");
    
    const response = await fetch('http://localhost:8080/pedidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, assunto, mensagem })
    });
    
    if (response.ok) {
        alert('Pedido enviado com sucesso!');
    } else {
        document.getElementById('error-message').textContent = 'Erro ao enviar o pedido.';
    }
});

