// Charla con Jesús – versión enriquecida (v5)
let nombreReal = "";
let nombreAmistoso = "";
let citaFavorita = "";
let motivoCita = "";
let colorFavorito = "";
let alabanzaFavorita = ""; // NUEVA VARIABLE
let milagroFavorito = ""; // NUEVA VARIABLE
let paso = 0;

const citasBien = [
  "Estén siempre alegres, oren sin cesar y den gracias a Dios en toda situación. – 1 Tesalonicenses 5:16-18",
  "El Señor te bendiga y te guarde; el Señor haga resplandecer su rostro sobre ti. – Números 6:24-25",
  "El gozo del Señor es mi fortaleza. – Nehemías 8:10"
];

const citasMal = [
  "Ven a mí cuando estés cansado y cargado... yo te daré descanso. – Mateo 11:28",
  "Aunque pases por el valle más oscuro, no temas; yo estoy contigo. – Salmo 23:4",
  "No tengas miedo, porque yo estoy contigo. – Isaías 41:10",
  "Estoy cerca de los que tienen el corazón herido. – Salmo 34:18"
];

// Array de diálogos con las nuevas frases añadidas
const dialogos = [
  "Te he estado esperando desde hace tanto tiempo... Qué alegría tenerte aquí.", // 0
  "Desde antes de que nacieras, ya te conocía. Pero hoy quiero que seas tú quien me hable. Cuéntame sobre ti.", // 1
  "¿Cómo te llamas, alma querida?", // 2
  "Ya sabía que te llamas {nombreReal}... pero escucharlo de tus labios me llena de gozo. Gracias por confiar en mí.", // 3
  "¿Cómo te llaman tus amigos? Me encantaría que me consideraras uno de ellos.", // 4
  "Gracias por compartirlo, {nombreAmistoso}. Para mí, ese nombre es especial, porque es el que usan las personas que te aman.", // 5
  "Y quiero que sepas que, más allá de cualquier nombre, para mí tu verdadera identidad es 'Amado/a'.", // 6
  "Y dime, ¿cómo te has sentido últimamente? Estoy aquí para ti, pase lo que pase.", // 7
  "Recuerda que cada emoción, sea de alegría o tristeza, es importante para mí. No tienes que esconder nada conmigo.", // 8
  "Mi mayor deseo es caminar a tu lado todos los días, en los soleados y en los de tormenta. Nunca estás solo/a en tu sentir.", // 9
  "¿Conoces mi Palabra, ese mensaje de amor eterno que he dejado para ti?", // 10
  "Gracias por compartir esa cita. ¿Qué fue lo que te tocó de ella?", // 11
  // --- INICIO DE NUEVOS DIÁLOGOS DESPUÉS DEL CASE 11 ---
  "Es hermoso ver cómo mi Palabra encuentra un hogar en tu corazón. Cada letra fue escrita pensando en ti.", // 12
  "Conserva esas palabras como un tesoro. En ellas siempre encontrarás una luz para tu camino y una respuesta a tus anhelos.", // 13
  // --- FIN DE NUEVOS DIÁLOGOS ---
  "¿Cuál es tu color favorito, ese que te transmite paz o alegría?", // 14
  "¡Qué color tan hermoso, {nombreAmistoso}! Cuando pinté los atardeceres, las flores y las galaxias, usé colores así de bellos, capaces de traer alegría al mundo.", // 15
  "Gracias por abrir tu corazón, {nombreAmistoso}. Cada palabra tuya es un regalo para mí.", // 16
  "Recuerda: no estás solo. Formas parte de una familia que te ama tal como eres.", // 17
  "Donde dos o tres se reúnen en mi nombre, allí estoy yo en medio de ellos. – Mateo 18:20", // 18
  "Yo estoy contigo. Siempre. Nunca lo olvides.", // 19
  "Me encanta escucharte. Cuéntame ahora: ¿Qué sueños tienes en tu corazón?", // 20
  "Es un sueño hermoso. Lo guardaré en mi corazón y caminaré contigo para que puedas alcanzarlo.", // 21
  "Recibo tu petición con todo mi amor. Confía en mi tiempo y en mi voluntad, que siempre busca tu mayor bien.", // 22
  "¿Hay algo que te preocupe o te quite la paz en este momento?", // 23
  "Deja tus preocupaciones en mis manos. No te inquietes por nada, y mi paz, que va más allá de lo que puedes entender, cuidará tu corazón.", // 24
  "Recuerda siempre que mis planes para ti son de bienestar, para darte un futuro lleno de esperanza.", // 25
  // --- INICIO DE NUEVOS DIÁLOGOS (ALABANZA) ---
  "La música es una oración que eleva el alma. Dime, {nombreAmistoso}, ¿qué alabanza te gusta cantar o escuchar cuando quieres sentirte cerca de mí?", // 26
  "¡Qué hermosa elección! Esa alabanza también alegra mi corazón. La música es un puente maravilloso entre el Cielo y la Tierra.", // 27
  "Cada vez que la escuches, recuerda que Yo estoy ahí contigo, cantando a tu lado. Que su melodía te recuerde siempre mi amor incondicional.", // 28
  // --- FIN DE NUEVOS DIÁLOGOS (ALABANZA) ---
  // --- INICIO DE NUEVOS DIÁLOGOS (MILAGRO) ---
  "Mi paso por la Tierra estuvo lleno de señales de amor y poder. De todos los milagros que están escritos en las Escrituras, ¿Cuál es tu favorito, {nombreAmistoso}?", // 29
  "Ese milagro fue una muestra de que para Mi Padre nada es imposible. Me alegra que lo guardes en tu corazón.", // 30
  "Recuerda que el mismo poder que obró ese milagro está disponible para ti hoy. Cree, confía, y verás la gloria de Dios en tu vida.", // 31
  // --- FIN DE NUEVOS DIÁLOGOS (MILAGRO) ---
  "Ahora, con el corazón en calma, piensa en todo lo bueno que te rodea. Un corazón agradecido siempre encontrará la alegría." // 32
];

