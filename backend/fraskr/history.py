from flask import(
    Blueprint, request, abort
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
    history_json["cookie_id"] = id
    for cookie_id, num1, num2, operant, result, time_stamp in history_list:
        pass