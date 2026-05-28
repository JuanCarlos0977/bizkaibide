import bcrypt
from flask import Blueprint, request, jsonify
from db import get_db_connection

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    nombre = data.get('nombre')
    email = data.get('email')
    password = data.get('password')
    rol = data.get('rol', 'usuario')

    if not nombre or not email or not password:
        return jsonify({'error': 'Faltan campos requeridos'}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            'INSERT INTO users (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
            (nombre, email, hashed_password, rol)
        )
        conn.commit()
        user_id = cursor.lastrowid
        user = conn.execute('SELECT id, nombre, email, rol FROM users WHERE id = ?', (user_id,)).fetchone()
        conn.close()
        return jsonify(dict(user)), 201
    except Exception as err:
        conn.close()
        if 'UNIQUE constraint failed' in str(err):
            return jsonify({'error': 'El email ya está registrado'}), 409
        return jsonify({'error': str(err)}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email y contraseña son requeridos'}), 400

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()

    if not user:
        return jsonify({'error': 'Credenciales incorrectas'}), 401

    if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({'error': 'Credenciales incorrectas'}), 401

    return jsonify({
        'id': user['id'],
        'nombre': user['nombre'],
        'email': user['email'],
        'rol': user['rol']
    })


@auth_bp.route('/users', methods=['GET'])
def listar_usuarios():
    conn = get_db_connection()
    users = conn.execute('SELECT id, nombre, email, rol FROM users').fetchall()
    conn.close()
    return jsonify([dict(user) for user in users])
