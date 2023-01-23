//contexto del juego
const canvas=document.querySelector('#lienzo')//seleccionar canvas del html
const ctx=canvas.getContext('2d')
const anchoCasilla=100//se refiere al 0 osea el ancho de escneario
const altoCasilla=100//se refiere al alto
const cielo='black'
let colisionEnemigo=false
let colisionNave=false

const planetasArray=[]//aqui rellenaremos de planetas
const arrayEnemigos=[]
const balasArray=[]





    //medidas del canvas
    canvas.width=1000//ancho
    canvas.height=500//el alto
    

//borde del canvas
canvas.style.border='1px solid black'

//creando escenario
let escenario=[//cada 0 vale 100 pixeles
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
]
//funcion que dibuja el escenario

function dibujaEscenario(){
    for (y=0 ; y<5 ; y++) {// el y<5 es por los 0 del escenario
        for(x=0;x<10;x++){//recorre en horizontal
            if(escenario[y][x]==0){
                ctx.fillStyle=cielo
                ctx.fillRect(x*anchoCasilla,y*altoCasilla,anchoCasilla,altoCasilla)//1*anchocasilla,1*altocasilla,cuantos pixeles quiero que me pinte = 100,100
                //va aumentanado el forr, 1*100, 2*100...
            }
        }
        
    }


}

const planetas=function(posX,posY,radio,comienzoAngulo,finalAngulo,color,velocidad){
    this.posX=posX;
    this.posY=posY;
    this.radio=radio;
    this.comienzoAngulo=comienzoAngulo;
    this.finalAngulo=finalAngulo;
    this.color=color;
    this.velocidad=velocidad;


    this.dibuja=function(){//el que dibujara los planetas
        ctx.beginPath();//canvas circulo
        ctx.arc(this.posX,this.posY,this.radio,comienzoAngulo,finalAngulo)//medidas del circulo
        ctx.fillStyle=color//color dle circulo
        ctx.fill()//relleno del circulo
    }
    this.mover=function(){
        this.posX-=1 + this.velocidad
        if(this.posX<0){
            this.posX=1100
            this.posX=Math.random()*500
        }
    }
}



//instancias de planetas
//planetas

planetasArray.push(new planetas(1100,Math.random()*500,10,0,2*Math.PI,'rgba(92,28,97,0.5)',0.5))//rgb + a , a significa trasparencia
planetasArray.push(new planetas(1100,Math.random()*500,15,0,2*Math.PI,'rgba(32,28,97,0.5)',0.75))
planetasArray.push(new planetas(1100,Math.random()*500,5,0,2*Math.PI,'rgba(32,28,97,0.25)',1.5))
planetasArray.push(new planetas(1100,Math.random()*500,10,0,2*Math.PI,'rgba(92,28,97,0.5)',1.75))
planetasArray.push(new planetas(1100,Math.random()*500,10,0,2*Math.PI,'rgba(32,98,97,0.5)',2))
planetasArray.push(new planetas(1100,Math.random()*500,15,0,2*Math.PI,'rgba(92,28,97,0.5)',2.25))
planetasArray.push(new planetas(1100,Math.random()*500,5,0,2*Math.PI,'rgba(92,28,97,0.25)',2.50))
planetasArray.push(new planetas(1100,Math.random()*500,10,0,2*Math.PI,'rgba(92,28,97,0.5)',1))
planetasArray.push(new planetas(1100,Math.random()*500,15,0,2*Math.PI,'rgba(92,28,97,0.5)',0.7))
planetasArray.push(new planetas(1100,Math.random()*500,5,0,2*Math.PI,'rgba(92,28,97,0.25)',0.70))
planetasArray.push(new planetas(1100,Math.random()*500,10,0,2*Math.PI,'rgba(92,28,97,0.5)',1.8))
planetasArray.push(new planetas(1100,Math.random()*500,15,0,2*Math.PI,'rgba(92,28,97,0.5)',1.96))
planetasArray.push(new planetas(1100,Math.random()*500,5,0,2*Math.PI,'rgba(92,28,97,0.25)',1.45))
planetasArray.push(new planetas(1100,Math.random()*500,10,0,2*Math.PI,'rgba(92,28,97,0.5)',2.6))
planetasArray.push(new planetas(1100,Math.random()*500,15,0,2*Math.PI,'rgba(92,28,97,0.5)',2.45))
planetasArray.push(new planetas(1100,Math.random()*500,5,0,2*Math.PI,'rgba(92,28,97,0.25)',2.60))
planetasArray.push(new planetas(1100,Math.random()*500,10,0,2*Math.PI,'rgba(92,28,97,0.5)',2.5))
planetasArray.push(new planetas(1100,Math.random()*500,15,0,2*Math.PI,'rgba(92,28,97,0.5)',1.5))