const dialogoEl = document.getElementById('dialogo');
const opcionesEl = document.getElementById('opciones');

function limpiarOpciones() {
  opcionesEl.innerHTML = '';
}

function btnSiguiente() {
  paso++;
  mostrarMensaje();
}

function crearBoton(texto, accion) {
  const btn = document.createElement('button');
  btn.textContent = texto;
  btn.onclick = () => {
    limpiarOpciones();
    accion();
  };
  opcionesEl.appendChild(btn);
}

function crearInput(placeholder, id, callback) {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = placeholder;
  input.id = id;
  input.autocomplete = 'off';
  opcionesEl.appendChild(input);

  const btn = document.createElement('button');
  btn.textContent = 'Enviar';
  btn.onclick = () => {
    const val = input.value.trim();
    if (!val) return;
    callback(val);
    input.value = '';
  };
  opcionesEl.appendChild(btn);

  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      btn.click();
    }
  });
}

function mostrarMensaje() {
  limpiarOpciones();

  switch (paso) {
    case 0:
    case 1:
    case 3:
      dialogoEl.textContent = dialogos[paso].replace('{nombreReal}', nombreReal);
      crearBoton('Siguiente', btnSiguiente);
      break;

    case 2:
      dialogoEl.textContent = dialogos[paso];
      crearInput('Tu nombre', 'nombreReal', val => {
        nombreReal = val;
        paso++;
        mostrarMensaje();
      });
      break;

    case 4:
      dialogoEl.textContent = dialogos[paso].replace('{nombreReal}', nombreReal);
      crearInput('Tu apodo', 'nombreAmistoso', val => {
        nombreAmistoso = val;
        paso++;
        mostrarMensaje();
      });
      break;

    case 5:
    case 6:
      dialogoEl.textContent = dialogos[paso].replace('{nombreAmistoso}', nombreAmistoso);
      crearBoton('Siguiente', btnSiguiente);
      break;

    case 7:
      dialogoEl.textContent = dialogos[paso].replace('{nombreAmistoso}', nombreAmistoso);
      crearBoton('He estado bien', () => {
        const cita = citasBien[Math.floor(Math.random() * citasBien.length)];
        dialogoEl.textContent = `Me alegra mucho saberlo, ${nombreAmistoso}. Recuerda: ${cita}`;
        paso = 8;
        crearBoton('Siguiente', mostrarMensaje);
      });
      crearBoton('He estado mal', () => {
        const cita = citasMal[Math.floor(Math.random() * citasMal.length)];
        dialogoEl.textContent = `Siento que estés pasando por un momento difícil, ${nombreAmistoso}. Recuerda que estoy contigo. ${cita}`;
        paso = 8;
        crearBoton('Siguiente', mostrarMensaje);
      });
      break;

    case 8:
    case 9:
    case 12:
    case 13:
      dialogoEl.textContent = dialogos[paso].replace('{nombreAmistoso}', nombreAmistoso);
      crearBoton('Siguiente', btnSiguiente);
      break;

    case 10:
      dialogoEl.textContent = dialogos[paso];
      crearBoton('Sí', () => {
        dialogoEl.textContent = '¡Qué alegría! ¿Cuál es tu cita bíblica favorita?';
        crearInput('Tu cita favorita', 'citaFavorita', val => {
          citaFavorita = val;
          paso++;
          mostrarMensaje();
        });
      });
      crearBoton('No', () => {
        dialogoEl.textContent = 'Está bien. Te invito a explorar mi Palabra. Cuando encuentres una cita que toque tu corazón, compártela conmigo.';
        crearInput('Escribe aquí la cita que encontraste', 'citaFavorita', val => {
          citaFavorita = val;
          paso++;
          mostrarMensaje();
        });
      });
      break;

    case 11:
      dialogoEl.textContent = dialogos[paso];
      crearInput('Escribe el motivo', 'motivoCita', val => {
        motivoCita = val;
        paso++;
        mostrarMensaje();
      });
      break;

    case 14:
      dialogoEl.textContent = dialogos[paso];
      crearInput('Tu color favorito', 'colorFavorito', val => {
        colorFavorito = val;
        paso++;
        mostrarMensaje();
      });
      break;

    case 15:
      dialogoEl.textContent = dialogos[paso]
        .replace('{nombreAmistoso}', nombreAmistoso)
        .replace('{colorFavorito}', colorFavorito);
      crearBoton('Siguiente', btnSiguiente);
      break;

    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 22:
      dialogoEl.textContent = dialogos[paso].replace('{nombreAmistoso}', nombreAmistoso);
      crearBoton('Siguiente', btnSiguiente);
      break;

    case 21:
      dialogoEl.textContent = dialogos[paso];
      crearBoton('Gracias, Jesús', () => {
        paso = 26;
        mostrarMensaje();
      });
      break;

    case 23:
      dialogoEl.textContent = dialogos[paso];
      crearInput('Lo que te preocupa...', 'preocupacion', val => {
        paso++;
        mostrarMensaje();
      });
      break;

    case 24:
    case 25:
      dialogoEl.textContent = dialogos[paso];
      crearBoton('Siguiente', btnSiguiente);
      break;

    case 26:
      dialogoEl.textContent = dialogos[paso].replace('{nombreAmistoso}', nombreAmistoso);
      crearInput('Escribe tu alabanza favorita', 'alabanza', val => {
        alabanzaFavorita = val;
        paso++;
        mostrarMensaje();
      });
      break;

    case 27:
    case 28:
      dialogoEl.textContent = dialogos[paso];
      crearBoton('Siguiente', btnSiguiente);
      break;

    case 29:
      dialogoEl.textContent = dialogos[paso].replace('{nombreAmistoso}', nombreAmistoso);
      crearInput('Escribe tu milagro favorito', 'milagro', val => {
        milagroFavorito = val;
        paso++;
        mostrarMensaje();
      });
      break;

    case 30:
    case 31:
      dialogoEl.textContent = dialogos[paso];
      crearBoton('Siguiente', btnSiguiente);
      break;

    case 32:
      dialogoEl.textContent = dialogos[paso];
      crearBoton('Siguiente', btnSiguiente);
      break;


    default:
      dialogoEl.textContent = 'Gracias por este tiempo juntos. Recuerda que mi amor por ti es infinito y siempre estoy a tu lado. Que mi paz te acompañe. ✨';
      const final = document.getElementById('final');
      final.innerHTML = '';
      const botonAmen = document.createElement('button');
      botonAmen.textContent = 'Amén';
      botonAmen.onclick = () => {
        enviarDatosAlServidor()
          .then(() => {
            // Redirige al índice
            window.location.href = '/index.html';
          })
          .catch(err => {
            console.error(err);
            alert('Hubo un problema al guardar: ' + err.message);
          });
      };
      final.appendChild(botonAmen);
      break;
  }
}

// Función que retorna la promesa del fetch
function enviarDatosAlServidor() {
  const payload = { nombreReal, nombreAmistoso, citaFavorita, motivoCita, colorFavorito, alabanzaFavorita, milagroFavorito };
  return fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(json => {
    if (!json.success) throw new Error(json.error);
    return json;
  });
}

document.addEventListener('DOMContentLoaded', mostrarMensaje);
