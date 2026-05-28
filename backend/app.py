from flask import Flask, jsonify
from flask_cors import CORS
from routes.excursiones import excursiones_bp
from routes.auth import auth_bp
from routes.reviews import reviews_bp
from db import initialize_database

app = Flask(__name__)
CORS(app)

app.register_blueprint(excursiones_bp, url_prefix='/api/excursiones')
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(reviews_bp, url_prefix='/api/reviews')

@app.route('/')
def home():
    return jsonify({
        'message': 'Bizkaibide backend API está activa',
        'routes': ['/api/excursiones', '/api/auth', '/api/reviews']
    })

if __name__ == '__main__':
    initialize_database()
    app.run(host='0.0.0.0', port=4000, debug=True)
