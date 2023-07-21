import datetime
from flask import (
    Blueprint, request, jsonify, abort
)

from .db import get_db

calculate_blueprint = Blueprint('calc', __name__)
dt_now =datetime.datetime.now()

@calculate_blueprint.route("/calc", methods=["POST"])
def calc():
    json = request.get_json()
    cookie_id = json.get("cookie_id")
    num1 = json["num1"]
    num2 = json["num2"]
    operant = json["ope"]
    timestamp = dt_now
    result = None
    print(num1, num2, operant)
    
    try:
        if operant == "+":
            result = num1 + num2
        elif operant == "-":
            result = num1 - num2
        elif operant == "*":
            result = num1 * num2
        elif operant == "/":
            result = num1 / num2

        db = get_db()
        db.execute(
            'INSERT INTO history(cookie_id, num1, num2, operant, result, time_stamp)'
            ' VALUES (?, ?, ?, ?, ?, ?)',
            (cookie_id, num1, num2, operant, result, dt_now)
        )
        db.commit()
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"result": "400",
                        "error": e})