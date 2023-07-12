import React, { Component } from "react";
import { Chart } from "primereact/chart";

class Piechart extends Component {
  constructor(props) {
    super(props);

    this.chartData = {
      datasets: [
        {
          data: [50, 50, 50, 50, 50, 50],
          backgroundColor: [
            "#2B2E4A",
            "#86CEFA",
            "#73B9EE",
            "#5494DA",
            "#3373C4",
            "#1750AC",
          ],
        },
      ],
    };

    this.lightOptions = {
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
    };
  }

  render() {
    return (
      <div className="card">
        <Chart
          type="doughnut"
          data={this.chartData}
          options={this.lightOptions}
          style={{ position: "relative", width: "90%",height:"100%", margin: "0 auto" }}
        />
      </div>
    );
  }
}

export default Piechart;
