//Criar variaveis para armazenar 
//Primeira letra minuscula e a outra Maiscula 

let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;

let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;
let raio = diametro / 2;

let colidiu = false


//variaveis da raquete

let xRaquete = 5;
let yRaquete = 150;
let raqueteCompri = 6;
let raqueteAltura = 90;

//variaveis do oponente 
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente 


//variaveisplacarjogo
let meusPontos = 0;
let pontosOponente = 0;

function setup() {
  createCanvas(600, 400);
}

//sons jogo
let trilha;
let raquetada;
let ponto;


//erro da raquete do opinente

let chanceDeErrar=0;

//função para carregar antes do nosso jogo
function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada =loadSound("raquetada.mp3")
  
}

function setup(){
  createCanvas(600, 400);
  trilha.loop();
}


//Y, X e diametro

function draw() {
  background(0);
  mostraBolinha();
  mostraRaquete(xRaquete, yRaquete);
  movimentaBolinha();
  verificaColisaoBorda();
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  movimentaRaqueteOpo();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaqueteOponente(xRaqueteOponente,       yRaqueteOponente);
  mostraRaquete(xRaqueteOponente,       yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  //bolinhaNaoFicaPresa();
  calculaChanceDeErrar();
  
 
}

//configurações da bolinha

//chama a bolinha na função draw
function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro)
  
}


function movimentaBolinha(){
   //chamando a variavel
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;
  

}

function verificaColisaoBorda(){
    // duas barras significa or
  // parenteses indicando condição
  // chaves indicando ação
  
  if (xBolinha + raio > width || 
      xBolinha < 0){
    velocidadeXbolinha *= -1;
  }
  
  if (yBolinha - raio > height ||
     yBolinha < 0){
    velocidadeYbolinha *= -1;
  }
}


//confugurações da raquete

function mostraRaquete(x, y){
  rect(x,y, raqueteCompri, raqueteAltura);
  
}

//ir para cima subtrai a posição

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;   
 }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
 }
}

//descobrir codido da tecla w e s
function movimentaRaqueteOpo(){
  if(keyIsDown(87)){
    yRaquete -= 10;   
 }
  if(keyIsDown(83)){
    yRaquete += 10;
 }
}

//relembra do raio que caucula a metade
function verificaColisaoRaquete (x,y){
  if (xBolinha - raio < xRaquete + raqueteCompri && yBolinha - raio< yRaquete + raqueteAltura && yBolinha + raio > yRaquete)
  {
    velocidadeXbolinha *= -1;                  }
  
}

function verificaColisaoRaquete(x,y){
 colidiu =  collideRectCircle(xRaquete, yRaquete, raqueteCompri, raqueteAltura, xBolinha, yBolinha, raio)
  
  if(colidiu){
    velocidadeXbolinha *= -1;
    raquetada.play();
    
  }
  
}
  
  function verificaColisaoRaqueteOponente(x,y){
 colidiu =  collideRectCircle(xRaqueteOponente, yRaqueteOponente, raqueteCompri, raqueteAltura, xBolinha, yBolinha, raio)
  
  if(colidiu){
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
  
}
  

//configurando raquete adversário
function mostraRaqueteOponente(){
  rect(xRaqueteOponente,yRaqueteOponente , raqueteCompri, raqueteAltura);
  
}
  


function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -    yRaqueteOponente - raqueteCompri / 2 - 30;  yRaqueteOponente += velocidadeYOponente
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}




function incluiPlacar(){
  stroke(255);
  textAlign(CENTER)
  textSize(16);
  fill(color(255, 140, 0))
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0))
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
  
}

function marcaPonto(){
  if (xBolinha  > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 0){
    pontosOponente += 1;
    ponto.play();
  }
}

//para se a bolinha ficar presa
//function bolinhaNaoFicaPresa(){
    //if (xBolinha - raio < 0){
    //xBolinha = 23
    //}
//}
