
let userID = {id: sessionStorage.getItem('sessionID')}
let postOptions = {
    method : 'POST',
    headers : {
        'Content-Type': 'application/json'
    },
    body : JSON.stringify(userID)
}

fetch("http://localhost:8080/userdata",postOptions).then((response) => response.json())
.then((data) => {
    switch(data.error) {
        case 0 : displayData(data.data)
                break;
        case -1: alert("Something went REALLY wrong.")
                break;
    }
})


function displayData(data){
    document.body.innerHTML+= `<div>
    
    <h1>Welcome, ${data.NAME}!</h1>
    <p> Employee No : ${data.ID}</p>
    <p>Designation : ${data.DESIGNATION}</p>
    </div>`
    console.log(data)
}
function logout(){
    sessionStorage.removeItem('sessionID')
    alert("You have been logged out!")
    window.location.href = "login.html";
}
