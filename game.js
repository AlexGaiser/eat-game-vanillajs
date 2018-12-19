const $gamespace = document.querySelector('.game-board')
const moveSpeed = 4

function makeBlock(height, width, divclass, positionX, positionY){
    newBlock = document.createElement('div')
    newBlock.className = divclass
    newBlock.height = height
    newBlock.width = width
    newBlock.divclass = divclass
    newBlock.x = positionX
    newBlock.y = positionY
    newBlock.style.left = (newBlock.x *pixelRatio) +'px'
    newBlock.style.top = (newBlock.y * pixelRatio) +'px'
    newBlock.style.height = height * pixelRatio +'px'
    newBlock.style.width = width*pixelRatio +'px'
    
    return newBlock
}
