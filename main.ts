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



function updateEnemyNumbers(){
    level += 1
    currentSpawnOfEnemys += 1
    numberOfEnemys = currentSpawnOfEnemys
    startLevel()
}

function shopStore(){
    updateEnemyNumbers()
}
let currentSpawnOfEnemys: number = 3
let numberOfEnemys = 3
info.setScore(0)
info.setLife(1)
let level: number = 1;
let cannonSprite: Sprite;
let levelTracker: Sprite;
let bulletStrength = 15;
let gameActive = false;



game.onUpdateInterval(500, function() {
    // runs when there are no enemys left
    if (numberOfEnemys <= 0) {
        updateEnemyNumbers()
    }
    console.log(numberOfEnemys <= 0)
})

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

// Initializing game
startGame()
game.splash("Welcome to Ball Blast!")


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
controller.B.onEvent(ControllerButtonEvent.Pressed, function() {
    if (!gameActive) {
        gameActive = true;
        startLevel()
        controller.moveSprite(cannonSprite, 90, 0)
    }
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!gameActive) {
        gameActive = true;
        startLevel()
        controller.moveSprite(cannonSprite, 90, 0)
    }
})

function createBall () {
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


// making sprite bounce less high each bounce
scene.onHitWall(SpriteKind.Enemy, function (sprite: Sprite, location: tiles.Location) {
    if (sprite.ay <= 300 && sprite.y == 168) {
        sprite.ay += 5
    }
})


game.onUpdateInterval(3000, function () {
    if (gameActive) {
        levelTracker.say("Level " + level, 3000)
    } else if (!gameActive) {
        levelTracker.say("Press B to start!", 5000)
    }
})



function startLevel () {
    for (let i = 0; i < numberOfEnemys; i++) {
        createBall()
    }
}

let enemies;
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(sprite: Sprite, otherSprite: Sprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
})

info.onLifeZero(function() {
    let contiune: boolean = game.ask("Coutinue?")
    if (contiune) {
        info.setLife(1)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        currentSpawnOfEnemys -= 1
        level -= 1
        updateEnemyNumbers()
        
    } else {
        game.gameOver(false)
        controller.moveSprite(cannonSprite, 0, 0)
        gameActive = false;
    }
    // enemies = sprites.allOfKind(SpriteKind.Enemy)

    // for (let i = 0; i < enemies.length; i++) {
        // enemies[i].destroy()
    //}
})


sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite: Sprite, otherSprite: Sprite) {
    let bar = statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite)
    // doubled to make enemys die easier
    bar.value -= 2 * bulletStrength
    sprites.destroy(sprite)
    numberOfEnemys == numberOfEnemys - 1
    if (numberOfEnemys <= 0){
        shopStore()
    }
    console.log(numberOfEnemys)
})
statusbars.onZero(StatusBarKind.Health, function(status: StatusBarSprite) {
    let ranNum = randint(0, 8)
    let enemy = status.spriteAttachedTo()
    if (ranNum <= 4) {
    } else if (ranNum > 4 && ranNum <=5 ){
        let myCoin1 = sprites.create(assets.image`Coin1`, SpriteKind.Food)
        myCoin1.setPosition(enemy.x, enemy.y)
        myCoin1.setVelocity(0, 80)
    } else if (ranNum > 6 && ranNum <= 7) {
        let myCoin2 = sprites.create(assets.image`Coin2`, SpriteKind.Food1)
        myCoin2.setPosition(enemy.x, enemy.y)
        myCoin2.setVelocity(0, 80)
    } else if (ranNum >= 8) {
        let myCoin5 = sprites.create(assets.image`Coin5`, SpriteKind.Food2)
        myCoin5.setPosition(enemy.x, enemy.y)
        myCoin5.setVelocity(0, 80)
    }
    
    if (enemy) {
        enemy.setFlag(SpriteFlag.GhostThroughSprites, true)
        sprites.destroy(enemy, effects.disintegrate, 50)
        numberOfEnemys -= 1
    }
})
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
