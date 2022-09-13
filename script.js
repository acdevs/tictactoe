function checkLine(){
    if (! navigator.onLine){
        document.getElementById('loader').style.display='none';
    } 
}

function loader(){
    document.getElementById('loader').style.display='none';
}

function coverIt(){
    var cover=document.getElementById('cover');
    var retry=document.getElementById('retry');
    cover.style.display='block';
    fxretry();
    retry.style.display='block';
    retry.style.animationName='boing';
}

function color(){
    colorList=[
    '#E53935',
    '#3949AB',
    '#039BE5',
    '#43A047',
    '#FFB300',
    '#FB8C00',
    ]
    var i=Math.floor(Math.random()*colorList.length);
    var root=document.documentElement;
    var mt2=document.getElementsByTagName('meta')[1];
    root.style.setProperty('--cs', colorList[i]);
    mt2.content=colorList[i];
}

/****************SOUND EFFFECTS******************/
var checkSoundOn=true;

function preload(){
    document.getElementById('oxpop').load();
    document.getElementById('retrypop').load();
}

function fxpop(){
    if (checkSoundOn){
    document.getElementById('oxpop').play();
    }
}
function fxretry(){
    if (checkSoundOn){
    document.getElementById('retrypop').play();
    }
}
/************************************************/

var gameState=true;
var clicks=0;
var max=9;
var turn=document.getElementById('turn');

var ttt=[[null,null,null],
         [null,null,null],
         [null,null,null]];

function check(event){
    fxpop();
    event.style.animationName='boing';
    event.style.cursor='not-allowed';
    event.removeAttribute('onclick');
    index=event.id;
    x=parseInt(index[1]);
    y=parseInt(index[3]);
    
    if (clicks%2==0){
        if(event.innerHTML==''){
            event.innerHTML='O';
            ttt[x][y]=0;
            turn.innerHTML="thinking";
        }
    }
    else{
        if(event.innerHTML==''){
            event.innerHTML='X';
            ttt[x][y]=1;
            turn.innerHTML="make a move";
        }
        
    }
    clicks=clicks+1;

    for (i=0;i<3;i++){
        if (ttt[i][0]==0 && ttt[i][1]==0 && ttt[i][2]==0){
            turn.innerHTML="'O' Won !";
            gameState=false;
            break;
                }
        else if(ttt[i][0]==1 && ttt[i][1]==1 && ttt[i][2]==1){
            turn.innerHTML="'X' Won !";
            gameState=false;
            break;
        }
        else if(ttt[0][i]==0 && ttt[1][i]==0 && ttt[2][i]==0){
            turn.innerHTML="'O' Won !";
            gameState=false;
            break;
        }
        else if(ttt[0][i]==1 && ttt[1][i]==1 && ttt[2][i]==1){
            turn.innerHTML="'X' Won !";
            gameState=false;
            break;
        }
    }
        
    if(ttt[0][0]==1 && ttt[1][1]==1 && ttt[2][2]==1){
        turn.innerHTML="'X' Won !";
        gameState=false;

    }
    else if(ttt[0][0]==0 && ttt[1][1]==0 && ttt[2][2]==0){
        turn.innerHTML="'O' Won !";
        gameState=false;

    }
    else if(ttt[0][2]==1 && ttt[1][1]==1 && ttt[2][0]==1){
        turn.innerHTML="'X' Won !";
        gameState=false;

    }
    else if(ttt[0][2]==0 && ttt[1][1]==0 && ttt[2][0]==0){
        turn.innerHTML="'O' Won !";
        gameState=false;
    }
    if (gameState && clicks == max){
        turn.innerHTML='Drawn !';
        gameState=false;
    }
    
    if (gameState && clicks%2 != 0){
        automateClick();
    }
    
    if(!gameState){
        coverIt();
    }
}

/******************thinking*****************/

function randomClick(){
    var spaces=[];
    for(m=0;m<3;m++){
            for(n=0;n<3;n++){
                if (ttt[m][n] != 0 && ttt[m][n] != 1) {
                    spaces.push('x'+m.toString()+'y'+n.toString());
                }
            }
        }
    index=Math.floor(Math.random()*spaces.length);
    id=spaces[index];
    return id;
}

