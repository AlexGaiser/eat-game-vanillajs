  function overLapRemover(objects){
      let collide = false
      iter = 0
      objectArray =[]
      objects = Enemies
      for(let i = 0; i<objects.length-1; i++){
          iter +=1
          for (let a =iter; a< objects.length; a++) {
              if (checkCollision(objects[i], objects[a])){
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