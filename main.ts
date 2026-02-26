// @ts-nocheck
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 9 * 16
    export const ARCADE_SCREEN_HEIGHT = 12 * 16

}

// Code for making a new spritekind
namespace SpriteKind {
    export const Scoreboard = SpriteKind.create()
    export const Food1 = SpriteKind.create()
    export const Food2 = SpriteKind.create()
}

let spawnAmountOfEnemys: number = 3
let numberOfEnemys = 3
info.setScore(0)
info.setLife(1)
let level: number = 1;
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
    levelTracker = sprites.create(img`
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    `, SpriteKind.Scoreboard)
    levelTracker.setPosition(70, 20)
    cannonSprite = sprites.create(img`
        ............1ddddddddd............
        ............1bcccccccd............
        .............bccccccc.............
        ............dcccccccc1............
        ............dccccccccd............
        ............dccccccccd............
        ............dccccccccd............
        ............dbcccccccd............
        ............dbcccccccb............
        ............bbcccccccb............
        ...........1bccccccccb1...........
        ...........1bccccccccc1...........
        ...........1bccccccccc1...........
        ...........1cccccccccc1...........
        ..........1dccccccccccb1..........
        ...........dbbbbbbbbbbb1..........
        ....ddbbdd1dccccccccccd1ddbbdd....
        ..1bffffffeecccccccccceeffffffb1..
        .dcfcdccefffecccccccccfffeccdcfcd.
        1bffc1cceefffecccccccfffeecc1cffb1
        dfcccbccecccfeeeccceefccceccbcccfd
        bfd1cfeecceefcee44eeffeecceecc1dfb
        cfccbe44eeecffeeeeeeffccee44ebccfc
        cfccce44ecccffbbbbbbffccce44ecccfc
        cfddbceeebddfc1....1cfddbceecbddfc
        bfdbccccbcbdfd......dfdbcbccccbdfb
        1cfccdcc1ccfc1......1cfcc1ccdccfc1
        .dffb1cc1bffd........dffb1cc1bffd.
        ..dffffffffd..........dffffffffd..
        ...dbccccbd............dbccccbd...
    `, SpriteKind.Player)
    cannonSprite.x = 75; cannonSprite.y = 161
    tiles.setCurrentTilemap(tilemap`level1`)
    controller.moveSprite(cannonSprite, 90, 0)
}

//  shopStore is the update to increase your own stats at cost of score
function shopStore(){
    
}

