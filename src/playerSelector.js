
import React, { PureComponent } from 'react';


class PlayerSelector extends PureComponent {
    players = [
    {'playerId': 'horfoal01', 'playerName': 'Al Horford'},
    {'playerId': 'simmobe01', 'playerName': 'Ben Simmons'},
    {'playerId': 'korkmfu01', 'playerName': 'Furkan Korkmaz'},
    {'playerId': 'ennisja01', 'playerName': 'James Ennis'},
    {'playerId': 'embiijo01', 'playerName': 'Joel Embiid'},
    {'playerId': 'boldejo01', 'playerName': 'Jonah Bolden'},
    {'playerId': 'richajo01', 'playerName': 'Josh Richardson'},
    {'playerId': 'oquinky01', 'playerName': "Kyle O'Quinn"},
    {'playerId': 'thybuma01', 'playerName': 'Matisse Thybulle'},
    {'playerId': 'scottmi01','playerName': 'Mike Scott'},
    {'playerId': 'pelleno01', 'playerName': 'Norvel Pelle'},
    {'playerId': 'miltosh01', 'playerName': 'Shake Milton'},
    {'playerId': 'harrito02', 'playerName': 'Tobias Harris'},
    {'playerId': 'burketr01', 'playerName': 'Trey Burke'},
    {'playerId': 'smithzh01', 'playerName': 'Zhaire Smith'},
    ]

    render() {
        const options = this.players.map(player => {
            return <option value={player.playerId} key={player.playerId}>{player.playerName}</option>
        })

        return <section className="container">
                <div className="dropdown">
                    <select id="playerSelect" className="dropdown-select" onChange={() => this.props.selectorOnChange()}>
                        {options}
                    </select>
                </div>
        </section>
    }
}

export default PlayerSelector