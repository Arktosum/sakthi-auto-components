const dbForm = document.getElementById('db-form');

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
    fetch("http://localhost:8080/",postOptions).then((res)=>res.json()).then((data)=>{
        console.log(data)
        if(data["error"] == -1){
            alert("User already exists!")
        }
        else if (data["error"] == 0){
            alert("User created successfully!")
        }
    })
})