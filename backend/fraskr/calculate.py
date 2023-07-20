import functools

from flask import (
    Blueprint, request, jsonify, abort
)

from fraskr.db import get_db

bp = Blueprint('calculate', __name__, url_prefix='/calc')
@bp.route('calc', methods=['POST'])
def calc():
    num1 = request.form["num1"]
    num2 = request.form["num2"]
    operant = request.form["ope"]
    result = None

    try:
        if operant == '+':
            result = num1 + num2
        elif operant == '-':
            result = num1 - num2
        elif operant == '*':
            result = num1 * num2
        elif operant == '/':
            result = num1 / num2
        return jsonify({"result": result})
    except:
        abort(400)