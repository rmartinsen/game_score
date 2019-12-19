import json
from botocore.vendored import requests
import re

def lambda_handler(event, context):
    player_id = event['queryStringParameters']['playerId']
    if not is_valid_player_id(player_id):
        return {
            'statusCode': 404,
            'body': 'No player found with given ID'
        }
    url = f'https://www.basketball-reference.com/players/{player_id[0]}/{player_id}/gamelog/2020'
    req = requests.get(url)

    game_logs = re.findall('<tr id="pgl_basic.(.*?)</tr>', req.text)
    return {
        'statusCode': 200,
        'body': json.dumps([parse_game_log(game) for game in game_logs])
    }
    
def is_valid_player_id(player_id):
    return bool(re.match('[a-z]{1,7}[0-9]{2}', player_id))

def calculate_game_score(stats):
    raw_score = (stats['pts'] + 0.4 * stats['fg'] - 0.7 * stats['fga'] - 0.4*(stats['fta'] - stats['ft']) + 0.7 * stats['orb'] + 
                 0.3 * stats['drb'] + stats['stl'] + 0.7 * stats['ast'] + 0.7 * stats['blk'] - 0.4 * stats['pf'] - stats['tov'])
    return round(raw_score, 2)

def parse_game_log(game_log):
    stats = {
        'gameDate': re.findall('data-stat="date_game" ><a href(.*?)>(.*?)</a>', game_log)[0][1],
        'pts': stat_from_game_log('pts', game_log),
        'fg': stat_from_game_log('fg', game_log),
        'fga': stat_from_game_log('fga', game_log),
        'ft': stat_from_game_log('ft', game_log),
        'fta': stat_from_game_log('fta', game_log),
        'orb': stat_from_game_log('orb', game_log),
        'drb': stat_from_game_log('drb', game_log),
        'stl': stat_from_game_log('stl', game_log),
        'ast': stat_from_game_log('ast', game_log),        
        'blk': stat_from_game_log('blk', game_log),        
        'tov': stat_from_game_log('tov', game_log),        
        'pf': stat_from_game_log('pf', game_log),
        }
    
    stats['gameScore'] = calculate_game_score(stats)
    
    return stats
    
    
def stat_from_game_log(stat, game_log):
    return int(re.findall(f'data-stat=\"{stat}\" >(.*?)</td>', game_log)[0])