//jugador ( nave)
const nave=function(posX, posY,ancho,alto,color,velocidad){
    this.posX=posX;
    this.posY=posY;
    this.ancho=ancho;
    this.alto=alto;
    this.color=color;
    this.velocidad=velocidad;

    this.dibuja=function(){
    //  ctx.fillStyle='blue'
    //  ctx.fillRect(this.posX,this.posY,ancho,alto)
    
    if(colisionNave){
        let explota=new Image()
        explota.src='./img/ExplosionPropia.png'
        ctx.drawImage(explota,this.posX,this.posY,this.ancho,this.alto)
        setTimeout(()=>{colisionNave=false},1000)
    
    }else{
    
    let fotoNave=new Image()
    fotoNave.src='./img/naveTerminado.png'
    ctx.drawImage(fotoNave,this.posX,this.posY,this.ancho,this.alto)
    }
    }

    this.arriba=function(){
        if(this.posY>=3){
            this.posY-=10
            arrayBalasNave.map(balasNave=>{//para que se muevan las 3 balas
                balasNave.posY-=10
            })
        }
    }
    this.abajo=function(){
        if(this.posY<=500-50){
            this.posY+=10
            arrayBalasNave.map(balasNave=>{
                balasNave.posY+=10
            })
        }
    }
    this.izquierda=function(){
        if(this.posX>=2){
            this.posX-=10
            arrayBalasNave.map(balasNave=>{
                balasNave.posX-=10
            })
        }
    }
    this.derecha=function(){
        if(this.posX<=1000-55){
            this.posX+=10
            arrayBalasNave.map(balasNave=>{
                balasNave.posX+=10
            })
        }
    }



}
const naveInstancia=new nave(0,200,50,50)

//clase proyectil del protagonista

const proyectil=function(posX,posY,ancho,alto,color,velocidad){
    this.posX=posX;
    this.posY=posY;
    this.ancho=ancho;
    this.alto=alto;
    this.color=color;
    this.velocidad=velocidad;

    this.dibuja=function(){
        ctx.fillStyle=this.color
        let fotoNave= new Image()
        fotoNave.src='./img/MiProyectil.png'
        ctx.drawImage(fotoNave,this.posX,this.posY,this.ancho,this.alto)
    }

    this.dispara=function(){
        let disparo=setInterval(()=>{//pongo el setinterval, es para que dispare cuando yo le de una tecla, por eso no lo pongo en un bucle o disparara todo el rato
            this.posX+=10

        },10)//10 milisegundos

        if(this.posX>1000){
            this.posX=naveInstancia.posX+22
            this.posY=naveInstancia.posY+22
            clearInterval(disparo)//para que limpie el intervalo cuando pase los 1000
        }

    }


}
const balaNave=new proyectil(naveInstancia.posX+22,naveInstancia.posY+22,10,10,'white',5)


//proyectil 2 para arriba

const proyectilArriba=function(posX,posY,ancho,alto,color,velocidad){
    this.posX=posX;
    this.posY=posY;
    this.ancho=ancho;
    this.alto=alto;
    this.color=color;
    this.velocidad=velocidad;

    this.dibuja=function(){
        //ctx.fillStyle=this.color
        //ctx.fillRect(this.posX,this.posY,this.ancho,this.alto)
        let proyectil=new Image()
        proyectil.src='./img/MiProyectil.png'
        ctx.drawImage(proyectil,this.posX,this.posY,this.ancho,this.alto)
    }

    this.dispara=function(){
        let disparo=setInterval(()=>{
            this.posX+=10
            this.posY-=7

        },10)

        if(this.posX>1000 || this.posY<0){
            this.posX=naveInstancia.posX+22
            this.posY=naveInstancia.posY+22
            clearInterval(disparo)
        }

    }


}
const balaNaveArriba=new proyectilArriba(naveInstancia.posX+22,naveInstancia.posY+22,10,10,'white',5)


//proyectil 3 para abajo

const proyectilAbajo=function(posX,posY,ancho,alto,color,velocidad){
    this.posX=posX;
    this.posY=posY;
    this.ancho=ancho;
    this.alto=alto;
    this.color=color;
    this.velocidad=velocidad;

    this.dibuja=function(){
        //ctx.fillStyle=this.color
        //ctx.fillRect(this.posX,this.posY,this.ancho,this.alto)
        let proyectilAbajo=new Image()
        proyectilAbajo.src='./img/MiProyectil.png'
        ctx.drawImage(proyectilAbajo,this.posX,this.posY,this.ancho,this.alto)
    }

    this.dispara=function(){
        let disparo=setInterval(()=>{
            this.posX+=10
            this.posY+=7

        },10)

        if(this.posX>1000 || this.posY>500){
            this.posX=naveInstancia.posX+22
            this.posY=naveInstancia.posY+22
            clearInterval(disparo)
        }

    }


}
const balaNaveAbajo=new proyectilAbajo(naveInstancia.posX+22,naveInstancia.posY+22,10,10,'white',5)

