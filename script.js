let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let cobra = [];
cobra[0] = {
    x: 8 * box,
    y: 8 * box
}
let direcao = "direita";
let comida = comidaAleatoria();

function comidaAleatoria()
{
    return {
        x: Math.floor(Math.random() * 15 + 1 ) * box,
        y: Math.floor(Math.random() * 15 + 1 ) * box
    };
}


function criarBG(){
    context.fillStyle = "gray"
    context.fillRect(0,0,16 * box, 16 * box);
}

function criarCobra(){
    for(i=0; i < cobra.length; i++)
    {
        context.fillStyle = "black";
        context.fillRect(cobra[i].x, cobra[i].y ,box, box)
    }
}

function fruta(){
    context.fillStyle = "white";
    context.fillRect(comida.x, comida.y, box, box);
}

document.addEventListener('keydown',atualizar);

function atualizar(event){
    if(event.keyCode == 37 && direcao != "direita") direcao = "esquerda";
    if(event.keyCode == 38 && direcao != "baixo") direcao = "cima";
    if(event.keyCode == 39 && direcao != "esquerda") direcao = "direita";
    if(event.keyCode == 40 && direcao != "cima") direcao = "baixo";
}

function iniciarJogo (){
    if(cobra[0].x > 15 * box && direcao == "direita") cobra[0].x = 0;
    if(cobra[0].x < 0  && direcao == "esquerda") cobra[0].x = 16 * box;
    if(cobra[0].y > 15 * box && direcao == "baixo") cobra[0].y = 0;
    if(cobra[0].y < 0  && direcao == "cima") cobra[0].y = 16 * box;

    for (i = 1; i < cobra.length; i++ ){
        if(cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y ){
            clearInterval(jogo);
            alert("Fim do Jogo! :(");
        }
    }

    criarBG();
    criarCobra();
    fruta();
    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;

    if (direcao == "direita" ) cobraX += box;
    if (direcao == "esquerda" ) cobraX -= box;
    if (direcao == "cima" ) cobraY -= box;
    if (direcao == "baixo" ) cobraY += box;

    if(cobraX != comida.x ||  cobraY != comida.y){
        cobra.pop()
    }
    else{
        comida = comidaAleatoria();
    }
    let novoPonto ={    
        x: cobraX,
        y: cobraY
    }
    cobra.unshift(novoPonto)
 }

let jogo = setInterval(iniciarJogo,100 )