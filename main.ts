function startGame () {
    scene.setBackgroundColor(9)
    let player = sprites.create(assets.image`playerimage`, SpriteKind.Player)
    tiles.setCurrentTilemap(tilemap`level1`)
    controller.moveSprite(player)
}

startGame()
