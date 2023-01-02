/////////////////////////////////////////////////////
///    JUEGO SERPIENTE (Hecho por VÃ­ctor AndrÃ©s)  ///
/////////////////////////////////////////////////////

//InicializaciÃ³n
var dimension=document.getElementById("dimension");
var rows=dimension.value;
var columns=rows;
var first=true;
var snake1=null;
var cInterval=0;
var time=500;
var msg=document.getElementById("msg");
var points=document.getElementById("points");

paintTable();

//Eventos
var buttonstart=document.getElementById("start");
buttonstart.addEventListener('click', start, false);

var buttonrestart=document.getElementById("restart");
buttonrestart.addEventListener('click', restart, false);

var buttonspeedDown=document.getElementById("speedDown");
buttonspeedDown.addEventListener('click', speedDown, false);

var buttonspeedUp=document.getElementById("speedUp");
buttonspeedUp.addEventListener('click', speedUp, false);

var buttonok=document.getElementById("ok");
buttonok.addEventListener('click', ok, false);

//Objeto serpiente
function snake(){
    this.direction="right";
    this.queue=new Array();
    this.Feed=0;
    this.fin=false;
    this.init= function (){
        let initSnakeRow=getRowFeed();
        let initSnakeCol=getColumnFeed();
        this.queue.push((initSnakeRow*columns)+initSnakeCol);
        this.setFeed();
    }
    this.setFeed=function(){
        let rowAleatory=getRowFeed();
        let colAleatory=getColumnFeed();
        
        if(this.queue.includes((rowAleatory*columns)+colAleatory)){
            this.setFeed();
        }else{
            this.Feed=(rowAleatory*columns)+colAleatory;
        }
    }
    
    this.updateSnake=function(){
        points.innerText=(this.queue.length*5)-5;
        if(this.end){
            clearInterval(cInterval);
            msg.setAttribute("class","show");
        }
        for(let i=0;i<this.queue.length;i++){
            let q=this.queue[this.queue.length-1];
            let r=Math.trunc(q/columns);
            let c=Math.trunc(q%columns);

            if(this.queue[this.queue.length-1]!=this.Feed){
               this.queue.shift();
            }else{ 
               this.setFeed();
            }

                switch(this.direction){
                    case "up":
                            if(r==0){
                                r=rows;
                            }
                            r--;	
                            break;
                    case "down":
                            if(r==(rows-1)){
                                r=-1;
                            }
                            r++;
                            break;
                    case "left":
                            if(c==0){
                                c=columns;
                            }
                            c--;
                            break;
                    case "right":
                           if(c==(columns-1)){
                               c=-1;
                           }
                           c++;
                           break;										
                }
                if(this.queue.includes(r*columns+c)){
                    this.end=true;
                }else{
                    this.queue.push((r*columns)+c);
                }
                break;
        }
    }

    this.printSnake=function(){
        clearTable();
        for(let i=0; i<this.queue.length;i++){
            let q=this.queue[i];
            let r=Math.trunc(q/columns);
            let c=Math.trunc(q%columns);
            let casilla=document.getElementById("F"+r+"-C"+c);
            casilla.setAttribute("class","snake");
        }
        let feed=parseInt(this.Feed);
        let r=Math.trunc(feed/columns);
        let c=Math.trunc(feed%columns);
        let casilla=document.getElementById("F"+r+"-C"+c);
        casilla.setAttribute("class","feed");

    }
}

//Funciones
function paintTable(){
    var t= document.body.querySelector("table");
    if(document.body.querySelector("table") != null){
        var center=document.getElementById("base");
        center.removeChild(t);
    }
    rows=dimension.value;
    columns=rows;
    var body = document.getElementById("base");
    var table = document.createElement("table");
    table.setAttribute("border","1");
    body.appendChild(table);
    for(let i=0;i<rows;i++){
        let r=document.createElement("tr");
        r.id="F"+i;
        table.appendChild(r);
        for(let y=0;y<columns;y++){
            let c=document.createElement("td");
            c.id="F"+i+"-C"+y;
            c.setAttribute("width","10");
            c.setAttribute("height","10");
            c.setAttribute("class","no-snake");
            let row=document.getElementById("F"+i);
            row.appendChild(c);
        }
    }
}

function getRowFeed(){
    let aleatory = Math.round(Math.random()*(rows-1));
    return aleatory;
}
function getColumnFeed(){
    let aleatory = Math.round(Math.random()*(columns-1));
    return aleatory;
}

function start(){
    paintTable();
    buttonstart.removeEventListener("click",start);
    buttonstart.setAttribute("class","button lightgray");		
    cInterval = setInterval(run,time);
}

function restart(){
    paintTable();
    clearInterval(cInterval);
    snake1=null;
    first=true;
    clearTable();
    cInterval = setInterval(run,time);
}

function speedUp(){
    clearInterval(cInterval);
    time=time-150;
    if(time<150){
        time=150
    }
    cInterval=setInterval(run,time);
}

function speedDown(){
    clearInterval(cInterval);
    time=time+150;
    if(time>2100){
        time=2100
    }
    cInterval=setInterval(run,time);
}
function ok(){
    msg.setAttribute("class","hide");
    restart();
}

function run(){
    if(first){
        snake1=new snake();
        snake1.init();
        first=false;
        document.addEventListener("keydown",getKey);
    }
    function getKey(evento){
        switch(evento.keyCode){
            case 38:
                snake1.direction="up";
                break;
            case 40:
                snake1.direction="down";
                break;
            case 37:
                snake1.direction="left";
                break;
            case 39:
                snake1.direction="right";
                break;
        }
    }
    snake1.printSnake();
    snake1.updateSnake();
}

function clearTable(){
    for(let x=0;x<rows;x++){
        for(let h=0;h<columns;h++){
            let casilla=document.getElementById("F"+x+"-C"+h);
            casilla.setAttribute("class","no-snake");	
        }
    }
}	