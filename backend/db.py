import os
import sqlite3
from pathlib import Path
import bcrypt

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / 'data'
DB_PATH = DATA_DIR / 'database.sqlite'

DATA_DIR.mkdir(parents=True, exist_ok=True)


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def initialize_database():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        '''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            rol TEXT NOT NULL DEFAULT 'usuario'
        )
        '''
    )

    cursor.execute(
        '''
        CREATE TABLE IF NOT EXISTS excursiones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descripcion TEXT,
            imagenes TEXT,
            categoria TEXT,
            dificultad TEXT,
            distancia REAL,
            tiempo_estimado TEXT,
            desnivel INTEGER,
            transporte_recomendado TEXT,
            latitud REAL,
            longitud REAL
        )
        '''
    )

    existing_columns = [row[1] for row in cursor.execute("PRAGMA table_info(excursiones)").fetchall()]
    if 'dificultad' not in existing_columns:
        cursor.execute('ALTER TABLE excursiones ADD COLUMN dificultad TEXT')
    if 'distancia' not in existing_columns:
        cursor.execute('ALTER TABLE excursiones ADD COLUMN distancia REAL')
    if 'desnivel' not in existing_columns:
        cursor.execute('ALTER TABLE excursiones ADD COLUMN desnivel INTEGER')

    cursor.execute(
        '''
        CREATE TABLE IF NOT EXISTS resenas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            excursion_id INTEGER NOT NULL,
            usuario_id INTEGER NOT NULL,
            puntuacion INTEGER NOT NULL CHECK(puntuacion >= 1 AND puntuacion <= 5),
            texto TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(excursion_id) REFERENCES excursiones(id),
            FOREIGN KEY(usuario_id) REFERENCES users(id)
        )
        '''
    )

    cursor.execute('SELECT COUNT(*) FROM users')
    if cursor.fetchone()[0] == 0:
        admin_password = bcrypt.hashpw(b'admin123', bcrypt.gensalt()).decode('utf-8')
        user_password = bcrypt.hashpw(b'usuario123', bcrypt.gensalt()).decode('utf-8')
        cursor.execute(
            'INSERT INTO users (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
            ('Administrador', 'admin@bizkaibide.local', admin_password, 'administrador')
        )
        cursor.execute(
            'INSERT INTO users (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
            ('Usuario', 'usuario@bizkaibide.local', user_password, 'usuario')
        )

    cursor.execute('SELECT COUNT(*) FROM excursiones')
    if cursor.fetchone()[0] == 0:
        sample_excursiones = [
            (
                'Monte Pagasarri y Ganekogorta',
                'La ascensión clásica por excelencia para cualquier bilbaíno. Desde la cima disfrutarás de unas vistas aéreas incomparables de todo Bilbao.',
                '["../img/ganeko.jpeg"]',
                'Montaña',
                'moderada',
                12,
                '4.0h',
                800,
                'Autobús + Caminata',
                43.1310,
                -2.9300
            ),
            (
                'Flysch de Zumaia',
                'Ruta costera por el Geoparque de la costa vasca con vistas espectaculares al mar y formaciones rocosas únicas.',
                '["../img/flysch.jpeg"]',
                'Costa',
                'fácil',
                8,
                '2.5h',
                150,
                'Coche',
                43.3047,
                -2.2369
            ),
            (
                'Bosque de Oma y Santimamiñe',
                'Una mágica fusión de arte y naturaleza en la Reserva de la Biosfera de Urdaibai con árboles pintados y cuevas prehistóricas.',
                '["../img/bosqueOma.jpeg"]',
                'Bosque',
                'fácil-moderada',
                7.5,
                '2.5h',
                200,
                'Coche + Caminata',
                43.2706,
                -2.7896
            ),
            (
                'Urkiola y Cresta del Amboto',
                'Aventura de montaña cruzando el Parque Natural de Urkiola hasta el mítico Amboto, una cresta aérea exigente.',
                '["../img/anboto.jpeg"]',
                'Montaña',
                'alta',
                10,
                '4.5h',
                850,
                'Coche + Caminata',
                43.0742,
                -2.7646
            ),
            (
                'San Juan de Gaztelugatxe',
                'La emblemática ermita medieval sobre un peñón rodeado por el Cantábrico. Un recorrido corto con vistas increíbles.',
                '["../img/Gaztelugatxe.jpeg"]',
                'Costa',
                'fácil',
                3.5,
                '1.5h',
                250,
                'Coche + Caminata',
                43.3910,
                -2.7002
            ),
            (
                'Cañón de Delika y Salto del Nervión',
                'Impresionante ruta hasta el mayor salto de agua de la península en un paisaje kárstico único.',
                '["../img/imagen2.jpeg"]',
                'Cascada',
                'fácil-moderada',
                9,
                '3.0h',
                200,
                'Coche',
                43.0599,
                -2.8723
            ),
            (
                'Monte Gorbea',
                'Ruta icónica hacia la cima más alta de Bizkaia, con vistas panorámicas de la Llanada Alavesa y el Cantábrico.',
                '["../img/gorbea.jpeg"]',
                'Montaña',
                'moderada',
                14,
                '5.0h',
                900,
                'Coche + Caminata',
                42.9878,
                -2.8440
            ),
            (
                'Acantilados de La Galea',
                'Recorrido costero con espectaculares vistas de acantilados y miradores al mar abierto.',
                '["../img/la_galea.png"]',
                'Costa',
                'fácil',
                6,
                '2.0h',
                120,
                'Autobús + Caminata',
                43.2954,
                -2.9665
            )
        ]
        cursor.executemany(
            '''
            INSERT INTO excursiones (titulo, descripcion, imagenes, categoria, dificultad, distancia, tiempo_estimado, desnivel, transporte_recomendado, latitud, longitud)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''',
            sample_excursiones
        )

    conn.commit()
    conn.close()
