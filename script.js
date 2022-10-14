function submit(){
    // Query for person's ID. if does not exist, Display it.

    fetch("http://localhost:8080/").then((res)=>res.json()).then((data)=>{
        console.log(data)
    })
}