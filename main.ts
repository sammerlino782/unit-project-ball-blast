// @ts-nocheck
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 9 * 16
    export const ARCADE_SCREEN_HEIGHT = 12 * 16

}

// Code for making a new spritekind
namespace SpriteKind {
    export const Scoreboard = SpriteKind.create()
}
info.setScore(0)
info.setLife(1)
let level = 1;
let cannonSprite: Sprite;
let levelTracker: Sprite;
let bulletStrength = 25;

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
    //tiles.placeOnTile(cannonSprite, tiles.getTileLocation(5, 12))
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
    if (controller.A.isPressed()) {
        let projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . 2 2 2 2 . . . . . .
        . . . . . . 2 2 2 2 . . . . . .
        . . . . . . 2 2 2 2 . . . . . .
        . . . . . . 2 2 2 2 . . . . . .
        . . . . . . 2 2 2 2 . . . . . .
        . . . . . . 2 2 2 2 . . . . . .
        . . . . . . 2 2 2 2 . . . . . .
        . . . . . . 2 2 2 2 . . . . . .
        . . . . . . 2 2 2 2 . . . . . .
        . . . . . . 2 2 2 2 . . . . . .
        . . . . . . 2 2 2 2 . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, cannonSprite, 0, -90)
        projectile.y -= 22
    }

})
controller.B.onEvent(ControllerButtonEvent.Pressed, function() {
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

})
// making sprite bounce less high each bounce
scene.onHitWall(SpriteKind.Enemy, function (sprite: Sprite, location: tiles.Location) {
    if (sprite.ay <= 300 && sprite.y == 168) {
        sprite.ay += 5
    }
})

game.onUpdateInterval(3000, function () {
    levelTracker.say("Level " + level,5000)  
})


sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(sprite: Sprite, otherSprite: Sprite) {
    sprites.destroy(otherSprite)
    game.gameOver(false)
})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite: Sprite, otherSprite: Sprite) {
    let bar = statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite)
    bar.value -= 10
    sprites.destroy(sprite)
})
statusbars.onZero(StatusBarKind.Health, function(status: StatusBarSprite) {
    let ranNum = randint(0, 8)
    let enemy = status.spriteAttachedTo()
    if (ranNum <= 4) {
    } else if (ranNum > 4 && ranNum <=5 ){
        let myCoin1 = sprites.create(assets.image`Coin1`, SpriteKind.Food)
        myCoin1.setPosition(enemy.x, enemy.y)
        myCoin1.setVelocity(0, 50)
    } else if (ranNum > 6 && ranNum <= 7) {
        let myCoin2 = sprites.create(assets.image`Coin2`, SpriteKind.Player)
        myCoin2.setPosition(enemy.x, enemy.y)
        myCoin2.setVelocity(0, 50)
    } else if (ranNum >= 8) {
        let myCoin5 = sprites.create(assets.image`Coin5`, SpriteKind.Player)
        myCoin5.setPosition(enemy.x, enemy.y)
        myCoin5.setVelocity(0, 50)
    }
    if (enemy) {
        enemy.setFlag(SpriteFlag.GhostThroughSprites, true)
        sprites.destroy(enemy, effects.disintegrate, 50)
    }
})

