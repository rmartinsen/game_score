import React, { PureComponent } from 'react';
import GameScoreChart from './gameScoreChart';

class GameScoreChartContainer extends PureComponent {

    componentDidMount(interval) {
        fetch('https://5o4wpoqq31.execute-api.us-east-1.amazonaws.com/get_player_data')
        .then(response => response.json())
        .then(data => {this.setState({
            gameLogs: data
        })})
    }

    render() {
        if (this.state === null) {
            return <div>No data</div>
        }
        return <div style={{width: 1000}}>
            <GameScoreChart gameLogs={this.state.gameLogs} />
            </div>
    }
}

export default GameScoreChartContainer