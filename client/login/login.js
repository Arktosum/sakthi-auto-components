const dbForm = document.getElementById('db-form');
const templateDiv = document.getElementById('template');
dbForm.addEventListener('submit',(e)=>{
    e.preventDefault() // overrides default submission. results in error if deleted.
    const data = Object.fromEntries(new FormData(e.target).entries()); // Converts form data into key value pairs for us.
    let postOptions = {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    }
    fetch("http://localhost:8080/login",postOptions).then((response) => response.json())
    .then((data) => {
        switch(data.error) {
            case 0 : displayAlert()
                     sessionStorage.setItem('sessionID', data.id)
                     window.location.href = `..\\page\\page.html`;
                     
                     break;
            case -1: alert("You... liar.")
                    break;
        }
    })

})

function displayAlert(){
    document.body.innerHTML += `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Validated!</strong> You are being redirected to your personal page now.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
}