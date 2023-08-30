import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = ({vote1, vote2, can1, can2}) => {
    const labels = [can1, can2];
    const total = vote1 + vote2

    const data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: "rgb(77,77,255)",
                data: [vote1, vote2, total],
            },
        ],


    };
    const options = {
        scales: {
            x: {
                grid: {
                    display: false
                },
                border:  {
                    display: false
                }

            },
            y: {
                display:false
            }
        },
        events: [],
        plugins: {
            legend: {
                display: false
            },
        }
    };
    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;