// creates enemy wth values for each of them
function createBall() {
    let ball = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . 1 1 1 1 1 1 1 . . . . .
        . . 1 1 7 7 7 7 7 7 7 1 1 . . .
        . 1 7 7 7 7 7 7 7 7 7 7 7 1 . .
        . 1 7 7 7 7 7 7 7 7 7 7 7 1 . .
        1 7 7 7 7 7 7 7 7 7 7 7 7 7 1 .
        1 7 7 7 7 7 7 7 7 7 7 7 7 7 1 .
        1 7 7 7 7 7 7 7 7 7 7 7 7 7 1 .
        1 7 7 7 7 7 7 7 7 7 7 7 7 7 1 .
        1 7 7 7 7 7 7 7 7 7 7 7 7 7 1 .
        1 7 7 7 7 7 7 7 7 7 7 7 7 7 1 .
        1 7 7 7 7 7 7 7 7 7 7 7 7 7 1 .
        . 1 7 7 7 7 7 7 7 7 7 7 7 1 . .
        . 1 7 7 7 7 7 7 7 7 7 7 7 1 . .
        . . 1 1 7 7 7 7 7 7 7 1 1 . . .
        . . . . 1 1 1 1 1 1 1 . . . . .
    `, SpriteKind.Enemy)
    let healthbar = statusbars.create(20, 4, StatusBarKind.Health)
    healthbar.attachToSprite(ball)
    healthbar.setOffsetPadding(0, 3)
    ball.setBounceOnWall(true)
    ball.x = randint(20, 120)
    ball.y = randint(30, 35)
    ball.ay = 60
    ball.vx = randint(-50, 50)
}

// create enemys which are called balls, repated by numberOfEnemys

function startLevel() {
    for (let i = 0; i < numberOfEnemys; i++) {
        createBall()
    }
}

// Cannon shooting functionality, when space pressed down
// the cannon shoots a projectile
game.onUpdateInterval(200, function () {
    if (controller.A.isPressed() && gameActive) {
       let projectile = sprites.createProjectileFromSprite(img`
    . . . . f f . . . .
    . . . f 1 5 f . . .
    . . . f 5 5 f . . .
    . . . f 5 2 f . . .
    . . . f 2 2 f . . .
    . . . 5 5 5 5 . 4 .
    . . 4 5 5 . 5 . . 4
    4 . . 5 5 . . 5 . .
    . . 5 . 4 . 5 . . .
    . . . . . . . . 4 .
    . . . . 4 . . . . .
`, cannonSprite, 0, -170)
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
        startLevel()
        controller.moveSprite(cannonSprite, 90, 0)
    }
})


// making sprite bounce less high each bounce
scene.onHitWall(SpriteKind.Enemy, function (sprite: Sprite, location: tiles.Location) {
    if (sprite.ay <= 300 && sprite.y == 168) {
        sprite.ay += 5
    }
})


// destorys current sprites and asks for you want to Coutinue
info.onLifeZero(function() {
    let continueLevel: boolean = game.ask("Continue?")
    if (continueLevel) {
        info.setLife(1)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        // to stop enemies amount to increase & level increase
    } else {
        game.gameOver(false)
        controller.moveSprite(cannonSprite, 0, 0)
        gameActive = false;
    }
    numberOfEnemys = spawnAmountOfEnemys
    startLevel()
    // enemies = sprites.allOfKind(SpriteKind.Enemy)

    // for (let i = 0; i < enemies.length; i++) {
        // enemies[i].destroy()
    //}
})

// Projectile onOverlap decrease enemy Health 

// health on zero of enemy, enemys dies and has chance to spawn coins

statusbars.onZero(StatusBarKind.Health, function(status: StatusBarSprite) {
    let ranNum = randint(0, 8)
    let enemy = status.spriteAttachedTo()
    let coinSkins = [assets.image`powerup`, assets.image`Coin1`, assets.image`Coin2`, assets.image`Coin5`]
    let coinSkinSelected: Image;

    if (ranNum > 3) {
        if (ranNum >= 8) {
            coinSkinSelected = coinSkins[1]
        } else if (ranNum > 6) {
            coinSkinSelected = coinSkins[2]
        } else if (ranNum > 3) {
            coinSkinSelected = coinSkins[3]
        }
        let coin = sprites.create(coinSkinSelected, SpriteKind.Food)

        coin.setPosition(enemy.x, enemy.y)
        coin.setVelocity(0, 80)
    }

    if (enemy) {
        enemy.setFlag(SpriteFlag.GhostThroughSprites, true)
        sprites.destroy(enemy, effects.disintegrate, 50)
        numberOfEnemys -= 1
    }
})



let enemies;
// destorys senemy sprite that overlaps Player, and decreases life by 1 for player
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite: Sprite, otherSprite: Sprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite: Sprite, otherSprite: Sprite) {
    let bar = statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite)
    // doubled to make enemys die easier
    bar.value -= 2 * bulletStrength
    sprites.destroy(sprite)
    numberOfEnemys == numberOfEnemys - 1
    if (numberOfEnemys <= 0) {
        spawnAmountOfEnemys += 1
        numberOfEnemys = spawnAmountOfEnemys
        level += 1
        startLevel()
    }
})


// coins overlap for amount of score

sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function(sprite: Sprite, otherSprite: Sprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food1, function (sprite: Sprite, otherSprite: Sprite) {
    info.changeScoreBy(2)
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food2, function (sprite: Sprite, otherSprite: Sprite) {
    info.changeScoreBy(5)
    sprites.destroy(otherSprite)
})
