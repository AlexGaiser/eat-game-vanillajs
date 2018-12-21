function Game(){
  
  
  // document.querySelector('.')
  document.body.addEventListener('keydown',move)
  console.log('start')
  // const $character = document.createElement('div')
  try{
    let $button = document.querySelector('.btn')
    $button.remove()
  }
  catch{}
  const $gamespace = document.querySelector('.game-board')
  const moveSpeed = 2
  const pixelRatio = 6
  const moveIncrement = .5
  const Enemies = []
  const character = new Enemy(2,2,1,'box', 'character', 0,0)

  const $character = document.createElement('div')
        $character.classList.add(character.divclass)
        $character.classList.add(character.enemyClass)
        $character.style.top = character.x * pixelRatio +'px'
        $character.style.left = character.y * pixelRatio +'px'
        $character.style.height = character.height * pixelRatio +'px'
        $character.style.width = character.width *pixelRatio +'px'
        $character.id = character.enemyClass+character.enemyId
        $character.$el = character

  character.$el = $character


  $gamespace.append($character)

  let enemy = null

  let playGrid = {x:100,
                  y:100}


  renderInitial()




  function Enemy(height, width, enemyId, divclass, enemyClass, positionX, positionY){
      this.divclass = divclass
      this.height = height
      this.width = width
      this.enemyClass = enemyClass    
      this.x = positionX
      this.y = positionY
      this.enemyId = enemyId
  }

  function createEnemies(number, height, width, enemyId, divclass, enemyClass, positionX, positionY){
    for(let i = 0; i<number; i++){
      enemy = new Enemy(height, width, enemyId, divclass, enemyClass, Math.random() * positionX, Math.random() * positionY)
      enemy.enemyId =  enemyClass+i    
      Enemies.push(enemy)
    }
  }

  console.log(Enemies)

  function renderInitial(){
    createEnemies(20, 10, 10, 1, 'block', 'medium', 89, 89)
    createEnemies(10, 7 , 7, 1, 'block', 'small', 90, 90)


    createEnemies(50, 1 , 1, 1, 'block', 'food', 99, 99)

    createEnemies(25, 15, 15,1, 'block', 'large', 74, 74)

    createEnemies(10,5,5,1,'block', 'small', 75,75)

  overLapRemover(Enemies)
      if (Enemies.length<40){
          renderInitial()
        }

  renderBlocks(Enemies)
  }
  function move(evnt) {
        const keyCode = evnt.keyCode;
        if ([37, 38, 39, 40].includes(keyCode)) {
          evnt.preventDefault();
        
        switch (keyCode) {
          case 37:  
            moveLeft(); 
            break;
          case 38:
            moveUp();
            break;
          case 39:
            moveRight();
            break;
          case 40:
            moveDown();
            break;
        }
        charCollision(character, Enemies)
      }
  }
  function moveLeft() {
      let potentialMove = Object.assign({}, character)
      potentialMove.x -= moveSpeed
      if (inGrid(potentialMove)){
          character.x = potentialMove.x
          character.$el.style.left = (character.x) * pixelRatio +'px' 
      }
      else{
          return
      }

  } 
  function moveRight() {
      potentialMove = Object.assign({}, character)
      potentialMove.x += moveSpeed
      if (inGrid(potentialMove)){
          character.x = potentialMove.x
          character.$el.style.left = (character.x) * pixelRatio +'px' 
          console.log(character.x)
      }
      else{
          return
      }

  } 
  function moveUp() {
      potentialMove = Object.assign({}, character)
      potentialMove.y -= moveSpeed
      if(inGrid(potentialMove)){
          character.y = potentialMove.y
          character.$el.style.top = (character.y) * pixelRatio +'px' 
      }
      else{
          return
      }
  } 
  function moveDown() {
      potentialMove = Object.assign({}, character)
      potentialMove.y += moveSpeed
      if (inGrid(potentialMove)){
          character.y = potentialMove.y
          character.$el.style.top = (character.y) * pixelRatio +'px' 
      }
      else{
          return
      }
  }
  function renderBlocks(blocks, divclass){
    for(let element of document.querySelectorAll(divclass)){
      element.remove()
    }
    if (blocks.length>1){
    for (let item of blocks){  
        let $item = document.createElement('div')
        $item.classList.add(item.divclass)
        $item.classList.add(item.enemyClass)
        $item.style.left = item.x * pixelRatio +'px'
        $item.style.top = item.y * pixelRatio +'px'
        $item.style.height = item.height * pixelRatio +'px'
        $item.style.width = item.width *pixelRatio +'px'
        $item.id = item.enemyId
        $gamespace.append($item)
        item.$el = $item
      }
    }
  }

  function moveEnemies (enemies){
      let modifyX;
      let modifyY;
      for (let i = 0; i<enemies.length;i++){
        if(Math.random() >0.5 ){
            modifyX = moveIncrement * Math.random()
        }
        else{
          modifyX = -1 *moveIncrement *Math.random()
        }
        if (Math.random() >0.5){
          modifyY =  1 *moveIncrement* Math.random()
        }
        else{
          modifyY = -1 * moveIncrement * Math.random()
        }
        
        enemyMove = Object.assign({}, enemies[i])
            enemyMove.x += modifyX
            enemyMove.y += modifyY
            if (inGrid(enemyMove)){
              enemies[i].x += modifyX
              enemies[i].$el.style.left = (enemies[i].x*pixelRatio) + 'px'    
              enemies[i].y += modifyY
              enemies[i].$el.style.top = (enemies[i].y *pixelRatio) + 'px'
        }
      }
  }
  function isFood(objectArray){
    let food = Enemies.filter((enemy => enemy.height<character.height))
    for(let item of food){
      // item.enemyClass= 'food'
      item.$el
      item.$el.classList.add('food')
    }
  }




  function checkCollision(object1, object2){
      if (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
              object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
          console.log('collision')
          return true
      }
  }
  function charCollision(character,objectArray){
    for (let i =0;  i<objectArray.length; i++){    
      if (checkCollision(character,objectArray[i])){
         if (character.height > objectArray[i].height){
            objectArray[i].$el.remove()
            console.log(objectArray[i].$el)
            console.log(objectArray[i].enemyId)
            // console.log(objectArray[i].$el.parentNode())
            // let $element = document.getElementById(objectArray[i].enemyId)
            // console.log('#' +objectArray[i].enemyId)
            // $element.remove()
            objectArray.splice(i,1)

            character.height +=.5
            character.width += .5
            character.$el.style.height = (character.height * pixelRatio) +'px'
            character.$el.style.width = (character.width * pixelRatio) +'px'
         }
         else{
          location.reload()
         }
      }
    }
  }
  function overLapRemover(objects){
      let collide = false
      iter = 0
      objectArray =[]
      objects = Enemies
      for(let i = 0; i<objects.length-1; i++){
          iter +=1
          for (let a =iter; a< objects.length; a++) {
              if (checkCollision(objects[i], objects[a])){
                  // objects[i].$el.remove()
                  objects.splice(i,1)        
                  // objects.$el.remove()
                  overLapRemover(objects)
                  collide = true
              }           
          }
      }
      if(collide === true){
          overLapRemover(objects)
      }
      else{
        return  
      }
      
  }


  function inGrid(object){
     if (object.x < 0 || object.y < 0 || object.x +object.height > 100 || object.y +object.height> 100) {
      // alert('out of grid')
      return false
    }
    return true
  }



  function checkWin(){
    let enemies = Enemies
    // return Enemies.filter((enemy => enemy.height>character.height)).length<=0
    return character.height> 15
  }

  function update(){
    // window.requestAnimationFrame(update)
    moveEnemies(Enemies)
    // renderBlocks(character, '.box')
    // renderBlocks(Enemies, '.block')
    isFood(Enemies)

    if (checkWin()){
      clearInterval(gameUpdate)
      setTimeout( function(){
        let endGameButton = document.createElement('button')
        endGameButton.addEventListener('click', Game)
        endGameButton.classList.add('btn')
        endGameButton.style.opacity = "0.9"
        endGameButton.style.textAlign ="center"
        endGameButton.innerHTML = 'Again?'

        $gamespace.append(endGameButton)
      }, 1500)
    }
    else{
      return
    }
  }
  // window.requestAnimationFrame(update)
  let gameUpdate = setInterval(update, 100)
  setInterval(function(){checkCollision(character, Enemies)}, 5)
}
function startGame(){
  let $title = document.getElementById('title')

  let $button = document.querySelector('.btn')
  try{
  $button.classList.add('fade')
  }
  catch{}
  $title.classList.add('fade')
  
  setTimeout(function(){$button.remove()}, 1500)
  setTimeout(Game, 1505)
} 
// Game()