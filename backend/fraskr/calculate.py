from flask import (
    Blueprint, request, jsonify, abort
)

calculate_blueprint = Blueprint('calc', __name__)

@calculate_blueprint.route("/calc", methods=["POST"])
def calc():
    json = request.get_json()
    num1 = json["num1"]
    num2 = json["num2"]
    operant = json["ope"]
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
        return jsonify({"result": result})
    # FIXME ZeroDivisionErrorをキャッチして気の利いたエラーを出す
    except:
        abort(400)