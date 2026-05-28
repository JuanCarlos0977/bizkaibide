import json
from flask import Blueprint, request, jsonify
from db import get_db_connection

excursiones_bp = Blueprint('excursiones', __name__)


def format_excursion(excursion_row):
    excursion = dict(excursion_row)
    excursion['imagenes'] = json.loads(excursion['imagenes']) if excursion['imagenes'] else []
    return excursion


@excursiones_bp.route('/', methods=['GET'])
def listar_excursiones():
    conn = get_db_connection()
    excursions = conn.execute('SELECT * FROM excursiones').fetchall()
    conn.close()
    return jsonify([format_excursion(exc) for exc in excursions])


@excursiones_bp.route('/<int:excursion_id>', methods=['GET'])
def obtener_excursion(excursion_id):
    conn = get_db_connection()
    excursion = conn.execute('SELECT * FROM excursiones WHERE id = ?', (excursion_id,)).fetchone()
    conn.close()
    if not excursion:
        return jsonify({'error': 'Excursión no encontrada'}), 404
    return jsonify(format_excursion(excursion))


@excursiones_bp.route('/', methods=['POST'])
def crear_excursion():
    data = request.get_json() or {}
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        '''
        INSERT INTO excursiones (titulo, descripcion, imagenes, categoria, dificultad, distancia, tiempo_estimado, desnivel, transporte_recomendado, latitud, longitud)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''',
        (
            data.get('titulo'),
            data.get('descripcion', ''),
            json.dumps(data.get('imagenes', [])),
            data.get('categoria', ''),
            data.get('dificultad', ''),
            data.get('distancia', None),
            data.get('tiempo_estimado', ''),
            data.get('desnivel', None),
            data.get('transporte_recomendado', ''),
            data.get('latitud', None),
            data.get('longitud', None)
        )
    )
    conn.commit()
    excursion_id = cursor.lastrowid
    excursion = conn.execute('SELECT * FROM excursiones WHERE id = ?', (excursion_id,)).fetchone()
    conn.close()
    return jsonify(format_excursion(excursion)), 201


@excursiones_bp.route('/<int:excursion_id>', methods=['PUT'])
def actualizar_excursion(excursion_id):
    data = request.get_json() or {}
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        '''
        UPDATE excursiones SET titulo = ?, descripcion = ?, imagenes = ?, categoria = ?, dificultad = ?, distancia = ?, tiempo_estimado = ?, desnivel = ?, transporte_recomendado = ?, latitud = ?, longitud = ?
        WHERE id = ?
        ''',
        (
            data.get('titulo'),
            data.get('descripcion', ''),
            json.dumps(data.get('imagenes', [])),
            data.get('categoria', ''),
            data.get('dificultad', ''),
            data.get('distancia', None),
            data.get('tiempo_estimado', ''),
            data.get('desnivel', None),
            data.get('transporte_recomendado', ''),
            data.get('latitud', None),
            data.get('longitud', None),
            excursion_id
        )
    )
    if cursor.rowcount == 0:
        conn.close()
        return jsonify({'error': 'Excursión no encontrada'}), 404
    conn.commit()
    excursion = conn.execute('SELECT * FROM excursiones WHERE id = ?', (excursion_id,)).fetchone()
    conn.close()
    return jsonify(format_excursion(excursion))


@excursiones_bp.route('/<int:excursion_id>', methods=['DELETE'])
def eliminar_excursion(excursion_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM excursiones WHERE id = ?', (excursion_id,))
    if cursor.rowcount == 0:
        conn.close()
        return jsonify({'error': 'Excursión no encontrada'}), 404
    conn.commit()
    conn.close()
    return '', 204