const arrayBalasNave=[balaNave,balaNaveAbajo,balaNaveArriba]//para arreglar el bug de las balas que no siguen a la nave

//enemigo

const enemigos=function(posX, posY,ancho,alto,color,velocidad){
    this.posX=posX;
    this.posY=posY;
    this.ancho=ancho;
    this.alto=alto;
    this.color=color;
    this.velocidad=velocidad;

    this.dibuja=function(){
        //ctx.fillStyle=this.color
        //ctx.fillRect(this.posX,this.posY,ancho,alto)
        let enemigoImg=new Image()
        enemigoImg.src='./img/naveEnemiga.png'
        ctx.drawImage(enemigoImg,this.posX,this.posY,this.ancho,this.alto)
    }
    this.mover=function(){
        this.posX-=2+this.velocidad
        this.posY-=0.20//para que vaya en diagonal
        if(this.posX<0 || this.posY<0){//para que vuelvan a aparecer 
            this.posX=1200
            this.posY=Math.random()*500
        }
    }
}


//proyectiles enemigos

const proyectilEnemigo=function(posX, posY,ancho,alto,color,velocidad){
    this.posX=posX;
    this.posY=posY;
    this.ancho=ancho;
    this.alto=alto;
    this.color=color;
    this.velocidad=velocidad;

    this.dibuja=function(){
       // ctx.fillStyle=this.color
        //ctx.fillRect(this.posX,this.posY,ancho,alto)
        let enemigoProyectil=new Image()
        enemigoProyectil.src='./img/proyectilEnemigo.png'
        ctx.drawImage(enemigoProyectil,this.posX,this.posY,this.ancho,this.alto)
    }
    this.dispara=function(){
        this.posX-=20
        this.posY-=2
    }

}




//instancias de los enemigos y balas
let random1= Math.random()*500
let random2= Math.random()*500
let random3= Math.random()*500
let random4= Math.random()*500
let random5= Math.random()*500
let random6= Math.random()*500
let random7= Math.random()*500
let random8= Math.random()*500

arrayEnemigos.push(new enemigos(1100,random1,50,50,'red',0.5))
arrayEnemigos.push(new enemigos(1100,random2,50,50,'red',1))
arrayEnemigos.push(new enemigos(1100,random3,50,50,'red',1.75))
arrayEnemigos.push(new enemigos(1100,random4,50,50,'red',2.25))
arrayEnemigos.push(new enemigos(1100,random5,50,50,'red',1.4))
arrayEnemigos.push(new enemigos(1100,random6,50,50,'red',3.5))
arrayEnemigos.push(new enemigos(1100,random7,50,50,'red',1.75))
arrayEnemigos.push(new enemigos(1100,random8,50,50,'red',0.4))

balasArray.push(new proyectilEnemigo(1100,random1+19,10,10,'white',0.5))
balasArray.push(new proyectilEnemigo(1100,random2+19,10,10,'white',1))
balasArray.push(new proyectilEnemigo(1100,random3+19,10,10,'white',1.75))
balasArray.push(new proyectilEnemigo(1100,random4+19,10,10,'white',2.25))
balasArray.push(new proyectilEnemigo(1100,random5+19,10,10,'white',1.4))
balasArray.push(new proyectilEnemigo(1100,random6+19,10,10,'white',3.5))
balasArray.push(new proyectilEnemigo(1100,random7+19,10,10,'white',1.75))
balasArray.push(new proyectilEnemigo(1100,random8+19,10,10,'white',0.4))

//Marcador

const puntuacion=document.querySelector('#puntuacion')//conecta con html
const vidas=document.querySelector('#vidas')
const record=document.querySelector('#record')

let puntuacionVariable=0//creamos variables
let vidaVariable=10
let recordVariable=0

puntuacion.textContent=puntuacionVariable//asignamos
vidas.textContent=vidaVariable 
record.textContent=localStorage.getItem('record') 







//colisiones

