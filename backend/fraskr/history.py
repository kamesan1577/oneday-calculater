from flask import(
    Blueprint, request, abort
)

history_blueprint = Blueprint('history', __name__)

@history_blueprint.route('/history', methods=['POST'])
def history():
    pass