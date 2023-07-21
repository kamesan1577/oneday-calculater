import datetime
from flask import Blueprint, request, jsonify, abort

from .db import get_db

calculate_blueprint = Blueprint('calc', __name__)

@calculate_blueprint.route('/calc', methods=['POST'])
def calc():
    json = request.get_json()
    cookie_id = json['cookie_id']
    num1 = json['num1']
    num2 = json['num2']
    operant = json['ope']
    result = None
    print(num1, num2, operant)
    dt_now = datetime.datetime.now()
    
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
            "INSERT INTO history(cookie_id, num1, num2, operant, result, time_stamp)"
            " VALUES (?, ?, ?, ?, ?, ?)",
            (cookie_id, num1, num2, operant, result, dt_now),
        )
        db.commit()
        return jsonify({"result": result})
    except ZeroDivisionError:
        return jsonify({"result": "ZeroDivisionError"})
    except:
        return abort(400)
