
let userID = sessionStorage.getItem('sessionID')
const chartEle = document.getElementById('myChart')
let x = [1,2,3,4,5];
let y =  [1,1,1,1,1]
let config = getConfig('line',x,y,'KP%',`rgba(0,0,255,0.4)`,`rgba(0,255,0,0.5)`,`rgba(255,0,0,0.3)`)
const chart = new Chart(chartEle,config)

let postOptions = {
    method : 'POST',
    headers : {
        'Content-Type': 'application/json'
    },
    body : JSON.stringify({id : userID})
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
    // document.body.innerHTML+= `<div>
    // <h1>Welcome, ${data.NAME}!</h1>
    // <p> Employee No : ${data.ID}</p>
    // <p>Designation : ${data.DESIGNATION}</p>
    // </div>`
    console.log(data)
}
function logout(){
    sessionStorage.removeItem('sessionID')
    alert("You have been logged out!")
    window.location.href = "..\\login\\login.html";
}


// EMPLOYEE DETAILS

const dbForm = document.getElementById('daily-entry');
const templateDiv = document.getElementById('template');
dbForm.addEventListener('submit',(e)=>{
    e.preventDefault() // overrides default submission. results in error if deleted.
    const data = Object.fromEntries(new FormData(e.target).entries()); // Converts form data into key value pairs for us.
    let date = new Date().toISOString().replace(/T.*/,'')
    //data.date = date // YYYY-MM-DD strictly. dates must be 0 padded. If date problems occur it's probably right here.
    data.date = `2022-09-27`  // for testing ONLY
    data.id = userID
    let postOptions = {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    }
    fetch("http://localhost:8080/insert_daily",postOptions).then((response) => response.json())
    .then((data) => {
        switch(data.error) {
            case 0 : alert("success!")
                     break;
            case -1: alert("You have already set today's data. Do you want to update it?")
                    break;
            case -2 : alert("Something went wrong!");
                    break;
        }
    })

})


// Charts
fetch("http://localhost:8080/get_daily",postOptions).then((response) => response.json())
    .then((data) => {
        if (data.length == 0){return} // Default Graph. No data exists.
        
        let New_Data = []
        let x_  = []
        let y_ = []
        data.forEach((row)=>{
            let kp = row.rhsi + row.rmi + row.rq + row.cc + row.pp + row.kaizen
            x_.push(row.date)
            y_.push(kp)
            New_Data.push({x: row.date, y: kp})
        })
        chart.data.labels = x_
        chart.data.datasets[0].data = y_
        chart.update()
    })





function getConfig(type,x,y,label,backgroundColor=`rgba(0, 0, 0, 0.1)`,borderColor=`rgba(0, 0, 0, 0.1)`,color=`#666`){
    let data = {
        labels: x,
        datasets : [{
            data : y,
            backgroundColor : backgroundColor,
            borderColor : borderColor,
            color : color,
            label: label,
        }]
    }
    return {type:type,data:data}
}