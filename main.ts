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
}

let spawnAmountOfEnemys: number = 3
let numberOfEnemys = 3
info.setScore(0)
info.setLife(1)
let level: number = 1;
let damageIncreaseAmount = 1.5;
let cannonSprite: Sprite;
let levelTracker: Sprite;
let bulletStrength = 15;
let gameActive = false;

// Initializing game
startGame()
game.splash("Welcome to Ball Blast!")

// Creating player, setting background and tilemap
function startGame() {
    scene.setBackgroundColor(9)
    levelTracker = sprites.create(assets.image`scoreboardModel`, SpriteKind.Scoreboard)
    levelTracker.setPosition(70, 20)
    cannonSprite = sprites.create(assets.image`cannonModel`, SpriteKind.Player)
    cannonSprite.x = 75; cannonSprite.y = 161
    tiles.setCurrentTilemap(tilemap`level1`)
    controller.moveSprite(cannonSprite, 90, 0)
}

//  shopStore is the update to increase your own stats at cost of score
function rougeLite() {

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
    if (controller.A.isPressed() && gameActive) {
       let projectile = sprites.createProjectileFromSprite(assets.image`bulletModel`, cannonSprite, 0, -170)
        projectile.y -= 22
    } 

})

game.onUpdateInterval(3000, function () {
    if (gameActive) {
        levelTracker.say("Level " + level, 3000)
    } else if (!gameActive) {
        levelTracker.say("Press B to start!", 5000)
    }
})


controller.B.onEvent(ControllerButtonEvent.Pressed, function() {
    if (!gameActive) {
        gameActive = true;
        createEnemies()
        controller.moveSprite(cannonSprite, 90, 0)
    }
})


// making sprite bounce less high each bounce
scene.onHitWall(SpriteKind.Enemy, function (sprite: Sprite, location: tiles.Location) {
    if (sprite.ay <= 300 && sprite.y == 168) {
        sprite.ay += 5
    }
})


// destroys current sprites and asks for you want to continue
info.onLifeZero(function() {
    game.gameOver(false)
    // enemies = sprites.allOfKind(SpriteKind.Enemy)

    // for (let i = 0; i < enemies.length; i++) {
        // enemies[i].destroy()
    //}
})

// Projectile onOverlap decrease enemy Health 

// Health on death of enemy, the enemy dies and has a chance to drop coins

statusbars.onZero(StatusBarKind.Health, function(status: StatusBarSprite) {
    let ranNum = randint(0, 10)
    let enemy = status.spriteAttachedTo()
    // Array of sprite skins for easier organization
    let coinSkins = [assets.image`powerup`, assets.image`Coin1`, assets.image`Coin2`, assets.image`Coin5`]
    let coinSkinSelected: Image;
    let coinWorth;
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
        coin.data["coinWorth"] = coinWorth;

        coin.setPosition(enemy.x, enemy.y)
        coin.setVelocity(0, 80)
    }

    enemy.setFlag(SpriteFlag.GhostThroughSprites, true)
    sprites.destroy(enemy, effects.disintegrate, 50)
    numberOfEnemys -= 1
})


// Making a powerup and returning the activated powerup
let activatedPowerup: string;
function activatePowerup (): string {
    let ranNum = randint(0, 9)

    if (ranNum <= 3) {
        // TODO
    } else if (ranNum <= 6) {
        // TODO
    } else {
        // TODO
    }
    return activatedPowerup;
}


let enemies;
// destroys the enemy sprite that overlaps with the player, and decreases life by 1 for player
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite: Sprite, otherSprite: Sprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
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
        level += 1
        createEnemies()
    }
})

// Updated coin logic to be concise
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (player: Sprite, coin: Sprite) {
    info.changeScoreBy(coin.data["coinWorth"])
    sprites.destroy(coin)
})

let currentPowerup;
sprites.onOverlap(SpriteKind.Player, SpriteKind.Powerup, function (player: Sprite, powerup: Sprite) {
    sprites.destroy(powerup)
    currentPowerup = activatePowerup()
})