function automateClick(){
    
    function cutCheck(ox,rm,random=true){
        if (ttt[0][0]==ox && ttt[0][1]==ox && ttt[0][2] != rm){
            id='x0y2';
        }else if (ttt[0][0]==ox && ttt[0][2]==ox && ttt[0][1] != rm){
            id='x0y1';
        }else if (ttt[0][1]==ox && ttt[0][2]==ox && ttt[0][0] != rm){
            id='x0y0';
        }else if (ttt[1][0]==ox && ttt[1][1]==ox && ttt[1][2] != rm){
            id='x1y2';
        }else if (ttt[1][0]==ox && ttt[1][2]==ox && ttt[1][1] != rm){
            id='x1y1';
        }else if (ttt[1][1]==ox && ttt[1][2]==ox && ttt[1][0] != rm){
            id='x1y0';
        }else if (ttt[2][0]==ox && ttt[2][1]==ox && ttt[2][2] != rm){
            id='x2y2';
        }else if (ttt[2][0]==ox && ttt[2][2]==ox && ttt[2][1] != rm){
            id='x2y1';
        }else if (ttt[2][1]==ox && ttt[2][2]==ox && ttt[2][0] != rm){
            id='x2y0';
        }else if (ttt[0][0]==ox && ttt[1][0]==ox && ttt[2][0] != rm){
            id='x2y0';
        }else if (ttt[0][0]==ox && ttt[2][0]==ox && ttt[1][0] != rm){
            id='x1y0';
        }else if (ttt[1][0]==ox && ttt[2][0]==ox && ttt[0][0] != rm){
            id='x0y0';
        }else if (ttt[0][1]==ox && ttt[1][1]==ox && ttt[2][1] != rm){
            id='x2y1';
        }else if (ttt[0][1]==ox && ttt[2][1]==ox && ttt[1][1] != rm){
            id='x1y1';
        }else if (ttt[1][1]==ox && ttt[2][1]==ox && ttt[0][1] != rm){
            id='x0y1';
        }else if (ttt[0][2]==ox && ttt[1][2]==ox && ttt[2][2] != rm){
            id='x2y2';
        }else if (ttt[0][2]==ox && ttt[2][2]==ox && ttt[1][2] != rm){
            id='x1y2';
        }else if (ttt[1][2]==ox && ttt[2][2]==ox && ttt[0][2] != rm){
            id='x0y2';
        }else if (ttt[0][0]==ox && ttt[1][1]==ox && ttt[2][2] != rm){
            id='x2y2';
        }else if (ttt[0][0]==ox && ttt[2][2]==ox && ttt[1][1] != rm){
            id='x1y1';
        }else if (ttt[1][1]==ox && ttt[2][2]==ox && ttt[0][0] != rm){
            id='x0y0';
        }else if (ttt[0][2]==ox && ttt[1][1]==ox && ttt[2][0] != rm){
            id='x2y0';
        }else if (ttt[2][0]==ox && ttt[0][2]==ox && ttt[1][1] != rm){
            id='x1y1';
        }else if (ttt[2][0]==ox && ttt[1][1]==ox && ttt[0][2] != rm){
            id='x0y2';
        }else if(random){
            id=randomClick();
        }else{
            id='';
        }
        return id;
    }
    
    var id='';
    if(clicks == 1){
        id=randomClick();
    }
    else if(clicks == 3){
        id=cutCheck(0,1,random=false);
        if(!id){
            id=cutCheck(1,0);
        }
    }
    else if(clicks == 5){
        id=cutCheck(1,0,random=false);
        if (!id){
            id=cutCheck(0,1);
        }
    }
    else if(clicks == 7){
        id=cutCheck(1,0,random=false);
        if (!id){
            id=cutCheck(0,1);
        }
    }
    setTimeout(function(){document.getElementById(id).click();},750);
}
