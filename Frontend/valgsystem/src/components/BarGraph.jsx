import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
    const labels = ["Kandidat 1", "Kandidat 2"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Stemmer",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [2, 10, 50],
            },
        ],
    };
    return (
        <div>
            <Bar data={data} />
        </div>
    );
};

export default BarChart;