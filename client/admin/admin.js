import {apiEndpoint,alert_,POST} from "../utils.js"

const dbForm = document.getElementById('db-form');
dbForm.addEventListener('submit',(e)=>{
    e.preventDefault() // overrides default submission. results in error if deleted.
    const data = Object.fromEntries(new FormData(e.target).entries()); // Converts form data into key value pairs for us.
    
    setTimeout(()=>{
        sessionStorage.setItem('sessionID', data.id)
        window.location.href = `..\\page\\page.html`;
    }, 1000)

})



