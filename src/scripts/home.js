function authorize(arq){
    const storageToken = localStorage.getItem('authorizationToken');
    const currentPage = window.location.pathname; // Get current page

    if (currentPage.includes('login.html')) return;

    if(storageToken){
        if (!currentPage.includes(arq)) {
            window.location.href = arq;
        }
    }else{
        if (!currentPage.includes('login.html')) {
            window.location.href = 'login.html';
        }
    }
}

authorize('home.html');
