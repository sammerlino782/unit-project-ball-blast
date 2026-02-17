
function startGame () {
    scene.setBackgroundColor(9)
    tiles.setCurrentTilemap(tilemap`level1`)
    tiles.placeOnTile(player, tiles.getTileLocation(6, 13))
    scene.cameraFollowSprite(player)
    controller.moveSprite(player, 100, 0)
}
let player = sprites.create(assets.image`playerimage`, SpriteKind.Player)
startGame()
