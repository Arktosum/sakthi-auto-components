import {apiEndpoint,alert_,POST} from "../utils.js"

// const r = document.querySelector(":root")
function show(){
    var inp = document.querySelector(`.${this.id}`)
    inp.style["background-size"] = "0 0.1em, 100% 0.1em";
}

function hide(){
    var inp = document.querySelector(`.${this.id}`)
    inp.style["background-size"] = "100% 0.1em, 0 0.1em";
}

var rhsi = document.getElementById("rhsi")
var rmi = document.getElementById("rmi")
var rq = document.getElementById("rq")
var cc = document.getElementById("cc")
var pplan = document.getElementById("pplan")
var pa = document.getElementById("pa")
var pp = document.getElementById("pp")
var kaizen = document.getElementById("kaizen")
var df = document.getElementById("date-from")
var dt = document.getElementById("date-to")

const inps = [rhsi, rmi, rq, cc, pplan, pa, pp, kaizen, df, dt];

inps.forEach(inp =>{
    inp.addEventListener('mouseover', show)
    inp.addEventListener('mouseout', hide)
    inp.addEventListener('focusin', show)
    inp.addEventListener('input', show)
    inp.addEventListener('focusout',hide)
})

let userID = sessionStorage.getItem('sessionID')
const chartEle = document.getElementById('daily-chart')
const chartEle2 = document.getElementById('attribute-chart')
const dateFrom = document.getElementById('date-from')
const dateTo = document.getElementById('date-to')
const toggleEle = document.getElementById('toggle-one')
let currdate = new Date().toISOString().replace(/T.*/,'')
// let currdate = '2022-11-15'
let minMostDate = '2022-01-01'
dateFrom.value = minMostDate
dateFrom.min = minMostDate
dateFrom.max = currdate
dateTo.value = currdate
dateTo.min = minMostDate
dateTo.max = currdate

let state = 0

toggleEle.onchange = ()=>{
    state = (state+1) % 2
    if(state == 0){
        // Display Chart
        document.getElementById("chart-div").style.display = 'flex'
        document.getElementById("table-div").style.display = 'none'
        
    }
    else{
        //Display Table
        document.getElementById("chart-div").style.display = 'none'
        document.getElementById("table-div").style.display = 'block'
    }
}

let x = [1,2,3,4,5];
let y =  [1,1,1,1,1]

let piChartColors = [`rgba(255,0,0)`,`rgba(0,255,0,0.5)`,`rgba(0,0,255,0.5)`,`rgba(255,0,255,0.5)`,`rgba(0,255,255,0.5)`,`rgba(255,255,0,0.5)`]

let config = getConfig('line',x,y,'KP%',`rgba(255,255,255,0.6)`,`rgba(0,255,0,0.6)`,`rgba(255,255,255,0.65)`)
const chart = new Chart(chartEle,config)

config = getConfig('doughnut',['RHSI','RMI','RQ','CC','PP','KAIZEN'],y,'KP%',piChartColors,`rgba(255,0,0,0)`,`rgba(255,0,0,0.3)`)
const attr_chart = new Chart(chartEle2,config)

document.getElementById('logout-btn').onclick = ()=>{
    console.log("logout")
    sessionStorage.removeItem('sessionID')
    alert("You have been logged out!")
    window.location.href = "..\\login\\login.html";
}



const insertDiv = document.getElementById('insert-area')

POST(apiEndpoint + '/user_data',{id:userID},(res)=>{

    insertDiv.innerHTML = `
    <h1> Welcome ${res.NAME}! </h1>
    <p> ID : ${res.ID} </p>
    <p> Designation : ${res.DESIGNATION} </p>
    `
})
// EMPLOYEE DETAILS

const dbForm = document.getElementById('daily-entry');

dbForm.addEventListener('submit',(e)=>{
    e.preventDefault() // overrides default submission. results in error if deleted.
    const data = Object.fromEntries(new FormData(e.target).entries()); // Converts form data into key value pairs for us.
    let date = new Date().toISOString().replace(/T.*/,'')
    data.date = date // YYYY-MM-DD strictly. dates must be 0 padded. If date problems occur it's probably right here.
    // data.date = `2022-11-01`  // for testing ONLY
    data.id = userID
    POST(apiEndpoint+"/insert_daily",data,(data)=>{
        switch(data.error) {
            case 0 : alert("success!");
                    displayChart()
                    break;
            case -1: alert("You have already set today's data. Do you want to update it?")
                    break;
            case -2 : alert("Something went wrong!");
                    break;
        }
    })

})



// Charts

displayChart(dateFrom.value,dateTo.value)
function displayChart(dateFrom,dateTo){
    POST(apiEndpoint + "/get_daily",{id:userID,from:dateFrom,to:dateTo},(data)=>{
        if (data.length == 0){
            alert_('warning',"No data for selected date!",2100)
            return} // Default Graph. No data exists.
        displayTable(data)
        let x_  = []
        let y_ = []
        let attr_y = [0,0,0,0,0,0]
        data.forEach((row)=>{
            let rhsi = row.rhsi > 0 ? 0 : 10
            let rmi = row.rmi > 0 ? 0 : 10
            let rq =  20- ((row.rq/row.pa)*100)
            let cc = row.cc > 0 ? 0 : 10
            let pp = row.pp*(40/100)
            let kaizen = row.kaizen > 0 ? 10 : 0
            let attr = [rhsi,rmi,rq,cc,pp,kaizen]
            for (let i=0; i<attr_y.length; i++){
                attr_y[i] += attr[i]
            }
            let kp = rhsi + rmi + rq + cc + pp + kaizen
            x_.push(row.date)
            y_.push(kp)
        })
        for(let i = 0 ; i < attr_y.length; i++){
            attr_y[i] = attr_y[i]/data.length
        }
        attr_chart.data.datasets[0].data = attr_y
        attr_chart.update()
        chart.data.labels = x_
        chart.data.datasets[0].data = y_
        chart.update()
    })
}

        
function displayTable(data){
    let table = document.getElementById('table-div')
    let string = `<table>
    <tr>
        <th>Date</th>
        <th>RHSI</th>
        <th>RMI</th>
        <th>RQ</th>
        <th>CC</th>
        <th>PPLAN</th>
        <th>PA</th>
        <th>PP</th>
        <th>Kaizen</th>
    </tr>
    `
    for(let row in data){
        string += `<tr>`
        for(let col in data[row]){
            if(col == 'id'){continue;}
            string += `<td>${data[row][col]}</td>`
        }
        string += `</tr>`
        
    }

    string += `</table>`
    table.innerHTML = string
}



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


dateFrom.onchange=dateQuery
dateTo.onchange=dateQuery

function dateQuery(){
    displayChart(dateFrom.value,dateTo.value)
}