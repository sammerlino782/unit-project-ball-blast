// @ts-nocheck
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 9 * 16
    export const ARCADE_SCREEN_HEIGHT = 12 * 16

}

// Code for making a new spritekind
namespace SpriteKind {
    export const Scoreboard = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Powerup = SpriteKind.create()
    export const Player2 = SpriteKind.create()
    export const Card = SpriteKind.create()
}
let spawnAmountOfEnemys: number = 3
let numberOfEnemys = 3
info.setScore(0)
info.setLife(1)
let level: number = 1;
let damageIncreaseAmount = 1.5;
let cannonSprite: Sprite;
let infoBoard: Sprite;
let bulletStrength = 15;
let gameActive = false;
let message: string;
let username: string = ""
let inCardPlacement = false
let randomCard = 0
let speedAmount = 0
// Initializing game
startGame()
game.splash("Welcome to Ball Blast!")

function randomCards() {
    inCardPlacement = true;
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    let cardChooser = sprites.create(assets.image`Choice_Choser`, SpriteKind.Player2)
    controller.moveSprite(cardChooser, 50, 50)
    controller.moveSprite(cannonSprite, 0, 0)
    cardChooser.setPosition(cannonSprite.x, cannonSprite.y)
    controller.moveSprite(cardChooser)
    randomCard = randint(1, 3)
    if (randomCard == 1) {
        let card1 = sprites.create(assets.image`Attack_Scroll`, SpriteKind.Card)
    } else if (randomCard == 2) {
        let card2 = sprites.create(assets.image`Speed Scroll`, SpriteKind.Card)
    } else if (randomCard == 3) {
        let card3 = sprites.create(assets.image`Health Scroll`, SpriteKind.Card)
    }
}
while (username == "") {
    username = game.askForString("Enter username: ", 12, false)
}


// Create scoreboard first
infoBoard = sprites.create(assets.image`infoboardModel`, SpriteKind.Scoreboard)
message = ("Press B to start!")
infoBoard.setPosition(70, 20)

// Creating player, setting background and tilemap
function startGame() {
    scene.setBackgroundColor(9)
    cannonSprite = sprites.create(assets.image`cannonModel`, SpriteKind.Player)
    cannonSprite.x = 75; cannonSprite.y = 161
    tiles.setCurrentTilemap(tilemap`level1`)
    controller.moveSprite(cannonSprite, 90, 0)
}


// Creates an individual enemy
function createBall() {
    let ball = sprites.create(assets.image`enemyBall`, SpriteKind.Enemy)
    let healthbar = statusbars.create(20, 4, StatusBarKind.Health)
    healthbar.attachToSprite(ball)
    healthbar.setOffsetPadding(0, 3)
    ball.setBounceOnWall(true)
    ball.x = randint(20, 120)
    ball.y = randint(30, 35)
    ball.ay = 60
    ball.vx = randint(-50, 50)
}

// Calls createBall() repeatedly to make enemies
function createEnemies() {
    for (let i = 0; i < spawnAmountOfEnemys; i++) {
        createBall()
        pause(1000)
    }
}

// Cannon shooting functionality, when space pressed down
// the cannon shoots a projectile
game.onUpdateInterval(200, function () {
    if (inCardPlacement == false) {
        if (controller.A.isPressed() && gameActive) {
            let projectile = sprites.createProjectileFromSprite(assets.image`bulletModel`, cannonSprite, 0, -170 - speedAmount )
            projectile.y -= 22
        }
    }
})

game.onUpdateInterval(1000, function () {
    infoBoard.say(message, 1000)
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (inCardPlacement == false){
        if (!gameActive) {
            message = "Level " + level
            gameActive = true;
            createEnemies()
            controller.moveSprite(cannonSprite, 90, 0)
        }
    }
})

// making sprite bounce less high each bounce
scene.onHitWall(SpriteKind.Enemy, function (sprite: Sprite, location: tiles.Location) {
    if (sprite.ay <= 300 && sprite.y == 168) {
        sprite.ay += 5
    }
})

// destroys current sprites and asks for you want to continue
info.onLifeZero(function () {
    let continueLevel: boolean = game.ask("Continue?")
    if (continueLevel) {
        info.setLife(1)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        // to stop enemies amount to increase & level increase
        createEnemies()
    } else {
        game.gameOver(false)
        controller.moveSprite(cannonSprite, 0, 0)
        gameActive = false;
    }
    numberOfEnemys = spawnAmountOfEnemys
})

// Health on death of enemy, the enemy dies and has a chance to drop coins

