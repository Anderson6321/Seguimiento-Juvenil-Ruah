class Textoanimado {
    constructor(id, objetivo) {
        this.texto = document.getElementById(id);
        this.objetivo= document.getElementById(objetivo);
        this.letras = this.texto.innerText.split("");

        this.texto.innerText = '';

        let contenido = '';
        this.letras.forEach((letra) => {
            let caracter = letra === ' ' ? '&nbsp;' : letra;
            contenido += `
                <div>
                    <span>${caracter}</span>
                    <span class="Segundo1">${caracter}</span> 
                </div>
            `;
        });
        this.texto.innerHTML = contenido;

        this.objetivo.addEventListener('mouseenter', () => {
            let cuenta = 0;

            const intervalo = setInterval(() => {
                if (cuenta < this.texto.children.length) {
                    this.texto.children[cuenta].classList.add('animacion');
                    cuenta = cuenta + 1;
                } else {
                    clearInterval(intervalo);
                }
            }, 40);
        });

        this.objetivo.addEventListener('mouseleave', () => {
            let cuenta = 0;

            const intervalo = setInterval(() => {
                if (cuenta < this.texto.children.length) {
                    this.texto.children[cuenta].classList.remove('animacion');
                    cuenta = cuenta + 1;
                } else {
                    clearInterval(intervalo);
                }
            }, 40);
        });
    }
}

new Textoanimado('logo', 'logotipo');
