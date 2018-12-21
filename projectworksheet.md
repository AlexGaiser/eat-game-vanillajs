# Project Overview Project 1 2018

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable | Status
|---|---| ---|
|Dec 18| Project Description | Complete
|Dec 18| Wireframes / Priority Matrix / Functional Components | Complete
|Dec 19| Core Application Structure (HTML, CSS, etc.) | Complete
|Dec 19| Pseudocode / actual code | Complete
|Dec 19| Initial Clickable Model  | Complete
|Dec 19| MVP | Complete
|Dec 20| Present | Incomplete



## Project Description
Game: Eat!
Block Character has to survive and become the largest block by eating smaller blocks and avoiding larger blocks. Player wins when they become the biggest!

## Wireframes

Upload images of wireframe to cloudinary and add the link here with a description of the specific wireframe.

https://res.cloudinary.com/dwjbby4sp/image/upload/v1545145033/IMG_2713.heic

## Priority Matrix

Include a full list of features that have been prioritized based on the `Time and Importance` Matrix.  

https://res.cloudinary.com/dwjbby4sp/image/upload/v1545145033/IMG_2713.heic

### MVP/PostMVP - 5min

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

#### MVP 
Character will move with user input. 
Character will be able eat smaller blocks
Character will be eaten by larger blocks 
Player will win by becoming the last or largest block

#### PostMVP 

Powerups for player including ability to eat larger blocks
Multiple levels
Random enemy block movement
Animations to transition from smaller to larger or on character death
Random generation of enemy block positions at start
Special enemy blocks that seek out the player

## Functional Components

Based on the initial logic defined in the previous sections try and breakdown the logic further into functional components, and by that we mean functions.  Try and capture what logic would need to be defined if the game was broken down into the following categories.


### Landing Page

Title screen with start button. 
In MVP+ will include ability to choose level and difficulty

### Game Initialization
Player begins in one corner of the game space and the space populates with enemy blocks. 
In MVP+ blocks will begin to move

### Playing The Game 
Player navigates with keyboard to avoid larger blocks and eat smaller blocks. Growing larger with each block they eat.
### Winning The Game
Player is the largest and/or last block on the board. 
The player loses by being touched by a larger block 

### Resetting The Game
When the player reaches an end state(win or loss) the game will display a victory screen and then will reset to the landing page. 
In MVP+ player will move on to next level. 

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe.

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Collision Detection Basic | 10 | 4hrs|6hrs| |
| Character Movement Basic | 10| 1hr| .5hrs|      |
| Collision Conditions | 10| 5hrs|3hrs|      |
| Collision Detection Advanced | 8 |4hrs| 8hrs|      |
| Enemy Movement Basic | 6 | 4hrs| 9hrs|      |
| PowerUps | 5 |1.5hrs|0|      |
| Title Screen Initial | 10 |0.5hrs| 0.5|      |
| Win Screen | 8 |0.5hrs|0.5|      |
| Advanced Graphics and Animations | 6|4hrs| 2hrs| |
| Total | H | 24.5hrs| 30hrs| |

## Helper Functions
Helper functions should be generic enought that they can be reused in other applications. Use this section to document all helper functions that fall into this category.

| Function | Description | 
| --- | :---: |  

| .querySelector() | find elements of DOM to manipulate with state of game |
| .createElement()| creates a new element in the DOM|
|.preventDefault()| prevents the default behavior of a keypress (for moving characters) |
|.filter()|I used filter to make sure I was only targeting the elements of my model that I wanted to work on|
|setInterval()|Used for managing hit detection and enemy movement|
|setTimeout|Useful for geting timing of events down and for implementing delays while other features loaded|
## Additional Libraries
 Use this section to list all supporting libraries and thier role in the project. 
No additional libraries used. 
## Code Snippet
Use this section to include a brief code snippet of functionality that you are proud of an a brief description  

I did not end up using this code, as it introduced bugs in the final data model I implemented and other solutions resulted in a better user experience. However, I wanted to included it here because it is the first major hurdle I overcame on this project and is the most interesting component I implemented. 

This function recursively eliminates any blocks with the given parameters which are in collision. The way this is implemented, it will remove blocks even when there are multiple overlapping blocks. It also does NOT remove both blocks which are touching. The design of this function also lends it to use with generating initial playstates according to specified parameters, making it potenially very powerful in a more advanced version of the game. The code here is an attempt to implement the original verision with the new model. It was problematic and thus I cannot vouch for it's functionality in its current state. The earlier fully functional version is lost to time, but this version maintains of the original. 


```
   function collisionRemover(objects){
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
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  
There were many changes, including two major refactorings resulting from a change in data model. There were also many additional refactorings to clean the codebase.


## Issues and Resolutions
 Use this section to list of all major issues encountered and their resolution.
Most issues stemmed from the change in implementation philosphy to better separate view and model according to best practices. 
The majority of the code implemented is simple and functional in concept. It would benefit from a complete overhaul with a more unified/elegent.
#### SAMPLE.....
**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier                                
**RESOLUTION**: Missing comma after first object in sources {} object
