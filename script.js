document.addEventListener("DOMContentLoaded", () => {


/* =====================================
   ELEMENTOS
===================================== */


const telaInicial = document.getElementById(
    "tela-inicial"
);


const telaJardim = document.getElementById(
    "tela-jardim"
);


const telaFinal = document.getElementById(
    "tela-final"
);


const botaoEntrar = document.getElementById(
    "botao-entrar"
);


const musica = document.getElementById(
    "musica-jardim"
);


const jardim = document.getElementById(
    "jardim"
);




/* =====================================
   CONTROLE
===================================== */


let cartasEncontradas = [];


let jardimIniciado = false;





/* =====================================
   DATA DO CONTADOR
===================================== */


const dataInicio = new Date(
    2026,
    3,
    27,
    18,
    14,
    0
);






/* =====================================
   ENTRAR NO JARDIM
===================================== */


if(botaoEntrar){


botaoEntrar.addEventListener(
"click",
()=>{


    telaInicial.classList.remove(
        "ativa"
    );


    telaJardim.classList.add(
        "ativa"
    );


    iniciarMusica();



    if(!jardimIniciado){


        jardimIniciado = true;


        setTimeout(()=>{


            iniciarJardim();


        },300);



    }



});



}







/* =====================================
   MÚSICA
===================================== */


function iniciarMusica(){


    if(!musica)
    return;



    musica.volume = 0.25;



    musica.play()
    .catch(()=>{



    });



}








/* =====================================
   CONTADOR
===================================== */


function atualizarContador(){


const contador =
document.getElementById(
    "contador"
);



if(!contador)
return;



const agora = new Date();


const diferenca =
agora - dataInicio;



if(diferenca < 0)
return;



const segundos =
Math.floor(
    diferenca / 1000
);



const dias =
Math.floor(
    segundos / 86400
);



const horas =
Math.floor(
    (segundos % 86400)
    /
    3600
);



const minutos =
Math.floor(
    (segundos % 3600)
    /
    60
);



const seg =
segundos % 60;




contador.innerHTML =

`${dias} dias, ${horas} horas, ${minutos} minutos e ${seg} segundos`;



}



setInterval(
    atualizarContador,
    1000
);



atualizarContador();







/* =====================================
   INICIAR JARDIM
===================================== */


function iniciarJardim(){



    posicionarFloresEspeciais();

criarPetalasVento();

    criarFloresNormaisComAnimacao();



}

/* =====================================
   CRIAR FLORES NORMAIS
===================================== */


function criarFloresNormaisComAnimacao(){



    const tipos = [


        "🌹",
        "🌷",
        "🌼",
        "🌸",
        "🌺",
        "🪻",
        "🌱",
        "🍀"


    ];



    const quantidade = 60;





    for(
        let i = 0;
        i < quantidade;
        i++
    ){



        setTimeout(()=>{



            const flor =
            document.createElement(
                "div"
            );



            flor.classList.add(
                "flor",
                "normal"
            );



            flor.textContent =
            tipos[
                Math.floor(
                    Math.random()
                    *
                    tipos.length
                )
            ];



            colocarFlorNoJardim(
                flor
            );



        }, i * 45);



    }



}








/* =====================================
   POSICIONAR FLOR NORMAL
===================================== */


function colocarFlorNoJardim(
    flor
){



    if(!jardim)
    return;



    jardim.appendChild(
        flor
    );



    const largura =
    jardim.clientWidth;



    const altura =
    jardim.clientHeight;



    let tentativa = 0;



    let conseguiu = false;





    while(
        !conseguiu &&
        tentativa < 100
    ){



        const x =
        Math.random()
        *
        (largura - 40);



        const y =
        Math.random()
        *
        (altura - 40);




        flor.style.left =
        `${x}px`;



        flor.style.top =
        `${y}px`;





        conseguiu =
        verificarEspaco(
            flor
        );



        tentativa++;



    }



}








/* =====================================
   EVITAR FLORES JUNTAS DEMAIS
===================================== */


function verificarEspaco(
    novaFlor
){



    const flores =
    jardim.querySelectorAll(
        ".flor"
    );



    const nova =
    novaFlor.getBoundingClientRect();





    for(
        let flor of flores
    ){



        if(
            flor === novaFlor
        )
        continue;



        const outra =
        flor.getBoundingClientRect();





        const distanciaX =
        Math.abs(
            nova.left -
            outra.left
        );



        const distanciaY =
        Math.abs(
            nova.top -
            outra.top
        );





        if(
            distanciaX < 40 &&
            distanciaY < 40
        ){



            return false;



        }



    }




    return true;



}









/* =====================================
   FLORES ESPECIAIS
=









/* =====================================
   CLIQUE NAS FLORES ESPECIAIS
===================================== */

function posicionarFloresEspeciais(){


    const flores =
    document.querySelectorAll(
        ".flor.especial"
    );



    const posicoes = [


        [12,15],
        [35,12],
        [65,15],
        [85,25],
        [20,45],
        [50,35],
        [80,45],
        [25,75],
        [55,65],
        [75,80],
        [45,85]


    ];





    flores.forEach(
    (flor,index)=>{


        const pos =
        posicoes[index];



        if(!pos)
        return;




        // esconde antes de posicionar

   flor.style.visibility = "hidden";


flor.style.left =
`${pos[0]}%`;


flor.style.top =
`${pos[1]}%`;



flor.style.transform =
"translate(-50%, -50%)";





       setTimeout(()=>{


    flor.style.visibility =
    "visible";


    flor.classList.add(
        "nascendo"
    );


},2000 + index * 300);



    });



}

const floresEspeciais =
document.querySelectorAll(
    ".flor.especial"
);





floresEspeciais.forEach(
(flor)=>{



    flor.addEventListener(
    "click",
    ()=>{



        const numero =
        Number(
            flor.dataset.carta
        );




        flor.classList.add(
            "abrindo"
        );





        setTimeout(()=>{



            flor.classList.remove(
                "abrindo"
            );



            abrirCarta(
                numero
            );



        },800);



    });



});

/* =====================================
   CARTAS DO JARDIM
===================================== */


const cartas = {



1:{
emoji:"🌷",

titulo:"Seu cabelo",

texto:
"Eu reparo no seu cabelo cacheado e acho ele lindo. Tem uma beleza tão sua, daquelas que deixam você ainda mais especial sem nem precisar fazer esforço."

},




2:{
emoji:"✨",

titulo:"Seus olhos",

texto:
"Os seus olhos são grandes e brilhantes. Às vezes eu só paro para olhar e penso em como eles conseguem mostrar tanta coisa sem você dizer uma palavra."

},




3:{
emoji:"😁",

titulo:"O seu sorriso",

texto:
"O seu sorriso enorme é uma das coisas mais bonitas em você. Quando você sorri de verdade, parece que o resto do dia fica melhor junto."

},




4:{
emoji:"😚",

titulo:"Minha pitucha",

texto:
"Eu acho muito engraçado e fofo você ser tão pitucha. Você é pequenininha, mas ocupa um espaço gigantesco na minha vida. Eu não consigo imaginar minha rotina sem você nela."

},




5:{
emoji:"🤣",

titulo:"Quando você ri de mim",

texto:
"Eu sempre reparo quando você ri das coisas que eu falo. Mesmo quando a piada não é lá essas coisas, sua risada faz eu achar que valeu a pena tentar."

},




6:{
emoji:"🌼",

titulo:"O jeito que você cuida",

texto:
"Eu percebo como você é prestativa: você se importa, presta atenção e tenta ajudar. São coisas pequenas para muita gente, mas eu vejo e admiro muito em você."

},




7:{
emoji:"🎸",

titulo:"Baixo, não guitarra",

texto:
"No começo, você sempre trocava baixo por guitarra e colocava a culpa no corretor. Eu fingia que ficava bravo e explicava que guitarra era som fino e baixo era som grosso.\n\nAté hoje eu acho engraçado lembrar disso, porque foi uma das nossas primeiras brincadeiras e uma das pequenas coisas que fizeram eu gostar ainda mais dos nossos momentos juntos."

},




8:{
emoji:"🌻",

titulo:"A cartinha de girassol",

texto:
"Eu nunca vou esquecer da cartinha de girassol que você fez para mim.\n\nEla é linda, mas o que eu mais amo nela é saber que você separou um tempo e colocou carinho em algo pensando em mim.\n\nÉ uma lembrança simples, mas que significa muito para mim."

},




9:{
emoji:"📞",

titulo:"As nossas calls",

texto:
"Eu gosto muito dos nossos momentos simples, como as calls de vídeo enquanto eu cozinhava e você ia me ensinando tudo o que sabia.\n\nMesmo sendo algo simples, são momentos que eu guardo com carinho."

},




10:{
emoji:"🤪",

titulo:"As minhas piadinhas",

texto:
"Eu sei que às vezes faço uma piadinha e deixo você meio brava.\n\nMas é o meu jeito de brincar com você, de criar momentos bobos e arrancar um sorriso seu."

},




11:{
emoji:"🍃",

titulo:"O nosso caminho",

texto:
"A gente ainda é novo e tem muita coisa para viver.\n\nMas eu quero continuar passando por tudo isso com você, criando novas lembranças e cuidando daquilo que a gente tem."

}



};









/* =====================================
   ELEMENTOS DA CARTA
===================================== */


const modalCarta =
document.getElementById(
    "modal-carta"
);



const tituloCarta =
document.getElementById(
    "titulo-carta"
);

const emojiCarta =
document.getElementById(
    "emoji-carta"
);

const textoCarta =
document.getElementById(
    "texto-carta"
);



const contadorCartas =
document.getElementById(
    "contador-cartas"
);



const fecharCarta =
document.getElementById(
    "fechar-carta"
);










/* =====================================
   ABRIR CARTA
===================================== */


function abrirCarta(numero){



    const carta =
    cartas[numero];



    if(!carta)
    return;





    tituloCarta.textContent =
    carta.titulo;

emojiCarta.textContent =
carta.emoji;


    textoCarta.textContent =
    carta.texto;





    if(
        !cartasEncontradas.includes(
            numero
        )
    ){



        cartasEncontradas.push(
            numero
        );



    }






    contadorCartas.textContent =

    `${cartasEncontradas.length} de 11`;





    modalCarta.classList.add(
        "ativo"
    );



}








/* =====================================
   FECHAR CARTA
===================================== */


if(fecharCarta){



fecharCarta.addEventListener(
"click",
()=>{



    modalCarta.classList.remove(
        "ativo"
    );



    verificarTodasCartas();



});



}






if(modalCarta){



modalCarta.addEventListener(
"click",
(e)=>{



    if(
        e.target === modalCarta
    ){



        modalCarta.classList.remove(
            "ativo"
        );



        verificarTodasCartas();



    }



});



}








/* =====================================
   VERIFICAR 11 CARTAS
===================================== */


function verificarTodasCartas(){



    if(
        cartasEncontradas.length === 11
    ){



        setTimeout(()=>{


            mostrarGirassol();



        },700);



    }



}








/* =====================================
   MOSTRAR GIRASSOL
===================================== */


function mostrarGirassol(){



    const girassol =
    document.getElementById(
        "girassol-final"
    );



    if(!girassol)
    return;




    girassol.classList.add(
        "ativo"
    );

criarParticulasGirassol();

}








/* =====================================
   BOTÃO DA TELA FINAL
===================================== */


const botaoFinal =
document.getElementById(
    "botao-final"
);



if(botaoFinal){



botaoFinal.addEventListener(
"click",
()=>{



    const girassol =
    document.getElementById(
        "girassol-final"
    );



    if(girassol){


        girassol.classList.remove(
            "ativo"
        );


    }





    telaJardim.classList.remove(
        "ativa"
    );



    telaFinal.classList.add(
        "ativa"
    );



});



}




});
/* =====================================
   PÉTALAS VOANDO NO JARDIM
===================================== */


function criarPetalasVento(){


    const jardim =
document.querySelector(
    "#jardim"
);



    if(!jardim)
    return;



    for(
        let i = 0;
        i < 8;
        i++
    ){



        const petala =
        document.createElement(
            "div"
        );



        petala.classList.add(
            "petala-vento"
        );



        petala.style.left =
        Math.random()*100 + "%";



        petala.style.top =
        Math.random()*50 + "%";



        petala.style.animationDelay =
        Math.random()*8 + "s";



        jardim.appendChild(
            petala
        );



    }


}
// =====================================
// PARTICULAS DO GIRASSOL FINAL
// =====================================


function criarParticulasGirassol(){


    const girassol = 
    document.querySelector(
        "#girassol-final"
    );


    if(!girassol)
    return;



    for(
        let i = 0;
        i < 12;
        i++
    ){


        const particula =
        document.createElement(
            "div"
        );



        particula.classList.add(
            "particula-dourada"
        );



        particula.style.left =
        (45 + Math.random()*10) + "%";



        particula.style.top =
        (45 + Math.random()*15) + "%";



        particula.style.animationDelay =
        Math.random()*3 + "s";



        girassol.appendChild(
            particula
        );



    }


}
