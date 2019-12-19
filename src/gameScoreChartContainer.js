import React, { PureComponent } from 'react';
import GameScoreChart from './gameScoreChart';
import PlayerSelector from './playerSelector';

class GameScoreChartContainer extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            gameLogs: [],
        };
        this.fetchPlayerData('horfoal01');
    }

    fetchPlayerData(playerId) {
        fetch(`https://5o4wpoqq31.execute-api.us-east-1.amazonaws.com/get_player_data?playerId=${playerId}`)
        .then(response => response.json())
        .then(data => {this.setState({
            gameLogs: data
        })});
    }

    setPlayerId() {
        const selector = document.getElementById('playerSelect')
        const playerId = selector.options[selector.selectedIndex].value
        this.fetchPlayerData(playerId)
    }

    render() {
        if (this.state === null) {
            return <div>No data</div>
        }
        return <div style={{width: 1000}}>
            <PlayerSelector selectorOnChange={this.setPlayerId.bind(this)}/>
            <GameScoreChart gameLogs={this.state.gameLogs} />
            </div>
    }
}

export default GameScoreChartContainer