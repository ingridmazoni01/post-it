var listaNotas = {
    secao: document.getElementsByClassName("notes")[0],
    listaInterna: [],
    adiciona: (novoTitulo, novoTexto) => {
        var nota = {
            titulo: novoTitulo,
            texto: novoTexto,
            editando: false
        };
        this.listaInterna.push(nota);
        // atualizarSecao(this.secao);
    },
    remove: (posicao) => {
        this.listaInterna.splice(posicao, 1);
        atualizarSecao(this.secao);
    },
    edita: (posicao) => {
        this.listaInterna[posicao].editando = true;
        atualizarSecao(this.secao);
    },
    salva:(posicao, novoTitulo, novoTexto) => {
        this.listaInterna[posicao].titulo = novoTitulo;
        this.listaInterna[posicao].texto = novoTexto;
        this.listaInterna[posicao].editando = false;
        atualizarSecao(this.secao);
    },
    pega: function(posicao) {
        return this.listaInterna[posicao];
    },
    contaTotal: function() {
        return this.listaInterna.length;
    }
};

export default listaNotas;

function atualizarSecao(secao) {
    var conteudoSecao = "";

    for (var posicao = 0; posicao < listaNotas.contaTotal(); posicao++) {
        if (listaNotas.pega(posicao).editando) {
            conteudoSecao += `<form class="note">
                                <input class="note__title" type="text" name="titulo" value="${listaNotas.listaInterna[posicao].titulo}" placeholder="Título">
                                <textarea class="note__body" name="texto" rows="5" placeholder="Criar uma nota..."> ${listaNotas.listaInterna[posicao].texto} </textarea>
                                <button class="note__control" type="button" onclick="adicionarNota(this.form.titulo, this.form.texto, this.form, ${posicao} )">
                                    Concluído
                                </button>
                             </form>`;
        } else {
            conteudoSecao += `<form class="note" onclick="editaFormulario(${posicao})">
                                <button class="note__control" type="button" onclick="removerNota(event,${posicao})">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                </button>
                                <h1 class="note__title">${listaNotas.listaInterna[posicao].titulo} </h1>
                                <p class="note__body"> ${listaNotas.listaInterna[posicao].texto} </p>
                             </form>`;
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