statusbars.onZero(StatusBarKind.Health, function (status: StatusBarSprite) {
    let ranNum = randint(0, 10)
    let enemy = status.spriteAttachedTo()
    // Array of sprite skins for easier organization
    let coinSkins = [assets.image`powerup`, assets.image`Coin1`, assets.image`Coin2`, assets.image`Coin5`]
    let coinSkinSelected: Image;
    let coinWorth;

    enemy.setFlag(SpriteFlag.GhostThroughSprites, true)
    sprites.destroy(enemy, effects.disintegrate, 50)
    numberOfEnemys -= 1

    if (ranNum > 3) {
        if (ranNum === 10) {
            coinSkinSelected = coinSkins[0]
            let powerup = sprites.create(coinSkinSelected, SpriteKind.Powerup)

            powerup.setPosition(enemy.x, enemy.y)
            powerup.setVelocity(0, 80)
            return;
        }
        else if (ranNum >= 8) {
            coinSkinSelected = coinSkins[3]
            coinWorth = 5
        } else if (ranNum > 6) {
            coinSkinSelected = coinSkins[2]
            coinWorth = 2
        } else if (ranNum > 3) {
            coinSkinSelected = coinSkins[1]
            coinWorth = 1
        }
        let coin = sprites.create(coinSkinSelected, SpriteKind.Coin)
        sprites.setDataNumber(coin, "coinWorth", coinWorth)
        coin.setPosition(enemy.x, enemy.y)
        coin.setVelocity(0, 80)
    }

})

// Making a powerup and returning the activated powerup
let activatedPowerup: string;
function activatePowerup(): string {
    // For now, just the frozen powerup
    let ranNum = randint(0, 2)

    if (ranNum <= 3) {
        // Freeze enemies powerup
        info.startCountdown(5)
        message = "Enemies frozen!"
        enemies = sprites.allOfKind(SpriteKind.Enemy)

        for (let i = 0; i < enemies.length; i++) {
            enemies[i].setVelocity(0, 0)
            enemies[i].ay = 0;
            enemies[i].setImage(assets.image`frozenballModel`)
            sprites.setDataBoolean(enemies[i], "frozen", true)
        }

        activatedPowerup = "frozen";

    } else if (ranNum <= 6) {
        // TODO
    } else {
        // TODO
    }
    return activatedPowerup;
}

let enemy: Sprite;
info.onCountdownEnd(function () {
    enemies = sprites.allOfKind(SpriteKind.Enemy)
    if (currentPowerup = "frozen") {
        for (let i = 0; i < enemies.length; i++) {
            enemy = enemies[i]
            if (sprites.readDataBoolean(enemy, "frozen")) {
                enemy.ay = 60
                sprites.setDataBoolean(enemy, "frozen", false)
                enemy.vx = randint(20, 50)
                enemy.setImage(assets.image`enemyBall`)
                // Too low for the player to reach
                if (enemy.y >= 168) {
                    enemy.destroy(effects.blizzard)
                }
            }
        }
    }
    message = "Level " + level
})

let enemies;
// destroys the enemy sprite that overlaps with the player, and decreases life by 1 for player
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite: Sprite, otherSprite: Sprite) {
    sprites.destroy(otherSprite)
    numberOfEnemys -= 1
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
})

sprites.onOverlap(SpriteKind.Player2, SpriteKind.Card, function(sprite: Sprite, otherSprite: Sprite) {
    if (randomCard == 1){
        bulletStrength += 5
    } else if (randomCard == 2){
        speedAmount += 10
    } else {
        info.changeLifeBy(1)
    }
    sprite.destroy()
    otherSprite.destroy()
    inCardPlacement = false
    controller.moveSprite(cannonSprite,90,0)
    level += 1
    message = "Level " + level
    createEnemies()
})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite: Sprite, otherSprite: Sprite) {
    let bar = statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite)
    // Increasing damage on enemy by bulletStrength
    bar.value -= damageIncreaseAmount * bulletStrength
    sprites.destroy(sprite)
    numberOfEnemys == numberOfEnemys - 1
    if (numberOfEnemys <= 0) {
        spawnAmountOfEnemys += 1
        numberOfEnemys = spawnAmountOfEnemys
        randomCards()
    }
})

// Updated coin logic to be concise
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (player: Sprite, coin: Sprite) {
    info.changeScoreBy(sprites.readDataNumber(coin, "coinWorth"))
    sprites.destroy(coin)
})

let currentPowerup;
sprites.onOverlap(SpriteKind.Player, SpriteKind.Powerup, function (player: Sprite, powerup: Sprite) {
    sprites.destroy(powerup)
    currentPowerup = activatePowerup()
})