from flask import Blueprint, request, jsonify
from db import get_db_connection

reviews_bp = Blueprint('reviews', __name__)


@reviews_bp.route('/', methods=['GET'])
def listar_resenas():
    excursion_id = request.args.get('excursionId')
    conn = get_db_connection()
    sql = '''
        SELECT r.id, r.excursion_id, r.usuario_id, r.puntuacion, r.texto, r.created_at, u.nombre as usuario_nombre
        FROM resenas r
        JOIN users u ON r.usuario_id = u.id
    '''
    params = ()
    if excursion_id:
        sql += ' WHERE r.excursion_id = ?'
        params = (excursion_id,)

    reviews = conn.execute(sql, params).fetchall()
    conn.close()
    return jsonify([dict(review) for review in reviews])


@reviews_bp.route('/', methods=['POST'])
def crear_resena():
    data = request.get_json() or {}
    excursion_id = data.get('excursion_id')
    usuario_id = data.get('usuario_id')
    puntuacion = data.get('puntuacion')
    texto = data.get('texto', '')

    if not excursion_id or not usuario_id or not puntuacion:
        return jsonify({'error': 'Faltan datos obligatorios'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO resenas (excursion_id, usuario_id, puntuacion, texto) VALUES (?, ?, ?, ?)',
        (excursion_id, usuario_id, puntuacion, texto)
    )
    conn.commit()
    review_id = cursor.lastrowid
    review = conn.execute('SELECT * FROM resenas WHERE id = ?', (review_id,)).fetchone()
    conn.close()
    return jsonify(dict(review)), 201
