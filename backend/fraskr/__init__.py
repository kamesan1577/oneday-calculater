import os

from flask import Flask, request, jsonify, abort
from flask_cors import CORS


def create_app(test_config=None):
    # アプリの設定を作成
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY="dev",
        DATABASE=os.path.join(app.instance_path, "flaskr.sqlite"),
    )
    cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    if test_config is None:
        # インスタンスコンフィグが存在し、テストでなければインスタンスのコンフィグを読み込み
        app.config.from_pyfile("config.py", silent=True)
    else:
        # テスト時、テストコンフィグを読み込み
        app.config.from_pyfile(test_config)

    # インスタンスのフォルダーが存在することを担保
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # 「Hello, kamesan!」とかえすだけ
    @app.route("/hello")
    def hello():
        return "Hello, kamesan!"

    # 計算処理
    @app.route("/calc", methods=["POST"])
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

    from . import db

    db.init_app(app)

    from . import calculate

    app.register_blueprint(calculate.bp)

    return app
