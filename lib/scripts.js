"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var listaNotas = {
    secao: document.getElementsByClassName("notes")[0],
    listaInterna: [],
    adiciona: function adiciona(novoTitulo, novoTexto) {
        var nota = {
            titulo: novoTitulo,
            texto: novoTexto,
            editando: false
        };
        undefined.listaInterna.push(nota);
        // atualizarSecao(this.secao);
    },
    remove: function remove(posicao) {
        this.listaInterna.splice(posicao, 1);
        atualizarSecao(this.secao);
    },
    edita: function edita(posicao) {
        this.listaInterna[posicao].editando = true;
        atualizarSecao(this.secao);
    },
    salva: function salva(posicao, novoTitulo, novoTexto) {
        this.listaInterna[posicao].titulo = novoTitulo;
        this.listaInterna[posicao].texto = novoTexto;
        this.listaInterna[posicao].editando = false;
        atualizarSecao(this.secao);
    },
    pega: function pega(posicao) {
        return this.listaInterna[posicao];
    },
    contaTotal: function contaTotal() {
        return this.listaInterna.length;
    }
};

exports.default = listaNotas;


function atualizarSecao(secao) {
    var conteudoSecao = "";

    for (var posicao = 0; posicao < listaNotas.contaTotal(); posicao++) {
        if (listaNotas.pega(posicao).editando) {
            conteudoSecao += "<form class=\"note\">\n                                <input class=\"note__title\" type=\"text\" name=\"titulo\" value=\"" + listaNotas.listaInterna[posicao].titulo + "\" placeholder=\"T\xEDtulo\">\n                                <textarea class=\"note__body\" name=\"texto\" rows=\"5\" placeholder=\"Criar uma nota...\"> " + listaNotas.listaInterna[posicao].texto + " </textarea>\n                                <button class=\"note__control\" type=\"button\" onclick=\"adicionarNota(this.form.titulo, this.form.texto, this.form, " + posicao + " )\">\n                                    Conclu\xEDdo\n                                </button>\n                             </form>";
        } else {
            conteudoSecao += "<form class=\"note\" onclick=\"editaFormulario(" + posicao + ")\">\n                                <button class=\"note__control\" type=\"button\" onclick=\"removerNota(event," + posicao + ")\">\n                                    <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n                                </button>\n                                <h1 class=\"note__title\">" + listaNotas.listaInterna[posicao].titulo + " </h1>\n                                <p class=\"note__body\"> " + listaNotas.listaInterna[posicao].texto + " </p>\n                             </form>";
        }
    }

    secao.innerHTML = conteudoSecao;
}

function editaFormulario(posicao) {
    listaNotas.edita(posicao);
}

function adicionarNota(inputTitulo, textareaTexto, formulario, posicao) {
    if (listaNotas.pega(posicao)) {
        listaNotas.salva(posicao, inputTitulo.value, textareaTexto.value);
    } else {
        listaNotas.adiciona(inputTitulo.value, textareaTexto.value);
        formulario.reset();
    }
}

function removerNota(evento, posicao) {
    evento.stopPropagation();
    listaNotas.remove(posicao);
}