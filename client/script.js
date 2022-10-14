function submit(){
    // Query for person's ID. if does not exist, Display it.

    fetch("http://localhost:8080/").then((res)=>res.json()).then((data)=>{
        console.log(data)
    })
}


const dbForm = document.getElementById('db-form');

dbForm.addEventListener('submit',(e)=>{
    e.preventDefault() // overrides default submission. results in error if deleted.
    const data = Object.fromEntries(new FormData(e.target).entries()); // Converts form data into key value pairs for us.
    console.log(data)
    let postOptions = {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    }
    fetch("http://localhost:8080/",postOptions)
})