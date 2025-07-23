from flask import Flask, request, render_template, jsonify
import sqlite3

app = Flask(__name__)

# Crear base de datos y tabla si no existen
def init_db():
    conn = sqlite3.connect('base_datos.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS respuestas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombreReal TEXT,
        nombreAmistoso TEXT,
        citaFavorita TEXT,
        motivoCita TEXT,
        colorFavorito TEXT,
        alabanzaFavorita TEXT,
        milagroFavorito TEXT
    )''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index.html')
def index_html():
    return render_template('index.html')


@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    try:
        conn = sqlite3.connect('base_datos.db')
        c = conn.cursor()
        c.execute('''INSERT INTO respuestas (
            nombreReal, nombreAmistoso, citaFavorita, motivoCita,
            colorFavorito, alabanzaFavorita, milagroFavorito
        ) VALUES (?, ?, ?, ?, ?, ?, ?)''', (
            data['nombreReal'],
            data['nombreAmistoso'],
            data['citaFavorita'],
            data['motivoCita'],
            data['colorFavorito'],
            data['alabanzaFavorita'],
            data['milagroFavorito']
        ))
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/respuestas')
def ver_respuestas():
    conn = sqlite3.connect('base_datos.db')
    c = conn.cursor()
    c.execute('SELECT * FROM respuestas')
    datos = c.fetchall()
    conn.close()
    return render_template('respuestas.html', respuestas=datos)

if __name__ == '__main__':
    app.run(debug=True)


