import React, { PureComponent } from 'react';
import Chart from 'chart.js'


class GameScoreChart extends PureComponent {
    chartRef = React.createRef();

    componentDidMount(){
        const myChartRef = this.chartRef.current.getContext("2d");

        const labels = this.props.gameLogs.map(x => x.gameDate)
        const gameScores = this.props.gameLogs.map(x => x.gameScore)

        
        new Chart(myChartRef, {
            type: "bar",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
                    {
                        label: "Game Scores by Date",
                        data: gameScores,
                        backgroundColor: this.getColor,
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'linear',
                        gridLines: {
                            drawTicks: false,
                            display: false
                        },
                        offset: true,
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 3
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
            }
        });
    }

    getColor(context) {
        const idx = context.dataIndex
        const val = context.dataset.data[idx]
        console.log(context)
        if (val < 0) {
            return 'hsl(215, 100%, 50%';
        } else if (val < 5) {
            return 'hsl(215, 100%, 75%';
        } else if (val < 10) {
            return 'hsl(215, 100%, 80%';
        } else if (val < 12.5) {
            return 'hsl(215, 100%, 91.2%';
        } else if (val < 15) {
            return 'hsl(34, 100%, 87%';
        } else if (val < 20) {
            return 'hsl(34, 100%, 72%';
        } else if (val < 25) {
            return 'hsl(34, 100%, 60%';
        } else {
            return 'hsl(34, 100%, 47%';
        }
        
    }



    render() {
        return (
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

export default GameScoreChart