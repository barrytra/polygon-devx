import { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import "./styles.css";

const colorPrimary = "#0b927c";
const colorDefault = "#e1e4f2";


const defaultOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 750,
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
  },
  stroke: {
    lineCap: "straight",
  },
  dataLabels: {
    enabled: true,
  },
  legend: {
    show: false,
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      // opacityFrom: 0.4,
      // opacityTo: 0,
      // shadeIntensity: 0.2,
    },
  },
};



export function Chart(props){


//   const [series, setSeries] = useState(daily);
//   const [activeButton, setActiveButton] = useState("Daily");
const [amountData,setAmountData] = useState([]);  
const [timeData,setTimeData] = useState([]); 

// let temp = []
useEffect(() => {
  // console.log(props.amountData)
  // console.log(props.timeData)
  setAmountData([{name: "amount", data: props.amountData}])
  for(let i =0;i<props.timeData.length; i++){
    setTimeData(prev => [ ...prev,props.timeData[i]])
  }
  // setTimeData([temp])
}, [props.amountData, props.timeData])

console.log(timeData)
var options = {
  ...defaultOptions,
  chart: {
    ...defaultOptions.chart,
    type: "bar",
  },
  colors: [colorPrimary, colorDefault],
  grid: {
    // borderColor: "rgba(255, 255, 255, 0.08)",
    // padding: { left: -10, right: 0, top: -16, bottom: -8 },
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  yaxis: {
    labels: {
      show: true,
    },
  },
  xaxis: {
    labels: {
      show: true,
    },
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: true,
    },
    crosshairs: {
      show: false,
    },
    categories: timeData,
  },
};

// const newValue = [];
// console.log("fetched data", props.data)  
// setAmount(props.data)
// for(let i=0;i< props.data.length; i++){
//   newValue.push({name:"amount", data:props.data[i].amount})
// }
// setAmount(newValue);

  return (
    <div className="card">
      {/* <header>
        <h2>Revenue</h2>
        <ToggleButtons
          setSeries={setSeries}
          setActiveButton={setActiveButton}
          activeButton={activeButton}
        />
      </header> */}
      <div className="chart">
        <ApexChart
          options={options}
          series={amountData}
          type="line"
          width="80%"
          height="100%"
        />
      </div>
    </div>
  );
};