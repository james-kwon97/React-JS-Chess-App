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
      if (team === TeamType.OUR) {
        if (py === 1) {
          if (px === x && (y - py === 1 || y - py === 2)) {
            if (!this.isTileOccupied(x, y, boardState)) {
              return true
            }
            return true
          }
        } else {
          if (px === x && y - py === 1) {
            if (!this.isTileOccupied(x, y, boardState)) {
              return true
            }
          }
        }
      } else {
        if (py === 6) {
          if (px === x && (y - py === -1 || y - py === -2)) {
            return true
          }
        } else {
          if (px === x && y - py === -1) {
            return true
          }
        }
      }
    }

    return false
  }
}
