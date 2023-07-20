import os

from flask import Flask, request, jsonify, abort


def create_app(test_config=None):
    # アプリの設定を作成
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY="dev",
        DATABASE=os.path.join(app.instance_path, "flaskr.sqlite"),
    )

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

    from . import db
    db.init_app(app)

    from . import calculate
    app.register_blueprint(calculate.bp)

    return app
