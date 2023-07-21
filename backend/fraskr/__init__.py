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
        return "Hello, kamesans!"

    from . import db
    db.init_app(app)

    # 計算機能
    from .calculate import calculate_blueprint
    app.register_blueprint(calculate_blueprint)

    # 履歴機能
    from .history import history_blueprint
    app.register_blueprint(history_blueprint)

    return app
