

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d"); //contexto
const coin = new Audio('./assents/aud/coin.wav')
const Start = new Audio('./assents/aud/start.mp3')
const perdeu = new Audio('./assents/aud/lose.wav')

const gameOver = document.querySelector('.gameOver')

const pontos = document.querySelector('.valor_pontos')
const pontosP2 = document.querySelector('.valor_pontosP2')
const PontosFinal = document.querySelector('.pontos_final > span')
const PontosFinalP2 = document.querySelector('.pontos_finalP2 > span')
const menu = document.querySelector(".menu")
const BtnPlay = document.querySelector(".btn-play")
const cabecaImage = new Image();
cabecaImage.src = './assents/img/cabeca.jpg'
const cabecaImageP2 = new Image()
cabecaImageP2.src = './assents/img/cabecaP2.jpg'



function getDificuldadeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const dificuldade = urlParams.get('dificuldade');
    return dificuldade ? parseInt(dificuldade) : 150; // Valor padrão: 150
}

// Configurar a dificuldade com base no valor da URL
const dificuldade = getDificuldadeFromURL();

const size = 30;

/*
ctx.fillStyle = "red"; //funciona como style do css em si msm
ctx.fillRect(270, 280,/*<- Do ctx */ //50, 100 /*<- Do quadrado*/ ) //metade do x e y para ficar no meio

let cobra = [ //Onde essa array vai estar posicionada 
    { x: 270, y:240 },
    { x: 300, y:240 },
    { x: 330, y:240 }
];

// let cobraP2 = [
//     { x: 270, y: 90 },
//     { x: 300, y: 90 },
//     { x: 330, y: 90 }
// ];

const MostrarPontos = () =>{
    pontos.innerText = parseInt(pontos.innerText) + 10 //Faz a operação matemática OU PODE FAZER  +pontos.innerText + 10
}



const MostrarPontosP2 = () =>{
    pontosP2.innerText = parseInt(pontosP2.innerText) + 10 //Faz a operação matemática OU PODE FAZER  +pontos.innerText + 10
}


const randomNumber = (max, min) => {
    return Math.round(Math.random() * (max - min) + min)
}


const randomPosition = (max, min) => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / size) * size //Faz com que n quebre nos quadrados
}

