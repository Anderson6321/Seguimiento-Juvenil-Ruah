from flask import Flask, request, render_template, jsonify
from supabase import create_client
from dotenv import load_dotenv
import os

import os
from dotenv import load_dotenv

load_dotenv()
print(os.getenv("PRUEBA"))


# Configuración
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = Flask(__name__)

@app.route('/')
@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    try:
        supabase.table("respuestas").insert({
            "nombreReal": data['nombreReal'],
            "nombreAmistoso": data['nombreAmistoso'],
            "citaFavorita": data['citaFavorita'],
            "motivoCita": data['motivoCita'],
            "colorFavorito": data['colorFavorito'],
            "alabanzaFavorita": data['alabanzaFavorita'],
            "milagroFavorito": data['milagroFavorito']
        }).execute()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/respuestas')
def ver_respuestas():
    try:
        respuesta = supabase.table("respuestas").select("*").order("fecha", desc=True).execute()
        datos = respuesta.data
        return render_template('respuestas.html', respuestas=datos)
    except Exception as e:
        return f"Error al obtener respuestas: {e}"

if __name__ == '__main__':
    app.run(debug=True)
