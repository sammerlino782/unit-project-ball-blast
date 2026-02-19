namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 9*16
    export const ARCADE_SCREEN_HEIGHT = 12*16

}

let cannonSprite: Sprite;
// Creating player, setting background and tilemap
function startGame () {
    scene.setBackgroundColor(9)
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
        .....1111................1111.....
    `, SpriteKind.Player)
    //tiles.placeOnTile(cannonSprite, tiles.getTileLocation(5, 12))
    cannonSprite.x = 75; cannonSprite.y = 165
    tiles.setCurrentTilemap(tilemap`level1`)
    controller.moveSprite(cannonSprite, 50, 0)
}

// Initializing game
startGame()

// Cannon shooting functionality, when space pressed down
// the cannon shoots a projectile
game.onUpdateInterval(1000, function () {
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
    `, cannonSprite, 0, -60)
    }
})