const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})` //sim são duas crases n me pergunte o por q mas é
}


let comida = {
    x : randomPosition(0, 570), 
    y: randomPosition(0, 570),
    color: randomColor()
}

let direction
let directionP2
let LoopId

const DrawComida = () => {

    const {x, y, color} = comida

    ctx.shadowColor = color
    ctx.shadowBlur = 10

    ctx.fillStyle = comida.color
    ctx.fillRect(comida.x, comida.y, size, size)

    ctx.shadowBlur = 0 //precisa resetar o blur apos a criação da comida se n vai em tds os elementos
}


const DrawCobra = () => {
    cobra.forEach((position, index) => {
        if (index === cobra.length - 1) {
            // Desenhe a cabeça da cobra usando a imagem e aplique a rotação adequada
            ctx.save(); // Salvar o contexto atual
            ctx.translate(position.x + size / 2, position.y + size / 2); // Mover o contexto para o centro da cabeça da cobra

            // Determinar a rotação com base na direção atual
            if (direction === "right") {
                ctx.rotate(0);
            } else if (direction === "left") {
                ctx.rotate(Math.PI); // Calcula a circunferência de um círculo com um dado raio
            } else if (direction === "down") {
                ctx.rotate(Math.PI / 2);
            } else if (direction === "up") {
                ctx.rotate((3 * Math.PI) / 2);
            }

            ctx.drawImage(cabecaImage, -size / 2, -size / 2, size, size); // Desenhar a imagem
            ctx.restore(); // Restaurar o contexto
        } else {
            // Desenhe o corpo da cobra usando a cor vermelha
            ctx.fillStyle = "#9BEA4C";
            ctx.fillRect(position.x, position.y, size, size);
        }
    });
};

//Player 2


const DrawCobraP2 = () => {
    cobraP2.forEach((position, index) => {
        if (index === cobraP2.length - 1) {
            // Desenhe a cabeça da cobraP2 usando a imagem e aplique a rotação adequada
            ctx.save(); // Salvar o contexto atual
            ctx.translate(position.x + size / 2, position.y + size / 2); // Mover o contexto para o centro da cabeça da cobra

            // Determinar a rotação com base na direção atual
            if (directionP2 === "D") {
                ctx.rotate(0);
            } else if (directionP2 === "A") {
                ctx.rotate(Math.PI); // Calcula a circunferência de um círculo com um dado raio
            } else if (directionP2 === "S") {
                ctx.rotate(Math.PI / 2);
            } else if (directionP2 === "W") {
                ctx.rotate((3 * Math.PI) / 2);
            }

            ctx.drawImage(cabecaImageP2, -size / 2, -size / 2, size, size); // Desenhar a imagem
            ctx.restore(); // Restaurar o contexto
        } else {
            // Desenhe o corpo da cobra usando a cor vermelha
            ctx.fillStyle = "#E24DEA";
            ctx.fillRect(position.x, position.y, size, size);
        }
    });
};





const moveCobra = () => {
    if (!direction) return; // Se direction for undefined, não permita o movimento da cobra
    const head = cobra[cobra.length - 1];

    if (direction == "right") {
        cobra.push({ x: head.x + size, y: head.y });
    }

    if (direction == "left") {
        cobra.push({ x: head.x - size, y: head.y });
    }

    if (direction == "down") {
        cobra.push({ x: head.x, y: head.y + size });
    }

    if (direction == "up") {
        cobra.push({ x: head.x, y: head.y - size });
    }

    cobra.shift();
};


//player 2

const moveCobraP2 = () => {
    if (!directionP2) return; // Se directionP2 for undefined, não permita o movimento da cobra
    const head = cobraP2[cobraP2.length - 1];

    if (directionP2 == "D" || directionP2 == "d") {
        cobraP2.push({ x: head.x + size, y: head.y });
    }

    if (directionP2 == "A" || directionP2 == "a") {
        cobraP2.push({ x: head.x - size, y: head.y });
    }

    if (directionP2 == "S" || directionP2 == "s" ){
        cobraP2.push({ x: head.x, y: head.y + size });
    }

    if (directionP2 == "W" || directionP2 == "w") {
        cobraP2.push({ x: head.x, y: head.y - size });
    }

    cobraP2.shift();
};


const Fundo = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray";

    for (let i = size; i < canvas.width; i += size) {
    
        ctx.beginPath() //Significa q quando desenhar vai começar outro
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 900)

        ctx.stroke()

        
        ctx.beginPath() //Significa q quando desenhar vai começar outro
        ctx.lineTo(0, i)
        ctx.lineTo(900, i)

        ctx.stroke()

    }

}

const CheckComeu = () => {
    const head = cobra[cobra.length - 1]

    if (head.x == comida.x && head.y == comida.y){
        MostrarPontos()
        cobra.push(head)
        coin.play()

        // comida.x = randomPosition(0, 570), 
        // comida.y= randomPosition(0, 570),
        // comida.color= randomColor()

        let x = randomPosition()
        let y = randomPosition()

        while (cobra.find((position) => position.x == x && position.y == y)){
             x = randomPosition()
             y = randomPosition()
        }
        comida.x = x
        comida.y = y
        comida.color = randomColor()
    }
}


//PLAYER 2


const CheckComeuP2 = () => {
    const head = cobraP2[cobraP2.length - 1]

    if (head.x == comida.x && head.y == comida.y){
        MostrarPontosP2()
        cobraP2.push(head)
        coin.play()

        // comida.x = randomPosition(0, 570), 
        // comida.y= randomPosition(0, 570),
        // comida.color= randomColor()

        let x = randomPosition()
        let y = randomPosition()

        while (cobraP2.find((position) => position.x == x && position.y == y)){
             x = randomPosition()
             y = randomPosition()
        }
        comida.x = x
        comida.y = y
        comida.color = randomColor()
    }
}


let audioReproduzido = false;

const CheckCollision = () => {
    const head = cobra[cobra.length - 1]
    const limite = canvas.width - size
    const neckLimit = cobra.length - 2
    const Parede = head.x < 0 || head.x > limite || head.y < 0 || head.y > limite  
    
    const suicidio = cobra.find((position, index) => {
        return index < neckLimit && position.x == head.x && position.y == head.y
    })

    if (Parede || suicidio){
        GameOver();
        
        // Verifique se o áudio ainda não foi reproduzido
        if (!audioReproduzido) {
            perdeu.play();
            audioReproduzido = true; // Defina a variável de controle como true para evitar a reprodução repetida
        }
    }
}


//PLAYER 2

const CheckCollisionP2 = () => {
    const head = cobraP2[cobraP2.length - 1]
    const limite = canvas.width - size
    const neckLimit = cobraP2.length - 2
    const Parede = head.x < 0 || head.x > limite || head.y < 0 || head.y > limite  
    
    const suicidio = cobraP2.find((position, index) => {
        return index < neckLimit && position.x == head.x && position.y == head.y
    })

    if (Parede || suicidio){
        GameOver();
        directionP2 = undefined
        
        // Verifique se o áudio ainda não foi reproduzido
        if (!audioReproduzido) {
            perdeu.play();
            audioReproduzido = true; // Defina a variável de controle como true para evitar a reprodução repetida
        }
    }
}


const Batida = () => {
    const headP1 = cobra[cobra.length - 1];
    const headP2 = cobraP2[cobraP2.length - 1];

    if (headP1.x == headP2.x && headP1.y == headP2.y) {
        GameOver();
        directionP2 = undefined;

        // Verifique se o áudio ainda não foi reproduzido
        if (!audioReproduzido) {
            perdeu.play();
            audioReproduzido = true; // Defina a variável de controle como true para evitar a reprodução repetida
        }
    }
}

const Kill = () => {
    const headP1 = cobra[cobra.length - 1]; // Obtém a posição da cabeça da cobra do jogador 1
    const headP2 = cobraP2[cobraP2.length - 1]; // Obtém a posição da cabeça da cobra do jogador 2

    // Percorre sobre todas as partes da cobra do jogador 1, exceto a cabeça
    for (let i = 0; i < cobra.length - 1; i++) {
        // Percorre sobre todas as partes da cobra do jogador 2, exceto a cabeça
        for (let j = 0; j < cobraP2.length - 1; j++) {
            // Verifica se a cabeça do jogador 1 colidiu com qualquer parte da cobra do jogador 2
            if (headP1.x === cobraP2[j].x && headP1.y === cobraP2[j].y) {
                // Colisão detectada, ambas as cobras morrem
                GameOver(); // Chama a função GameOver para encerrar o jogo

                direction = undefined; // Reseta a direção do jogador 1 para evitar movimento
                directionP2 = undefined; // Reseta a direção do jogador 2 para evitar movimento
                gameOver.innerText = "P1 MORREU LIXO"; // Define uma mensagem de game over

                // Verifica se o áudio ainda não foi reproduzido
                if (!audioReproduzido) {
                    perdeu.play(); // Toca um som de derrota
                    audioReproduzido = true; // Define a variável de controle como true para evitar a reprodução repetida
                }
                return // Sai da função, pois já houve uma colisão
            } else if (headP2.x === cobra[i].x && headP2.y === cobra[i].y) {
                // Colisão detectada, ambas as cobras morrem
                GameOver(); // Chama a função GameOver para encerrar o jogo

                direction = undefined; // Reseta a direção do jogador 1 para evitar movimento
                directionP2 = undefined; // Reseta a direção do jogador 2 para evitar movimento
                gameOver.innerText = "P2 MORREU TROUXA"; // Define uma mensagem de game over

                // Verifique se o áudio ainda não foi reproduzido
                if (!audioReproduzido) {
                    perdeu.play(); // Toca um som de derrota
                    audioReproduzido = true; // Define a variável de controle como true para evitar a reprodução repetida
                }
                return; // Sai da função, pois já houve uma colisão
            }
        }
    }
}






BtnPlay.addEventListener('click', () => {
    audioReproduzido = false; // Redefina a variável quando o jogo reiniciar
});



const GameOver = () =>{
    direction = undefined
    directionP2 = undefined


    
    
    menu.style.display = "flex"
    // PontosFinalP2.innerText = pontosP2.innerText
    PontosFinal.innerText = pontos.innerText
    canvas.style.filter = "blur(2px)"



    mover = document.addEventListener('keydown', ({key}) => {
        if(key == "ArrowRight" && direction != "left"){
            direction = undefined;
        }
    
        if(key == "ArrowLeft" && direction != "right"){
            direction = undefined;
        }
    
        if(key == "ArrowUp" && direction != "down"){
            direction = undefined;
        }
    
        if(key == "ArrowDown" && direction != "up"){
            direction = undefined;
        }
    })

    moverP2 = document.addEventListener('keydown', ({ key }) => {
        if ((key === "D" || key === "d") && directionP2 !== "A" && directionP2 !== "a") {
            directionP2 = undefined;
        }
    
        if ((key === "A" || key === "a") && directionP2 !== "D" && directionP2 !== "d") {
            directionP2 = undefined;
        }
    
        if ((key === "W" || key === "w") && directionP2 !== "S" && directionP2 !== "s") {
            directionP2 = undefined;
        }
    
        if ((key === "S" || key === "s") && directionP2 !== "W" && directionP2 !== "w") {
            directionP2 = undefined;
        }
    });
}




const gameLoop = () => {

    clearInterval(LoopId)

    

    ctx.clearRect(0, 0, 900, 900) //Vai limpar do 0 até o 0 e o 900 da lagura e altura do quadrado
    
    Fundo()
    DrawComida()
    moveCobra()
    DrawCobra()
    CheckComeu()
    CheckCollision()

    //Player 2

    // DrawCobraP2()
    // moveCobraP2()
    // CheckComeuP2()
    // CheckCollisionP2()
    // Batida()
    // Kill()

    

    let = LoopId = setTimeout(() => {

        gameLoop()

    }, dificuldade)

    
}


gameLoop() //COMO O FUNDO LIMPA O CANVA ELE LINPA O GAME LOOP E VICE VERSA ENTÃO O FUNDO TEM Q IR DENTRO DO LOOP DEPOIS DE LIMPAR ELE CRIA


let mover = document.addEventListener('keydown', ({key}) => {
    if(key == "ArrowRight" && direction != "left"){
        direction = "right";
    }

    if(key == "ArrowLeft" && direction != "right"){
        direction = "left";
    }

    if(key == "ArrowUp" && direction != "down"){
        direction = "up";
    }

    if(key == "ArrowDown" && direction != "up"){
        direction = "down";
    }
    
})

// let moverP2 = document.addEventListener('keydown', ({ key }) => {
//     if ((key === "D" || key === "d") && directionP2 !== "A" && directionP2 !== "a") {
//         directionP2 = "D";
//     }

//     if ((key === "A" || key === "a") && directionP2 !== "D" && directionP2 !== "d") {
//         directionP2 = "A";
//     }

//     if ((key === "W" || key === "w") && directionP2 !== "S" && directionP2 !== "s") {
//         directionP2 = "W";
//     }

//     if ((key === "S" || key === "s") && directionP2 !== "W" && directionP2 !== "w") {
//         directionP2 = "S";
//     }
// });



BtnPlay.addEventListener('click', () => {
    perdeu.pause()
    perdeu.currentTime = 0 //Faz o audio reiniciar
    
    Start.play()
    


    pontos.innerText = "00"
    // pontosP2.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"
    


    mover = document.addEventListener('keydown', ({key}) => {
        if(key == "ArrowRight" && direction != "left"){
            direction = "right";
        }
    
        if(key == "ArrowLeft" && direction != "right"){
            direction = "left";
        }
    
        if(key == "ArrowUp" && direction != "down"){
            direction = "up";
        }
    
        if(key == "ArrowDown" && direction != "up"){
            direction = "down";
        }
    })

    // moverP2 = document.addEventListener('keydown', ({ key }) => {
    //     if ((key === "D" || key === "d") && directionP2 !== "A" && directionP2 !== "a") {
    //         directionP2 = "D";
    //     }
    
    //     if ((key === "A" || key === "a") && directionP2 !== "D" && directionP2 !== "d") {
    //         directionP2 = "A";
    //     }
    
    //     if ((key === "W" || key === "w") && directionP2 !== "S" && directionP2 !== "s") {
    //         directionP2 = "W";
    //     }
    
    //     if ((key === "S" || key === "s") && directionP2 !== "W" && directionP2 !== "w") {
    //         directionP2 = "S";
    //     }
    // });
    


    cobra = [ //Onde essa array vai estar posicionada 
    { x: 270, y:240 },
    { x: 300, y:240 },
    { x: 330, y:240 }
]

//     cobraP2 = [
//     { x: 270, y: 90 },
//     { x: 300, y: 90 },
//     { x: 330, y: 90 }
// ]

comida = {
    x : randomPosition(0, 570), 
    y: randomPosition(0, 570),
    color: randomColor()
}

})


