import { PieceType, TeamType } from '../components/Chessboard/Chessboard'

export default class Referee {
  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType
  ) {
    console.log('Referee is checking  the move..')
    console.log(`Previous location: (${px},${py})`)
    console.log(`Current location: (${x},${y})`)
    console.log(`Piece Type: ${type}`)
    console.log(`Team: ${team}`)
    return true
  }
}
