from flask import(
    Blueprint, request, jsonify
)

from .db import get_db

history_blueprint = Blueprint('history', __name__)

@history_blueprint.route('/history', methods=['POST'])
def history():
    json = request.get_json()
    id = json.get('cookie_id')
    db = get_db()
    history_list = db.execute(
        'SELECT * FROM history WHERE cookie_id = id ORDER BY rowid DESC LIMIT 10'
        ' VALUES(?)',
        (id).fetchall()
    )

    history_json = {}
    temp_list = []
    history_json["cookie_id"] = id
    for _cookie_id, num1, num2, operant, result, time_stamp in history_list:
        temp_list.append({
            "num1": num1,
            "nume2": num2,
            "operant": operant,
            "result": result,
            "time_stamp": time_stamp
        })
    history_json["results"] = temp_list
    
    return jsonify(history_json)