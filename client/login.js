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
            case 0 : alert(`You are ${data.id}`)
                     sessionStorage.setItem('sessionID', data.id)
                     window.location.href = "page.html";
                     break;
            case -1: alert("You... liar.")
                    break;
        }
    })

})

