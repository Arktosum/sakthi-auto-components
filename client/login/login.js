import {apiEndpoint,alert_,POST} from "../utils.js"


const dbForm = document.getElementById('db-form');
dbForm.addEventListener('submit',(e)=>{
    e.preventDefault() // overrides default submission. results in error if deleted.
    const data = Object.fromEntries(new FormData(e.target).entries()); // Converts form data into key value pairs for us.
    POST(apiEndpoint+ "/login",data,(res)=>{
        switch(res.error) {
            case 0 : alert_("good", `${res.data.ID} logged successfully`, 1200)
                    let location = ``
                    if(res.data.DESIGNATION === 'A'){
                        location= `..\\admin\\admin.html`;
                    }
                    else{
                        location = `..\\page\\page.html`;
                    }
                    setTimeout(()=>{
                        sessionStorage.setItem('sessionID', res.data.ID)
                        window.location.href = location;
                    }, 1000)
                    break;
            case -1: alert_("warning", "Invalid Credentials", 2000)
        }
    })
        
})





