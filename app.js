document.body.addEventListener('keydown',move)
console.log('start')
// const $character = document.createElement('div')
const $gamespace = document.querySelector('.game-board')
const moveSpeed = 2
const pixelRatio = 6

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

$gamespace.append($character)

let enemy = null




let playGrid = {x:100,
                y:100}


 


// function makeBlock(height, width, divclass, positionX, positionY){
//     newBlock = document.createElement('div')
//     newBlock.className = divclass
//     newBlock.height = height
//     newBlock.width = width
//     newBlock.divclass = divclass    
//     newBlock.x = positionX
//     newBlock.y = positionY
//     newBlock.style.left = (newBlock.x *pixelRatio) +'px'
//     newBlock.style.top = (newBlock.y * pixelRatio) +'px'
//     newBlock.style.height = height * pixelRatio +'px'
//     newBlock.style.width = width*pixelRatio +'px'
//        return newBlock
// }


   
function Enemy(height, width, enemyId, divclass, enemyClass, positionX, positionY){
    // this.newBlock = document.createElement('div')
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
    Enemies.push(enemy)
  }
}

console.log(Enemies)


createEnemies(10, 5, 5, 1, 'block', 'medium', 95, 95)

createEnemies(40, 1 , 1, 1, 'block', 'food', 99, 99)

createEnemies(15, 12, 12,1, 'block', 'large', 84, 84)

createEnemies(20,5,5,1,'block', 'small', 95,95)

// console.log(Enemies.length)

console.log(Enemies)


function renderBlocks(blocks, divclass){
  for(let element of document.querySelectorAll(divclass)){
    element.remove()
  }
  console.log(blocks)
  if (blocks.length>1){
  console.log('blocks rendered')
  for (let item of blocks){  
      console.log(item)
      console.log(item.classList)
      let newDiv = document.createElement('div')
      newDiv.classList.add(item.divclass)
      e.classList.add(item.enemyClass)
      item.style.left = item.x * pixelRatio +'px'
      item.style.top = item.y * pixelRatio +'px'
      item.style.height = item.height * pixelRatio +'px'
      item.style.width = item.width *pixelRatio +'px'
      item.id = blocks.enemyClass+blocks.enemyId
      blocks.$el = item
      $gamespace.append(block)
    }
  }
  else {
    let block = document.createElement('div')
      block.classList.add(blocks.divclass)
      block.classList.add(blocks.enemyClass)
      block.style.left = blocks.x * pixelRatio +'px'
      block.style.top = blocks.y * pixelRatio +'px'
      block.style.height = blocks.height * pixelRatio +'px'
      block.style.width = blocks.width *pixelRatio +'px'
      block.id = blocks.enemyClass+blocks.enemyId
      enemy.$el = block
      $gamespace.append(block)
  }
}

overLapRemover(Enemies)


console.log(Enemies)

function overLapRemover(objects){
    let collide = false
    iter = 0
    objectArray =[]
    objects = Enemies
    for(let i = 0; i<objects.length-1; i++){
        iter +=1
        for (let a =iter; a< objects.length; a++) {
            if (collision(objects[i], objects[a])){
                // objects[i].$el.remove()
                objects.splice(i,1)
                
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


function renderChar(block){
      console.log('running')
      block = document.createElement('div')
      block.classList.add(enemy.divclass)
      block.classList.add(enemy.enemyClass)
      block.style.left = enemy.x * pixelRatio +'px'
      block.style.top = enemy.y * pixelRatio +'px'
      block.style.height = enemy.height * pixelRatio +'px'
      block.style.width = enemy.width *pixelRatio +'px'
      block.id = enemy.enemyClass+enemy.enemyId
      enemy.$el = block
      $gamespace.append(block)
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
        // setTimeout(Eat,100)
    }
}


function moveLeft() {
    let potentialMove = Object.assign({}, character)
    potentialMove.x -= moveSpeed
    if (inGrid(potentialMove)){
        character.x = potentialMove.x
        $character.style.left = (character.x) * pixelRatio +'px' 
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
        $character.style.left = (character.x) * pixelRatio +'px' 
        console.log(character.x)
    }
    else{
        return
    }

} 

function moveUp() {
    potentialMove = Object.assign({}, character)
    potentialMove.y -= moveSpeed
    if (inGrid(potentialMove)){
        character.y = potentialMove.y
        $character.style.top = (character.y) * pixelRatio +'px' 
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
        $character.style.top = (character.y) * pixelRatio +'px' 
    }
    else{
        return
    }
}



function collision(object1,object2){
    if (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
            object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
        console.log('collision')
        return true
    }
}

function Eat(){
    // let obstacles = document.querySelectorAll('obstacles')
    let enemy = Enemies
    for (let i =0;  i<enemy.length; i++){
        if (collision(character, enemy[i]))
            if (character.height > Enemies[i].height){
                Enemies.splice(i,1)
                character.height += 1
                character.width += 1
                $character.style.height = character.height*pixelRatio + 'px'
                $character.style.width =  character.width * pixelRatio + 'px'
                console.log($character)
            }
            else{
                location.reload()
            }
    }
}



            
// function checkEat(){

//     let obstacles = document.querySelectorAll('.obstacle')
//     for (let obstacle of obstacles){
//         if (collision($character, obstacle)){
//             if ($character.height > obstacle.height){
//                 obstacle.remove()
//                 $character.height += 1
//                 $character.width += 1
//                 $character.style.height = $character.height*pixelRatio + 'px'
//                 $character.style.width =  $character.width * pixelRatio + 'px'
//             }
//             else{
//                 location.reload()
                
//             }
//         }
//     }

// }


function checkWin(){
  let enemies = Enemies
  return Enemies.filter((enemy => enemy.height>character.height)).length<=0
 
}


function inGrid(object){
   if (object.x < 0 || object.y < 0 || object.x +object.height > 100 || object.y +object.height> 100) {
    // alert('out of grid')
    return false
  }
  return true;
}


function update(){
  
  renderBlocks(Enemies, '.block')
  renderBlocks(character, '.box')




  if (checkWin()){
    setTimeout( function(){
      alert('You won')
      location.reload()
    }, 1500)
  }
  else{
    return
  }
}
setInterval(update, 500)
