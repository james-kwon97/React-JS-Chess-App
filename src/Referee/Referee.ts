import { PieceType, TeamType, Piece } from '../Constants'

export default class Referee {
  isTileOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => p.x === x && p.y === y)
    if (piece) {
      return true
    } else return false
  }

  TileIsOccupiedByOpponent(
    x: number,
    y: number,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => p.x === x && p.y === y && p.team !== team
    )
    if (piece) {
      return true
    }
    return false
  }

  isEnPassantMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    const pawnDirection = team === TeamType.OUR ? 1 : -1

    if (type === PieceType.PAWN) {
      if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
        const piece = boardState.find(
          (p) => p.x === x && p.y === y - pawnDirection && p.enPassant
        )
        if (piece) {
          return true
        }
      }
    }
    // IF THE ATTACKING PIECE IS A PAWN
    // UPPER LEFT / UPPER RIGHT || BOTTOM LEFT / BOTTOM RIGHT ATTACK
    // IF A PIECE IS UNDER OR ABOVE THE ATTACKED TILE
    // IF THE ATTACKED PIECE HAS MADE AN EN PASSANT MOVE IN THE PREVIOUS MOVE
    return false
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
        if (this.TileIsOccupiedByOpponent(x, y, boardState, team)) {
          return true
        }
      } else if (x - px === 1 && y - py === pawnDirection) {
        // PAWN ATTACK IN THE UPPER OR BOTTOM RIGHT CORNER
        console.log('Upper/ lower right corner')
        if (this.TileIsOccupiedByOpponent(x, y, boardState, team)) {
          return true
        }
      }

      return false
    }
  }
}
