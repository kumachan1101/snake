var can = document.getElementById("can");
var ctx = can.getContext("2d");
let x2;
let y2;

let snakelist = [];
let poisonlist = [];
var direction = "ArrowRight";
var RECT_SIZE = 32;


class Pos{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

function keydownEvent(event){ 
    direction = event.key;
}

function init(){
    document.addEventListener('keydown', keydownEvent,false);
    RndRect();
    snakelist.push(new Pos(0, 0));   
}

function UpdatePos(){

    for(let i = snakelist.length-1; i > 0; i--){
        snakelist[i].x = snakelist[i-1].x;
        snakelist[i].y = snakelist[i-1].y;
    }

    x = snakelist[0].x;
    y = snakelist[0].y; 
    
    switch(direction){
        case "ArrowLeft":
            x -= 1;       
            break;
        case "ArrowRight":
            x += 1;       
            break;
        case "ArrowUp":
            y -= 1;       
            break;
        case "ArrowDown":
            y += 1;    
            break;
        default:
            break;
    }
    snakelist[0].x = x;
    snakelist[0].y = y;    
 
    
}

function ShowListRect(){
    for(let i = 0; i < snakelist.length; i++){
        ShowRect(snakelist[i].x,snakelist[i].y,"green");
    }
}

function RndRect(){
    x2 = Math.floor( Math.random() * 40 );
    y2 = Math.floor( Math.random() * 20 ); 
}

function JudgeConflict(){
    if(x2 == x && y2 == y){
        return true;
    }
    return false;
}

function GetAddPos(cLastPos){
    let x = cLastPos.x;
    let y = cLastPos.y;

    switch(direction){
        case "ArrowLeft":
            x += 1;       
            break;
        case "ArrowRight":
            x -= 1;       
            break;
        case "ArrowUp":
            y += 1;       
            break;
        case "ArrowDown":
            y -= 1;    
            break;
        default:
            break;
    }
    let cAddPos = new Pos(x,y);
    return cAddPos;
}

function AddRect(){
    let len = snakelist.length;
    let cLastPos = snakelist[len-1];
    let cAddPos = this.GetAddPos(cLastPos);
    snakelist.push(cAddPos);   
}

function ShowRect(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*RECT_SIZE,y*RECT_SIZE,RECT_SIZE,RECT_SIZE);
}

function RndPoisonRect(){
    for(i =0; i <5; i++){
        let x = Math.floor( Math.random() * 40 );
        let y = Math.floor( Math.random() * 20 );
        poisonlist.push(new Pos(x,y));    
    }
}

function ShowPoisonRect(){
    for(i =0; i < poisonlist.length; i++){
        ShowRect(poisonlist[i].x, poisonlist[i].y, "red");
    }    
}

function JudgePoison(){
    for(i =0; i < poisonlist.length; i++){
        if(poisonlist[i].x == x && poisonlist[i].y == y){
            return true;
        }
    }    
    return false;

}

function animation(){
    ctx.clearRect(0,0,can.width,can.height);
    UpdatePos();
    ShowListRect();
    if(JudgeConflict()){
        AddRect();
        RndRect();
        RndPoisonRect(5);
    }
    if(JudgePoison()){
        ctx.fillStyle = "blue";
        ctx.fillRect(0,0,can.width,can.height);
        clearInterval(intervalId);
        intervalId = null;
    }
    ShowRect(x2,y2, "white");
    ShowPoisonRect();
}
init();
let intervalId = setInterval(animation, 200);