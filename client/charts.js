//https://www.chartjs.org/docs/latest/
const chartEle = document.getElementById('myChart')

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

// Most job is done in config and data.

/*
Data customization:

backgroundColor : rgba
borderColor : rgba
color : hex (font-color)


// Line / Bar
labels -> x axis (1-D array)
data -> y axis (1-D array)

in order to have separate colors for each data point , pass colors as a 1D array corresponding to the ith data point.
*/


let x = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

let y =  [0, 10, 5, 2, 20, 30, 45]

let config = getConfig('pie',x,y,'Profit')
const chart = new Chart(chartEle,config)