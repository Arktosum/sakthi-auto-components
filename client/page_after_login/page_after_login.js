var submit=document.querySelector('#submit')
var EmployeeIDinp=document.querySelector('#EmployeeIDinp')
var EmployeeNameinp=document.querySelector('#EmployeeNameinp')
function getvalues(){
    console.log(EmployeeNameinp.value)
    console.log(EmployeeIDinp.value)
}

const forms = document.getElementById('forms');

forms.addEventListener('submit',(e)=>{
    e.preventDefault() // overrides default submission. results in error if deleted.
    const data = Object.fromEntries(new FormData(e.target).entries()); // Converts form data into key value pairs for us.
    

    let postOptions = {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    }
    fetch("http://localhost:8080/admindash",postOptions).then((response) => response.json())
    .then((data) => {
        console.log(data);
        // switch(data.error) {
        //     case 0 : alert_("good", `${data.id} logged successfully`, 1200)
        //             setTimeout(()=>{
        //                 sessionStorage.setItem('sessionID', data.id)
        //                 window.location.href = `..\\page\\page.html`;
        //             }, 1000)
        //             break;
        //     case -1: alert_("warning", "Invalid Credentials", 2000)
        // }

    })

})
