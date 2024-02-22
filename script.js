let health = 100;
let credits = 50
let catnip = 0;
let actualGlizzy = 0;
let hunting
let enemyHealth
let inventory = [`Glizzy`]


const myAudio = new Audio()
myAudio.src = './audio/2049.mp3'
myAudio.volume = .8
myAudio.time = 0



const body = document.getElementsByTagName('body')[0]


const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const healthNum = document.querySelector("#healthNum")
const creditsNum = document.querySelector("#creditsNum")
const catnipNum = document.querySelector("#catnipNum")
const enemyStats = document.querySelector("#enemyStats")
const enemyName = document.querySelector("#enemyName")
const enemyHealthNum = document.querySelector("#enemyHealth")
const startButton = document.getElementById('start-button')
const gameContainer = document.getElementById('game')

startButton.addEventListener('click', () => {
    gameContainer.style.visibility = 'inherit'

    startButton.remove()
  
    myAudio.play();
    myAudio.loop = true
  
})

const upgrades = [
    {
        name: `Glizzy`,
        atk: 5
    },
    {
        name: `Glizzy MRD`,
        atk: 25
    },
    {
        name: `Glizzy Extended Mag MRD`,
        atk: 50
    },
    {
        name: `Glizzy Full Auto RONI  `,
        atk: 100
    }
]

const enemies = [
    {
        name: "Rat",
        level: 5,
        health: 15
    },
    {
        name: "Iguana",
        level: 10,
        health: 60
    },
    {
        name: "Gator",
        level: 20,
        health: 300
    }
]

const locations = [
    {
        name: "downtown",
        btnText: ["Visit sketchy merchant.", "Go hunting!", "Fight CyborgGator"],
        btnFunctions: [visitMerchant, goHunting, fightGator],
        text: "You are at the top of a building in downtown.",
        image: './images/glizzycat-start.png'
    },
    {
        name: "sketchy merchant",
        btnText: ["Buy milk (5 credits)","Upgrade Glizzy (50 credits)","Return to downtown"],
        btnFunctions: [buyMilk, upgradeGlizzy, goDowntown],
        text: "You visit the sketchy merchant.",
        image: './images/glizzycat-merchant.png'
    },
    {
        name: "hunt",
        btnText: ["Fight rat", "Fight iguana", "Return to downtown"],
        btnFunctions: [fightRat, fightIguana, goDowntown],
        text: "You head down to the street, it's full of vermins.",
        image: './images/glizzycat-start.png'
    },
    {
        name: "fight",
		btnText: ["Attack", "Catnip Mode", "Run"],
		btnFunctions: [attack, catnipPwr, goDowntown],
		text: "You are hunting a vermin.",
        image: './images/glizzycat-start.png'
    },
    {
        name: "kill enemy",
		btnText: ["Go downtown", "Keep hunting", "Visit sketchy merchant"],
		btnFunctions: [goDowntown, goHunting, visitMerchant],
		text: "The vermin dies. You play with it's severed tail for a while until some credits and catnip drops out of it. -WHAT? WHY? HOW?- That doesn't really matter just keep playing. A hunter must hunt!",
        image: './images/glizzycat-start.png'
    },
    {
        name: "lose",
		btnText: ["RELOAD?", "RELOAD?","RELOAD?"],
		btnFunctions: [restart, restart, restart],
		text: "You die. But don't worry you probably have a few lives left...probaly...",
        image: './images/glizzycat-start.png'
    },
    {
        name: "win",
		btnText: ["REPLAY?", "REPLAY?", "REPLAY?"],
		btnFunctions: [restart, restart, restart],
		text: "You defeat the CyborGator! Peace has ben restored, now you can enjoy some catnip-infused milk.",
        image: './images/glizzycat-start.png'
    }


]



button1.onclick= visitMerchant
button2.onclick= goHunting
button3.onclick= fightGator

function update(locations){
    body.style.backgroundImage = `url(${locations.image})`
    enemyStats.style.display = "none"
    button1.innerText = locations.btnText[0]
    button2.innerText = locations.btnText[1]
    button3.innerText = locations.btnText[2]
    button1.onclick = locations.btnFunctions[0]
    button2.onclick = locations.btnFunctions[1]
    button3.onclick = locations.btnFunctions[2]
    text.innerText = locations.text;
    
}


function goDowntown(){
    console.log("Downtown!")
    update(locations[0]);
    
}


function visitMerchant(){
    console.log('Merchant')
    update(locations[1])
}
function buyMilk() {
    if (health < 100) {
        if (credits >= 5) {
            credits -= 5
            health += 5
            creditsNum.innerText = credits
            healthNum.innerText = health
            text.innerText = "You drink some milk and gain 5 Health"
        } else {
        text.innerText = "You do not have enough credits. Get back to the grind."
        }
    } else { 
        text.innerText = "Your Health is already maxed out!"
    }
}

function upgradeGlizzy() {
    if (actualGlizzy < upgrades.length - 1) {
        if (credits >= 50) {
            credits -= 50;
            actualGlizzy++;
            creditsNum.innerText = credits;
            let newGlizzy = upgrades[actualGlizzy].name
            text.innerText = `You upgraded to ${newGlizzy}.`;
            inventory.push(newGlizzy);
        } else {
            text.innerText = "You do not have enough credits. Get back to the grind."
        }
    } else {
        text.innerText = "Your Glizzy is already maxed out!"
        button2.innerText
    }
}

function goHunting() {
    update(locations[2])
}


function fightRat() {
    hunting = 0
    goFight()
}

function fightIguana() {
    hunting = 1
    goFight()
}

function fightGator() {
    hunting = 2
    goFight()
}

function goFight() {
    update(locations[3]);
    enemyHealth = enemies[hunting].health;
    enemyStats.style.display = "block"
    enemyName.innerText = enemies[hunting].name;
	enemyHealthNum.innerText = enemyHealth
}

function attack(){
    health -= enemies[hunting].level;
    damageDone = upgrades[actualGlizzy].atk + Math.floor(Math.random() * catnip) + 1
    enemyHealth -= upgrades[actualGlizzy].atk + Math.floor(Math.random() * catnip) + 1;
    healthNum.innerText = health;
    enemyHealthNum.innerText = enemyHealth;
    text.innerText = `The ${enemies[hunting].name} attacks. You take ${enemies[hunting].level} damage`;
    text.innerText += `You shoot at  it with your ${upgrades[actualGlizzy].name}. Doing ${damageDone} damage.`;
    if (health <= 0){
        lose();
    } else if (enemyHealth <= 0){
        if (hunting === 2) {
            winGame();
        } else {
            defeatEnemy()
        }
    }

}

function catnipPwr() {
    text.innerText = "You channel the power of the Catnip!";
}

function defeatEnemy(){
    credits += Math.floor(enemies[hunting].level * 5.5);
    catnip += Math.floor(enemies[hunting].level * .5);
    creditsNum.innerText = credits;
    catnipNum.innerText = catnip;

    update(locations[4])
}

function lose() {
    update(locations[5])
}

function winGame() {
    update(locations[6]);
  }

 function restart() {
    health = 100;
    credits = 50
    catnip = 0;
    actualGlizzy = 0;
    inventory = [`Glizzy`]
    healthNum.innerText = health
    creditsNum.innerText = credits
    catnipNum.innerText = catnip
    goDowntown()
 }