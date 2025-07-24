from flask import Flask, request, render_template, jsonify
import os
import psycopg2

app = Flask(__name__)
DB_URL = os.environ['DATABASE_URL']

def get_connection():
    return psycopg2.connect(DB_URL)

# Crear tabla en Supabase si no existe
def init_db():
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute('''
            CREATE TABLE IF NOT EXISTS respuestas (
                id SERIAL PRIMARY KEY,
                nombreReal TEXT,
                nombreAmistoso TEXT,
                citaFavorita TEXT,
                motivoCita TEXT,
                colorFavorito TEXT,
                alabanzaFavorita TEXT,
                milagroFavorito TEXT,
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print("Error al inicializar la base de datos:", e)

init_db()

@app.route('/')
@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute('''
            INSERT INTO respuestas (
                nombreReal, nombreAmistoso, citaFavorita, motivoCita,
                colorFavorito, alabanzaFavorita, milagroFavorito
            ) VALUES (%s, %s, %s, %s, %s, %s, %s)
        ''', (
            data['nombreReal'],
            data['nombreAmistoso'],
            data['citaFavorita'],
            data['motivoCita'],
            data['colorFavorito'],
            data['alabanzaFavorita'],
            data['milagroFavorito']
        ))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/respuestas')
def ver_respuestas():
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM respuestas ORDER BY fecha DESC')
        datos = cur.fetchall()
        cur.close()
        conn.close()
        return render_template('respuestas.html', respuestas=datos)
    except Exception as e:
        return f"Error al obtener respuestas: {e}"

if __name__ == '__main__':
    app.run(debug=True)
