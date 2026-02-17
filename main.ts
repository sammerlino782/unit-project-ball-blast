function startGame () {
    let player = sprites.create(assets.image`playericon`, SpriteKind.Player)
    controller.moveSprite(player)

} 

startGame()
