import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import './Charts.scss';

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
    };
  }
  static defaultProps = {
    displayTitle: 'true',
    disphayLegend: 'true',
    legendPosition: 'right',
    location: 'City',
  };

  render() {
    return (
      <div className='Charts'>
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: 'Biểu Đồ Cột' + this.props.location,
              fontSize: 25,
            },
            legend: {
              display: this.props.disphayLegend,
              position: this.props.legendPosition,
            },
          }}
        />
        <div
          className='Chart'
          //   style={{ justifyContent: 'space-between', display: 'flex' }}
        >
          <Line
            data={this.state.chartData}
            width={100}
            height={50}
            options={{
              title: {
                display: this.props.displayTitle,
                text: 'Biểu Đồ Đường' + this.props.location,
                fontSize: 25,
              },
              legend: {
                display: this.props.disphayLegend,
                position: this.props.legendPosition,
              },
            }}
          />{' '}
          <Pie
            width={100}
            height={50}
            data={this.state.chartData}
            options={{
              title: {
                display: this.props.displayTitle,
                text: 'Biểu Đồ Tròn' + this.props.location,
                fontSize: 25,
              },
              legend: {
                display: this.props.disphayLegend,
                position: this.props.legendPosition,
              },
            }}
          />
        </div>
      </div>
    );
  }
}
export default Charts;
