const apiEndpoint = `http://localhost:8080`
function alert_(type, message, delay){

    if(document.getElementById("inter")){
        document.getElementById("inter").remove()
    }

    const types = {
        "good" : {
            "dclass" : "alert alert-success alert-dismissible d-flex align-items-center fade show",
            "iclass" : "bi-check-circle-fill",
            "sm" : "Well Done"
        },

        "error" : {
            "dclass" : "alert alert-danger alert-dismissible d-flex align-items-center fade show",
            "iclass" : "bi-exclamation-octagon-fill",
            "sm" : "Error"
        },

        "warning" : {
            "dclass" : "alert alert-warning alert-dismissible d-flex align-items-center fade show",
            "iclass" : "bi-exclamation-triangle-fill",
            "sm" : "Warning"
        }
    }

    var div1 = document.createElement("div");
    div1.className = types[type]["dclass"]
    div1.id="inter";

    var i = document.createElement("i");
    i.className = types[type]["iclass"]

    var strong = document.createElement("strong");
    strong.className = "mx-2";
    strong.innerText = types[type]["sm"];

    var mes = document.createTextNode("    :    "+message);
    strong.append(mes)

    div1.append(i, strong);

    document.getElementById("alert").appendChild(div1)

    setTimeout(()=>{
        document.getElementById("inter").remove()
        console.log("done")
    }, delay); 

}

function POST(apiEndpoint,data,callback){
    let postOptions = {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    }
    fetch(apiEndpoint,postOptions).then(response =>response.json()).then((data)=>{
        callback(data)
    })
}
export {apiEndpoint,alert_,POST}