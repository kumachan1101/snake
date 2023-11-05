var can = document.getElementById("can");
var ctx = can.getContext("2d");
let x_point;
let y_point;

let snakelist = [];
let poisonlist = [];
var direction = "ArrowRight";
var RECT_SIZE = 32;


const btn_up = document.getElementById("up");
btn_up.onclick  = function(){
    direction = "ArrowUp";
};

const btn_down = document.getElementById("down");
btn_down.onclick  = function(){
    direction = "ArrowDown";
};

const btn_left = document.getElementById("left");
btn_left.onclick  = function(){
    direction = "ArrowLeft";
};

const btn_right = document.getElementById("right");
btn_right.onclick  = function(){
    direction = "ArrowRight";
};


class Pos{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

function keydownEvent(event){ 
    
    switch(event.key){
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "ArrowDown":
            direction = event.key;
            break;
        default:
            break;
    }
}

function init(){
    can.width = RECT_SIZE *20;
    can.height = RECT_SIZE *20;

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
    while(true){
        x_point = Math.floor( Math.random() * (can.width / RECT_SIZE) );
        y_point = Math.floor( Math.random() * (can.height / RECT_SIZE) ); 
        if(false == IsPoison(x_point, y_point) && false == IsSnake(x_point, y_point)){
            break;
        }
    }
}

function IsPoison(x, y){
    for(i =0; i < poisonlist.length; i++){
        if(poisonlist[i].x == x && poisonlist[i].y == y){
            return true;
        }
    }
    return false;
}

function JudgePoint(){
    // 先頭で判定
    if(x_point == snakelist[0].x && y_point == snakelist[0].y){
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
            return null;
    }
    let cAddPos = new Pos(x,y);
    return cAddPos;
}

function AddRect(){
    while(true){
        let len = snakelist.length;
        let cLastPos = snakelist[len-1];
        let cAddPos = this.GetAddPos(cLastPos);
        if(null != cAddPos){
            snakelist.push(cAddPos);
            break;
        }
    }
}

function ShowRect(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*RECT_SIZE,y*RECT_SIZE,RECT_SIZE,RECT_SIZE);
}

function RndPoisonRect(){
    let cnt = 5;

    while(cnt > 0){
        let x = Math.floor( Math.random() *  (can.width / RECT_SIZE) );
        let y = Math.floor( Math.random() *  (can.height / RECT_SIZE) );
        if(x != x_point && y != y_point && !IsSnake(x ,y)){
            poisonlist.push(new Pos(x,y)); 
        }
        cnt--;
    }
}

function IsSnake(x,y){
    for (let index = 0; index < snakelist.length; index++) {
        if(x == snakelist[index].x && y == snakelist[index].y){
            return true;
        }
    }
    return false;
}

function ShowPoisonRect(){
    for(i =0; i < poisonlist.length; i++){
        ShowRect(poisonlist[i].x, poisonlist[i].y, "red");
    }    
}

function JudgePoison(){
    for(let i =0; i < poisonlist.length; i++){
        if(snakelist[0].x == poisonlist[i].x && snakelist[0].y == poisonlist[i].y){
            return true;
        } 
    }    
    return false;
}

function JudgeOutCanvas(){
    if(snakelist[0].x < 0){
        return true;
    }
    if(snakelist[0].y < 0){
        return true;
    }
    if(can.width/RECT_SIZE-1 < snakelist[0].x){
        return true;
    }
    if(can.height/RECT_SIZE-1 < snakelist[0].y){
        return true;
    }
    return false;        
}

function animation(){
    //ctx.clearRect(0,0,can.width,can.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,can.width,can.height);

    UpdatePos();
    ShowListRect();
    if(JudgePoint()){
        AddRect();
        RndRect();
        RndPoisonRect(5);
    }
    else if(JudgePoison() || JudgeOutCanvas()){
        ctx.fillStyle = "blue";
        ctx.fillRect(0,0,can.width,can.height);
        clearInterval(intervalId);
        intervalId = null;
        ShowListRect();
    }
    ShowRect(x_point,y_point, "white");
    ShowPoisonRect();
}
init();
let intervalId = setInterval(animation, 200);
