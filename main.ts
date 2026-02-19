function startGame () {
    scene.setBackgroundColor(9)
    let cannonSprite = sprites.create(img`
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
    tiles.setCurrentTilemap(tilemap`level1`)
    controller.moveSprite(cannonSprite)
}

startGame()

game.onUpdateInterval(1500, function () {
    if (controller.A.isPressed()) {
    let enemy = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 2 2 2 2 2 2 2 2 2 2 . .
        . . . . 2 2 2 2 2 2 2 2 2 2 . .
        . . . . 2 2 2 2 2 2 2 2 2 2 . .
        . . . . 2 2 2 2 2 2 2 2 2 2 . .
        . . . . 2 2 2 2 2 2 2 2 2 2 . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Enemy)
    enemy.setVelocity(randint(-40, -50), 0)
    enemy.setPosition(randint(130, 150), randint(10, screen.height - 10))
    }
})