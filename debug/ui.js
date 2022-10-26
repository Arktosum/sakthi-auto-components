fetch("http://localhost:8080/ui").then((response) => response.json()).then((data)=>{
    displayDatabase(data)
})


function displayDatabase(db) {
    
    for(key in db){
        let HTML = `
        <h1> Table : ${key}</h1>
        <table>
        
        `
        for(let col in db[key][0]){
            HTML += `<th>${col}</th>`
        }
        for(let row of db[key]){
            HTML += `<tr>`
            for (let col in row){
                HTML += `<td>${row[col]}</td>`
            }
            HTML += `</tr>`
            
        }
        HTML += `</table>`
        document.body.innerHTML += HTML
    }
}