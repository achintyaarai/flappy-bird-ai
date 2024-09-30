var cvs = document.getElementById("canvas");
var ctx = cvs.getContext('2d');
var cntx = cvs.getContext('2d');
var pause = false;
    var ais;
const network = new brain.NeuralNetwork();
network.train([
    {input:[373,-60,165],output:[1]},
    {input:[70,50,54],output:[1]},
    {input:[0,20,80],output:[1]},
    {input:[2,93,8],output:[0]},
    {input:[30,83,19],output:[0]},
    {input:[-2,3,97],output:[1]},
    {input:[120,25,125],output:[1]},
    {input:[0,100,1],output:[1]},
    {input:[20,120,20],output:[0]},
    {input:[100,155,-30],output:[0]},
    {input:[5,90,55],output:[0]},
    {input:[60,-20,145],output:[1]},
    {input:[60,1000,-1000],output:[0]},
    {input:[20,-70,134],output:[1]},
    {input:[10,3,102],output:[1]},
    ]);
var bird1 = new Image();
var bg = new Image();
var fg = new Image();
var bgx=0;
var pausem = new Image();

var HDist;
var VDist1;
var VDist2;
var aihdist=10;
var aivdist1=12;
var aivdist2=13;
var spiken = new Image();
var spikes = new Image();
var bird2 = new Image();
var gap=125;
var constant=spikes.height+gap;
pausem.src = "PMD.png";
bird1.src = "playerbird.png";
bird2.src = "hellbird.png";
spiken.src = "spike.png";
spikes.src = "spikesouth.png";
fg.src = "foreground.png";
bg.src = "background.png";
var bg = document.getElementById('bg');
var sx=200;
var sy=0;
var aix=10;
var aiscore=0;
var aidead = false;
var aiy=160;
var bx=10;
var score=0;
var pace = 3;
var by=150;
var gravity=2.7;
var agravity=2.7;
var fgx = 0;
var pipe=[];
pipe[0]={
    x:cvs.width,
    y:0,
}
if(pause==false){
document.addEventListener("keydown",function (event){
    
    if(event.code=='KeyP'){pause = pause?false:true;}
    if(!pause && event.code!='KeyP')
    moveUp();
});}
function moveUp(){
    
 
    by-=15;
    
}

function cmoveUp(){
    by-=45;
}
function aimoveUp(){
    aiy-=15;
}
function draw(){
    ctx.clearRect(0,0,400,500);
ctx.drawImage(bg, bgx, 0);

if(!pause){
for(var i=0;i<pipe.length;i++){
    spikes.onload = ctx.drawImage(spikes, pipe[i].x, pipe[i].y,30,200);
    spiken.onload = ctx.drawImage(spiken, pipe[i].x, pipe[i].y+constant*2.65,30,530);
pipe[i].x-=pace;
if(pipe[i].x<=-32){
    pipe[i].x=400;
    pipe[i].y=0;
    score+=1;
    pipe[i].y-=Math.floor((Math.random() * 200));

}
HDist = (pipe[i].x-(bx+20));
VDist1 = (-1*((by+20)-(pipe[i].y+200+125)));
VDist2 = (-1*((pipe[i].y+200)-by));
aihdist = (pipe[i].x-(aix+20));
aivdist1 = (-1*((aiy+20)-(pipe[i].y+200+125)));
aivdist2 = (-1*((pipe[i].y+200)-aiy));
if(aiy>=435)
{
    aidead = true;
    aiy = 2000;}
if((aix+20)>=pipe[i].x && aix<=pipe[i].x+spikes.width)

{
    if(((aiy+20)<pipe[i].y+200+125 && (aiy)>pipe[i].y+200 ) )
    {
        aiscore+=1;
    }
    else{
       {
           aidead = true;
           aiy = 2000;
    }}pace+=0.008;}
if(by>=435)
{if(aidead==false){if(!alert("gameover , score : " + score/21+ "   ,aiscore : "+aiscore/21 +"  YOU LOSE!!!"))window.location.reload();}
else if(aidead==true){if(!alert("gameover , score : " + score/21+ "   ,aiscore : "+aiscore/21+"  YOU WIN!!!"))window.location.reload();}
}
if((bx+20)>=pipe[i].x && bx<=pipe[i].x+spikes.width)

{
    if(((by+20)<pipe[i].y+200+125 && (by)>pipe[i].y+200 ) )
    {
        score+=1;
    }
    else{
        if(aidead==false)
       {if(!alert("gameover , score : " + score/21+ "   ,aiscore : "+aiscore/21+"  YOU LOSE!!!")){window.location.reload();
    }
    }
else if(aidead==true){if(!alert("gameover , score : " + score/21+ "   ,aiscore : "+aiscore/21+"  YOU WIN!!!")){window.location.reload();
}}pace+=0.008;}}}}
    fg.onload =  ctx.drawImage(fg, fgx,500-50,800,50);
    
    
    bird1.onload =  ctx.drawImage(bird1, bx, by,20,20);
    bird2.onload =  ctx.drawImage(bird2, aix, aiy,20,20);
    if(!pause){
    fgx-=6;
    bgx-=2;
    if(bgx<=-799)bgx=0;
    if(fgx<=-399)fgx=0;
    
by=by+gravity;
aiy=aiy+agravity;
sx-=2.5;
if(aidead==false){
    const result = network.run([aihdist,aivdist1,aivdist2]);
if(result>=0.5){aimoveUp();}
ais=aiscore;}}

pausem.onload =ctx.drawImage(pausem,0,0);

if(pause){
    pausem.src = "pausemenu.png";
    
}
else{
pausem.src = "PMD.png";
}
requestAnimationFrame(draw);
}

draw();