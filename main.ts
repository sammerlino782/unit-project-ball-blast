function startGame () {
    scene.setBackgroundColor(9)
    let player = sprites.create(assets.image`playerimage`, SpriteKind.Player)
    tiles.setCurrentTilemap(tilemap`level1`)
    controller.moveSprite(player)
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