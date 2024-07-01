import { PieceType, TeamType, Piece } from '../components/Chessboard/Chessboard'

export default class Referee {
  isTileOccupied(x: number, y: number, boardState: Piece[]): boolean {
    console.log('Checking if the tile is occupied')

    const piece = boardState.find((p) => p.x === x && p.y === y)
    if (piece) {
      return true
    } else return false
  }
  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    console.log('Referee is checking the move..')
    console.log(`Previous location: (${px},${py})`)
    console.log(`Current location: (${x},${y})`)
    console.log(`Piece Type: ${type}`)
    console.log(`Team: ${team}`)

    if (type === PieceType.PAWN) {
      const specialRow = team === TeamType.OUR ? 1 : 6
      const pawnDirection = team === TeamType.OUR ? 1 : -1

      // PAWN MOVEMENT LOGIC
      if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
        if (
          !this.isTileOccupied(x, y, boardState) &&
          !this.isTileOccupied(x, y - pawnDirection, boardState)
        ) {
          return true
        }
      } else if (px === x && y - py === pawnDirection) {
        if (!this.isTileOccupied(x, y, boardState)) {
          return true
        }
      }
      // PAWN ATTACK LOGIC
      else if (x - px === -1 && y - py === pawnDirection) {
        //PAWN ATTACK IN THE UPPER OR BOTTOM LEFT CORNER
        console.log('Upper/ bottom left corner')
      } else if (x - px === 1 && y - py === pawnDirection) {
        // PAWN ATTACK IN THE UPPER OR BOTTOM RIGHT CORNER
        console.log('Upper/ lower right corner')
      }
    }

    return false
  }
}
