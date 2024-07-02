//interface for inputs and outputs
const { off } = require('process');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(questionText) { // this is the same as using a rl.question, ask is just for user input, rl does stuff with that information
  return new Promise((resolve) => {
    rl.question(questionText, resolve);
  });
}



let restaurantRooms = { 
  diningRoom: {
    roomDescription: 'You are in the dining room, you look around and see darkness filled with cobwebs and misery, you keep looking and notice on the center table two jars, one labeled flour dough and the other cauliflower dough, you scratch your head thinking what does true to myself mean?',
    roomInventory: ['flour dough', 'cauliflower dough']
  },
  kitchen: {
    roomDescription: 'The kitchen..., what is normally filled with screams and orders is now so quiet, you can hear a pin drop, you look around again, this time seeing two bowls on a table, one labeled Robertos special sauce, the other is sauce.. but it smells weird.. in the middle inbedded into the table is the ladle your dad once gave you, I miss you dad, rip Demitri.',
    roomInventory: ['special sauce', 'stinky sauce']
  },
  coldStorage: {
    roomDescription: 'The cold storage..., its oddly warm, Gordon Ramsay would be pissed at these temps, you hear a crash in the corner, a box has fallen with pepperoni inside, you might have crapped yourself, dont tell anyone, anyways... one side says pepperoni, the other says beyond meat sausage, another trick maybe?',
    roomInventory: ['pepperoni', 'beyond sausage']
  },
  office: {
    roomDescription: 'The office..., the please filled with hopes and bills, really just bills actually.. so many bills.. anyways, you look around again expecting something, but nothing, upon checking your filing cabinet you find two different cheeses, who the hell files cheese, whatever. One cheese is buffalo mozzarella, the other is marys almost cheese, sounds gross..',
    roomInventory: ['mozzarella', 'marys cheese']
  },
  ovenRoom: {
    roomDescription: 'The oven room..., the heart of the restaurant, the place where the magic happens.. you wish Roberto.. your oven is lit and a note in front reads, You made it! put the right ingredients in to leave this place and return to your life, or else be transported to a juice bar in California working under stacy.. trust me, no one likes stacy.. dont mess up.',
    oven: ['']
  }
}

let restaurantRoomState = { //what rooms the player can move to in the state machine
  diningRoom: ['kitchen'],
  kitchen: ['diningRoom', 'coldStorage'],
  coldStorage: ['kitchen', 'office'],
  office: ['coldStorage', 'ovenRoom'],
  ovenRoom: ['office']
}



function changeRoom(newRoom) { //function for getting to different rooms (state machine)
    
  let validTransition = restaurantRoomState[currentRoom];
    
    if (validTransition.includes(newRoom)) {
      currentRoom = newRoom;
      console.log(`You made it into the ${currentRoom}!\n`);
    } else {
      console.log(`You cannot go from ${currentRoom} to ${newRoom}`);
    }
}

let currentRoom = 'diningRoom'; //variable for starting room 
let playerRoomStatus = []; //variable for rooms the player has unlocked access too
let playerInventory = []; //variable to hold items in game
let correctIngredients = ['flour dough', 'special sauce', 'pepperoni', 'mozzarella'];//holds answer to the right ingredients 

function diningQuest() { //function for dining room, if player is in dining room the display the opening line and items in room, then adds chosen items to the players inventory 
  
  console.log(restaurantRooms[currentRoom].roomDescription)
  
  rl.question('What do you choose? (Flour Dough or Cauliflower Dough).\n', (answer) => { //question to ask what player wants in there inventory and upon player response will add that item
    if (answer.toLowerCase() === 'flour dough') {
      playerInventory.push('flour dough');
      console.log(`Your current inventory is ${playerInventory}`);
      riddleOne();
    } else if(answer.toLowerCase() === 'cauliflower dough') {
      playerInventory.push('cauliflower dough');
      console.log(`Your current inventory contains ${playerInventory}`);
      riddleOne();
    } else {
      console.log('Please pick one of the options shown!');
      diningQuest();
    }
  })
}

function riddleOne() { //Riddle to unlock the kitchen 
rl.question('When you picked up the item a door appereared with a lock on it, looks like it leads to the kitchen, the lock has 3 letter inputs and a question (What goes up but never comes down?)\n', (answer) => {
   if (answer.toLowerCase() === 'age') {
    changeRoom('kitchen');
    playerRoomStatus.push('diningRoom','kitchen');
    kitchenQuest();
   } else {
    console.log('Try again, every person has this...\n');
    riddleOne();
   }
})
}

function kitchenQuest() { //function for the kitchen, asks what ingredients they want and pushes them into the player inventory 
 
  console.log(restaurantRooms[currentRoom].roomDescription);
  
  rl.question('What do you choose? (special sauce or stinky sauce).\n', (answer) => {
    if (answer.toLowerCase() === 'special sauce') {
      playerInventory.push('special sauce');
      console.log(`Your current inventory is ${playerInventory}`);
      riddleTwo();
    } else if (answer.toLowerCase() === 'stinky sauce') {
      playerInventory.push('stinky sauce');
      console.log(`Your current inventory is ${playerInventory}`);
      riddleTwo();
    } else {
      console.log('Please pick one of the options shown!');
      kitchenQuest();
    }
  })
}
function riddleTwo() { //riddle to unlock the door to the cold storage
  rl.question('When you picked up the item a door appereared with a lock on it, looks like it leads to the cold storage, looks like this lock has 6 letter inputs, the question reads, (What do you throw out when you want to use it, but take in when you dont want to use it?) \n', (answer) => {
     if (answer.toLowerCase() === 'anchor') {
      changeRoom('coldStorage');
      playerRoomStatus.push('coldStorage');
      coldStorageQuest();
     } else {
      console.log('Try again, these are used in the water...\n');
      riddleTwo();
     }
  })
}

