/////Fundamental game variable/////
var scores, roundscores, activeplayer, gameplaying;



init();


///// DOM MANIPILATOR 
//document.querySelector('#current-' + activeplayer).textContent = dice;
////////document.querySelector('#current-' + activeplayer).innerHTML = '<em>' + dice + '</em>'

////var x = document.querySelector('#score-0').textContent;
////console.log(x);





 document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;




document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gameplaying) {
         var dice = Math.floor(Math.random() * 6) + 1;
         
        
    ////// 2. display the result
    document.querySelector('.dice').style.display = 'block';
    
    document.querySelector('.dice').src = 'dice-' + dice + '.png';
   
   /////update the roundscore if the score is not 1
           
    if (dice !== 1 ) {
        roundscores += dice
        document.querySelector('#current-' + activeplayer).textContent = roundscores;   
    }
         else {
      nextplayer();
    }
        /*
    if (dice !== 1) {
        roundscores += dice
        document.querySelector('#current-' + activeplayer).textContent = roundscores;   
    }
        else if (lastdice === 6 && dice ===  6) {
            activeplayer === 0  ? activeplayer = 1 : activeplayer = 0;
        scores[activeplayer] = 0;
    document.getElementById('score-' + activeplayer).textContent = 0;
            nextplayer();
        }
    else {
      nextplayer();
    }
      lastdice = dice;
        
        
    }
    */
    //////1 random number
        
    }
   
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gameplaying)  {
      scores[activeplayer] += roundscores;
      
    
    ////update the ui
    
    document.querySelector('#score-' + activeplayer).textContent = scores[activeplayer];
      var input = document.querySelector('.final-score').value;
      var winningscore;
      if (input) {
          winningscore = input;
      }
      else winningscore = 100;
    if (scores[activeplayer] >= winningscore) {
        document.querySelector('#name-' + activeplayer).textContent = 'WINNER!';
       document.getElementById('dice').style.display = 'none';
        document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');
         document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
        gameplaying = false;
        
    }
    else {
   nextplayer();
    /////check if player won the game///
    }
  }
    
    
    
    
    
    /////next player///
});

function nextplayer() {
     activeplayer === 0  ? activeplayer = 1 : activeplayer = 0;
        roundscores = 0;
        
        //////change the roundscore interface to 0
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        //////////toggle the html elements//////
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        /////hide the dice if its 1
     document.querySelector('.dice').style.display = 'none';
   
    }
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activeplayer = 0;
    roundscores = 0;
    gameplaying = true;
     document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.add('active');
}