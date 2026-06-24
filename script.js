const perguntas = [
{
q:"Quando a gente se viu pela primeira vez?",
a:["No shopping","Na Nerdest","Na rua"],
c:1
},
{
q:"Qual sua comida preferida?",
a:["Coxinha","Sushi","Café"],
c:1
},
{
q:"Qual é o magnifico nome do meu contra-baixo e do seu violão?",
a:[
"Pretinha e Red Label",
"Crimson Bass e Pretinha",
"Baixo Sangue de Vampiro e Violão",
"Contra-Baixo das Trevas Vermelhas e Viola"
],
c:1
},
{
q:'Quais das alternativas está o significado correto do termo aliginês "Zib Zub Zab"?',
a:["Busquem conhecimento","Eu te amo","Somos de outra galaxia","Eu gosto de você"],
c:1
},
{
q:"Qual dos dias abaixo é o Dia Mundial do Esguicho?",
a:[
"Dia 20 de Junho de 2026",
"Dia 18 de Junho de 2026",
"Dia 28 de Maio de 2026",
"Dia 11 de Setembro de 2001"
],
c:0
},
{
q:"Qual dia do meu aniversario?",
a:["27 de Setembro","09 de Dezembro","05 de Março","15 de Fevereiro"],
c:2
},
{
q:"Em que horas foi enviada sua primeira mensagem?",
a:["18:14","15:49","20:11","09:34"],
c:0
},
{
q:"Qual melhor filme da Ghibli?",
a:["Ponyo","Castelo Animado","Suzume","A viagem de Chihiro"],
c:0
}
];

let atual = 0;
let pontos = 0;

function abrirModal(){
document.getElementById("modal").style.display="flex";
}

function iniciarJogo(){
document.getElementById("modal").style.display="none";
document.getElementById("home").classList.add("hidden");
document.getElementById("game").classList.remove("hidden");
mostrarPergunta();
}

function mostrarPergunta(){

if(atual >= perguntas.length){
perguntaFinal();
return;
}

const p = perguntas[atual];

document.getElementById("progress").innerText =
`Pergunta ${atual+1} de ${perguntas.length+1}`;

document.getElementById("question").innerText = p.q;

const answers = document.getElementById("answers");
answers.innerHTML = "";

p.a.forEach((texto,i)=>{

const btn = document.createElement("button");

btn.className = "answer-btn";
btn.innerText = texto;

btn.onclick = ()=>{

if(i===p.c){
pontos++;
}

atual++;
mostrarPergunta();

};

answers.appendChild(btn);

});
}

function perguntaFinal(){

document.getElementById("progress").innerText =
"Pergunta Final 💛";

document.getElementById("question").innerText =
"Você me ama?";

const answers = document.getElementById("answers");
answers.innerHTML = "";

const nao = document.createElement("button");
const sim = document.createElement("button");

nao.className="answer-btn";
sim.className="answer-btn";

nao.innerText="Não";
sim.innerText="Sim";

let estadoNao=0;
let estadoSim=0;

nao.onclick=()=>{

if(estadoNao===0){
nao.innerText="Tem certeza?";
estadoNao++;
return;
}

if(estadoNao===1){
nao.innerText="Sim";
estadoNao++;
return;
}

mostrarResultado();
};

sim.onclick=()=>{

estadoSim++;

if(estadoSim===1){
sim.style.transform="translateX(40px)";
return;
}

if(estadoSim===2){
sim.style.transform="translateX(-40px)";
return;
}

if(estadoSim===3){
sim.innerText="MUITO 💛";
return;
}

mostrarResultado();
};

answers.appendChild(nao);
answers.appendChild(sim);
}

function mostrarResultado(){

document.getElementById("game").classList.add("hidden");
document.getElementById("result").classList.remove("hidden");

const counter = document.getElementById("counter");
const text = document.getElementById("resultText");

if(pontos===0){

counter.innerText="0%";
text.innerText="Você não me ama😭";
return;

}

if(pontos<8){

let n=0;

const timer=setInterval(()=>{

n+=5;
counter.innerText=n+"%";

if(n>=100){
clearInterval(timer);
text.innerText="Você me ama muitoo🥰";
}

},25);

return;
}

let n=0;

const timer=setInterval(()=>{

n+=40;
counter.innerText=n+"%";

if(n>=1200){

clearInterval(timer);

counter.classList.add("explode");

text.innerHTML=
"ERRO DE SISTEMA 💖<br><br>Você me ama mais do que o sistema consegue medir 🥰";

}

},20);

}