function coldStorageQuest() { //function for the cold storage room, asks what ingredients they want and pushes it into the player inventory 
  
  console.log(restaurantRooms[currentRoom].roomDescription);

  rl.question('What do you choose? (Pepperoni or Beyond Sausage).\n', (answer) => {
    if (answer.toLowerCase() === 'pepperoni') {
      playerInventory.push('pepperoni');
      console.log(`Your current inventory is ${playerInventory} `);
      riddleThree();
    } else if (answer.toLowerCase() === 'beyond sausage') {
      playerInventory.push('beyond sausage');
      console.log(`Your current inventory is ${playerInventory}`);
      riddleThree();
    } else {
      console.log('Please pick one of the options shown!');
      coldStorageQuest();
    }
  })
}

function riddleThree() { //riddle to unlock the door to the office
  rl.question('When you picked up the item a door appereared with a lock on it, looks like it leads to the cold storage, this lock also has 6 letter inputs, the question reads, (I can fly but have no wings. I can cry but I have no eyes. Wherever I go, darkness follows me. What am I?)\n', (answer) => {
     if (answer.toLowerCase() === 'clouds') {
      changeRoom('office');
      playerRoomStatus.push('office');
      officeQuest();
     } else {
      console.log('Try again, think fluffy...\n');
      riddleThree();
     }
  })
}

function officeQuest() { //function for the office room, asks what ingredients they want then pushes it into the player inventory 
  console.log(restaurantRooms[currentRoom].roomDescription);

  rl.question('What do you choose? (Mozzarella or Marys Cheese).\n', (answer) => {
    if (answer.toLowerCase() === 'mozzarella') {
      playerInventory.push('mozzarella');
      console.log(`Your current inventory is ${playerInventory} `);
      riddleFour();
    } else if (answer.toLowerCase() === 'marys cheese') {
      playerInventory.push('marys cheese');
      console.log(`Your current inventory is ${playerInventory}`);
      riddleFour();
    } else {
      console.log('Please pick one of the options shown!');
      officeQuest();
    }
  })
}

function riddleFour() { //riddle to unluck the door for the oven room
  rl.question('When you picked up the item a door appereared with a lock on it, looks like it leads to the cold storage, Another 6 letter combo, (Im tall when Im young, and Im short when Im old. What am I?)\n', (answer) => {
     if (answer.toLowerCase() === 'candle') {
      changeRoom('ovenRoom');
      playerRoomStatus.push('ovenRoom');
      ovenRoomQuest();
     } else {
      console.log('Try again, these were needed before 1879...\n');
      riddleFour();
     }
  })
}

let ovenInventory = [];

function ovenRoomQuest() { //function for oven room, shows what the player has and if there ready to add them to the oven then pushing them into the ovens inventory
  console.log(restaurantRooms[currentRoom].roomDescription);
  console.log(`Here is what you picked up so far, ${playerInventory}`)

  rl.question('Are you ready to add your ingrediants?(Y/N)\n', (answer) => {
    if (answer.toUpperCase() === 'Y') {
      ovenInventory.push(...playerInventory);
      finalInventoryCheck();
    } else {
      console.log('Should have thought of that before you got here then hu, im taking the ingredients regardless.')
      ovenInventory.push(...playerInventory);
      finalInventoryCheck();
    }
  })
}

function arraysAreEqual(arr1, arr2) { //function to check if the array length of the correct ingredients are the same as the players choices
  if (arr1.length !== arr2.length) {
    return false;
}
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
        return false;
    }
}
  return true;
}    
function finalInventoryCheck() { //function to check if the correct ingredients were chosen 
  if (arraysAreEqual(ovenInventory, correctIngredients)) {
    console.log('You have chosen wisely Roberto, congratulations.. this time. Dont let me see you again.');
    rl.close();
  } else {
    console.log('You feel dizzy all of a sudden, you can hear a faint voice, its getting louder, I NEED A DOUBLE KALE VEGAN DELITE RIGHT NOW!, oh no....')
    rl.close();
  }
}  



start();

async function start() {
  //line below is an example for my own unique welcome message
  console.log( 
  `You are a world renoun pizza chef looking at his restaurant, "The UFO Dough", 
  but something is wrong, the street lights are blinking, its odly dark out for 1pm,
  and no one is around, whats going on?, am I dreaming?, is this purgatory? 
  You see a red door that looks new with a note nailed to it. The note Reads... Welcome to chef hell Roberto, you added vegan ingrediants to your recipe, a classic italian sin, you can only esscape by being true to yourself. As you step into your dinning room you can only wonder what awaits... \n`);
}

diningQuest();




  

  
  
  



  