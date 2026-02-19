namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 9*16
    export const ARCADE_SCREEN_HEIGHT = 12*16

}

let cannonSprite: Sprite;
// Creating player, setting background and tilemap
function startGame () {
    scene.setBackgroundColor(9)
    cannonSprite = sprites.create(img`
    . . . . . . b b b b . . . . . .
    . . . . . b c c c c b . . . . .
    . . . . . b c c c c b . . . . .
    . . . . . b c c c c b . . . . .
    . . . . . b c c c c b . . . . .
    . . . . . b c c c c b . . . . .
    . . . . . b c c c c b . . . . .
    . . . . . b c c c c b . . . . .
    . b c c b c c c c c c b c c b .
    c c b c f f c c c c f f c b c c
    c c e e c f e e e e f c e e c c
    c c 4 e c f 4 e e 4 f c e 4 c c
    c b e e b c d . . d c b e e b c
    c c b b c c . . . . c c b b c c
    . b c c c . . . . . . c c c c .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
    //tiles.placeOnTile(cannonSprite, tiles.getTileLocation(5, 12))
    cannonSprite.x = 5 * 16; cannonSprite.y = 8.5*16
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