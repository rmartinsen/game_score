import React, { PureComponent } from 'react';
import Chart from 'chart.js'

var myChart

class GameScoreChart extends PureComponent {
    chartRef = React.createRef();

    componentDidUpdate(){
        const myChartRef = this.chartRef.current.getContext("2d");
        
        const labels = this.props.gameLogs.map(x => x.gameDate)
        const gameScores = this.props.gameLogs.map(x => x.gameScore)

        if (myChart) {
            myChart.destroy();
        }

        const selector = document.getElementById('playerSelect')
        const playerId = selector.options[selector.selectedIndex].text
        
        myChart = new Chart(myChartRef, {
            type: "bar",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
                    {
                        data: gameScores,
                        backgroundColor: this.getColor,
                        borderColor: 'lightgray',
                        borderWidth: .5
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
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true
                        },
                        ticks: {
                            suggestedMin: -10,
                            suggestedMax: 50
                        }
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: (tooltipItem) => {
                            return this.formatTooltip(tooltipItem.index);
                        }
                    }
                }
            }
        });
    }

    // "ft": 2, "fta": 5, "orb": 2, "drb": 6, "stl": 0, "ast": 9, "blk": 0, "tov": 4, "pf": 4, "gameScore": 19.9}

    formatTooltip(idx) {
        const gameLog = this.props.gameLogs[idx]
        return [
                `Game Score: ${gameLog.gameScore}`,
                `Points: ${gameLog.pts}`, 
                `FG/FGA: ${gameLog.fg}/${gameLog.fga}`,
                `FT/FTA: ${gameLog.ft}/${gameLog.fta}`,
                `Rebounds: ${gameLog.orb + gameLog.drb}`,
                `Assists: ${gameLog.ast}`,
                `Steals: ${gameLog.stl}`,
                `Blocks: ${gameLog.blk}`,
                `Turnovers: ${gameLog.tov}`,
                `Fouls: ${gameLog.pf}`
                ]

    }

    getColor(context) {
        const idx = context.dataIndex
        const val = context.dataset.data[idx]
        const h_val = val > 10 ? 34 : 215;

        const magnitude = Math.abs(10 - val);
        const l_val = 100 - magnitude * 2

        return `hsl(${h_val}, 100%, ${l_val}%)`
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