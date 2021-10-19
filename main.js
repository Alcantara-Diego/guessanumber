var feedback = document.getElementById('feedback')
var pchances = document.getElementById('pchances')
var guessb = document.getElementById('guessb');
var msg = document.getElementById('msg')
var chances = false
var random;
var vidas;
function menu() {
    feed_display(0)
    vidas = 0
    chances = false
    pchances.style.display ="none";
    feedback.style.animationName="none"
    feedback.style.backgroundColor='#d8e9ef'
    guessb.style.backgroundColor="gray";
    guessb.removeEventListener('click', guess);
}

function começar(nivel) {
    if (nivel == 1) {
        random = Math.floor(Math.random()*99 + 1)
        msg.innerHTML = "Número entre 1 e 100!";
        chances = false;
    }else {
        if (nivel == 2) {
            random = Math.floor(Math.random()*499 + 1)
            msg.innerHTML="Número entre 1 e 500!";
            vidas = 10;
        } else if (nivel == 3) {
            random = Math.floor(Math.random()*999 + 1)
            msg.innerHTML="Número entre 1 e 1000!"
            vidas = 7;
        }
        chances = true;
        pchances.style.display="flex";
        document.getElementById('heart').innerHTML="  " + vidas;
    }
    feed_display(1);
    guessb.addEventListener('click', guess);
    console.log('o número é '+ random);
    guessb.style.backgroundColor="#55967e";
}

function guess() {
    let player = document.getElementById('player')
    console.log("player é " + player)
    feedback.style.animationName='none'
    if (player.value == random) {
        msg.innerHTML="Você acertou!"
        feedback.style.animationName='green'
        setTimeout(menu, 4000);
    } else {
        setTimeout( ()=>{
            feedback.style.animationName='red'
            msg.style.animationName="slide"
            msg.style.animationDuration=1000
        },0)
        if (player.value > random) {
            msg.innerHTML="Mais baixo!"
        } else if (player.value < random) {
            msg.innerHTML="Mais alto!"
        }
        if (chances) {
            vidas --
            document.getElementById('heart').innerHTML="  " + vidas;
            checar_derrota();
        }
    }
    msg.style.animationName='none'
    player.value=""
    player.focus()
}

function checar_derrota() {
    if (vidas == 0) {
        guessb.removeEventListener('click', guess);
        msg.innerHTML="Você perdeu!"
        setTimeout(() =>{
            msg.innerHTML="O número era: " + random
        }, 2000);
        setTimeout(menu, 6000);
    }
}
function feed_display(p) {
    let btn = document.getElementsByClassName('btn');
    if (p == 0) {
        for (let i = 0; i < btn.length; i++) {
            btn[i].style.display="flex"
        }
        console.log(btn)
        msg.style.display="none"
    } else if (p == 1) {
        for (i = 0; i < btn.length; i++) {
            btn[i].style.display="none";
        }
        msg.style.display="flex";
    }
}



window.addEventListener('load', menu())

