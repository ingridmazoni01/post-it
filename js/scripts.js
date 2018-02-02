class Nota{
     constructor(novoTitulo,novoTexto){
        
        titulo: novoTitulo;
        texto: novoTexto;
        editando: false;
    }

    get titulo(){

    }

    get texto(){
        
    }

    get titulo(){
        
    }

    set titulo(tituloAlterado){
        if(tituloAlterado!=null && tituloAlterado.length>5){
            this.titulo=tituloAlterado;
        }
        else{
            alert("Preencha o titulo");
        }
        
    }

     set texto(novoTexto){
        
    }

     set titulo(){
        
    }


}


class Notas  {
    constructor(){
         secao: document.getElementsByClassName("notes")[0];
         listaInterna: [];
       
    }
   

    adiciona(novoTitulo, novoTexto) {
        // var nota = {
        //     titulo: novoTitulo,
        //     texto: novoTexto,
        //     editando: false
        // };

      
        this.listaInterna.push(new Nota(novoTitulo,novoTexto));
        atualizarSecao(this._secao);


    }
    remove (posicao) {
        this.listaInterna.splice(posicao, 1);
        atualizarSecao(this.secao);
    }
    edita(posicao) {
        this.listaInterna[posicao].editando = true;
        atualizarSecao(this.secao);
    }
    salva(posicao, novoTitulo, novoTexto)  {
        this.listaInterna[posicao].titulo = novoTitulo;
        this.listaInterna[posicao].texto = novoTexto;
        this.listaInterna[posicao].editando = false;
        atualizarSecao(this.secao);
    }
    pega(posicao) {
        return this.listaInterna[posicao];
    }
    contaTotal() {
        return this.listaInterna.length;
    }
};

var listaNotas=new Notas();


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


class Pessoa{
    
      
    constructor(nome,sobrenome,peso,altura,idade){
       this.nome=nome;
       this.sobrenome=sobrenome;
       this.peso=peso; 
       this.altura=altura;
       this.idade=idade;
            
    }

    nomeCompleto(){
        console.log(this.nome+" "+this.sobrenome);
    }

    anoNascimento(){
        console.log(new Date().getFullYear()-this.idade);
    }

    calculaImc(){
        console.log(this.peso/Math.pow(this.altura,2));
    }


}

class Medico extends Pessoa{
    constructor(primeiroNome, segundoNome,peso,altura,idade,crm){
        super(primeiroNome, segundoNome,peso,altura,idade);
        this._crm=crm;
        
    }

    get crm(){
        return this._crm;
    }

    set crm(crm){
        this._crm=crm;
    }
}

let mariana=new Medico("Mariana","Muniz",60,1.70,55,"2157486");


let pessoa = new Pessoa("Pedro","Almeida",80,1.65,65,"2158497");