function colisiones(){
    arrayEnemigos.map(arrayEnemigo=>{//tengo acceso a todo eso de arriba, balasarray.push
        balasArray.map(balaArray=>{//arrayenemigos.push
             //nuestros proyectiles chocan con los enemigos 
          //hacemos un mapeo del array que contiene mis 
          //proyectiles


        arrayBalasNave.map(arrayBalaNave=>{

            if(arrayBalaNave.posX+10>=arrayEnemigo.posX&& 
            arrayBalaNave.posY>=arrayEnemigo.posY && 
            arrayBalaNave.posY<=arrayEnemigo.posY+50 && 
            arrayBalaNave.posX<=arrayEnemigo.posX+50){
    
                arrayEnemigo.posX=1200
                arrayBalaNave.posX=naveInstancia.posX+22
            
                colisionEnemigo=true
    
                explosion.play()
    
                puntuacion.textContent=puntuacionVariable +=1
                
                puntuacionVariable+=1

                //  if(puntuacionVariable>50){
                //      window.location.href='./nivel2/index.html'
                //  }
        
                
            }
            
            
            })
        

 //colision nave con los enemigos

if(naveInstancia.posX+50>=arrayEnemigo.posX && 
    naveInstancia.posY>=arrayEnemigo.posY && 
    naveInstancia.posY<=arrayEnemigo.posY+50){
        
    
        arrayEnemigo.posX=1200
        
        vidas.textContent=vidaVariable-=1
        colisionEnemigo=true
        colisionNave=true

        if(vidaVariable<=0){
            vidas.textContent=0
        window.location.href='./gameover.html'

            if(puntuacionVariable>recordValue){
                localStorage.setItem('record',puntuacionVariable)
            }
        }
        
    }

    
    //colisiones con balas enemigas 


    if(naveInstancia.posX+50>=balaArray.posX && 
        naveInstancia.posY>=balaArray.posY && 
        naveInstancia.posY<=balaArray.posY+10){
        
            vidas.textContent=vidaVariable-=1
    
            balaArray.posX=1200
            colisionNave=true
            nosColisionan.play()
        
        
        
            if(vidaVariable<=0){
                vidas.textContent=0
            window.location.href='./gameover.html'

                
    if(puntuacionVariable>recordVariable){
        localStorage.setItem('record',puntuacionVariable)
    }

            }
        

        }





})
})



}
colisiones()



//eventos del juego - movimiento del jugador

document.addEventListener('keydown', (e)=>{
    e.preventDefault()//nos permite que los listener aveces ocurren cosas raras, con preventdefault evitas eso

    if(e.key==='w'){
        naveInstancia.arriba()
    }
    if(e.key==='s'){
        naveInstancia.abajo()
    }
    if(e.key==='a'){
        naveInstancia.izquierda()
    }
    if(e.key==='d'){
        naveInstancia.derecha()
    }
    if(e.key===' '){
        balaNave.dispara()
        disparo.play()
    }
    if(e.key==='e'){
        balaNaveArriba.dispara()
        disparo.play()
    }
    if(e.key==='q'){
        balaNaveAbajo.dispara()
        disparo.play()
    }
})

//Audios 

const disparo=new Audio()
disparo.src='./audio/disparo.mp3'

const explosion=new Audio()
explosion.src='./audio/explosionEnemigo.mp3'

const nosColisionan=new Audio()
nosColisionan.src='./audio/nosColisionan.mp3'



function borrarCanvas(){//para actualizar canvas continuamente
    //medidas del canvas
    canvas.width=1000//ancho
    canvas.height=500//el alto
    }


//funcion principal, qie ejecutara el juego - bucle
function principal(){
    requestAnimationFrame(principal)//repetira todo el rato
    borrarCanvas()

    colisiones()
    dibujaEscenario()
    

   
    balaNaveArriba.dibuja()
    balaNaveAbajo.dibuja()
    balaNave.dibuja()
    naveInstancia.dibuja()




    for(let i=0; i <planetasArray.length;i++){//recorrer los planetas
        planetasArray[i].dibuja()//si no hago este for, tendria que poner esto 18 veces
        planetasArray[i].mover()
    }



    for (let i=0; i<balasArray.length;i++){
        balasArray[i].dibuja()

        if(naveInstancia.posY>=arrayEnemigos[i].posY -50 && 
        naveInstancia.posY<=arrayEnemigos[i].posY + 100 )//radar que detecta para que el enemigo dispare - -50 , +100 amplia el rango
            {
                balasArray[i].dispara()
        }else {
            balasArray[i].posX=arrayEnemigos[i].posX+22//la posicion quiero que sea igual a la de mi enemigo + 22 ( es el centro)
            balasArray[i].posY=arrayEnemigos[i].posY+22
        }


    }

    for(i=0;i<arrayEnemigos.length;i++){
        arrayEnemigos[i].dibuja()
        arrayEnemigos[i].mover()
    }

}
principal()
