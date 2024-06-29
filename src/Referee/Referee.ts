import { PieceType } from '../components/Chessboard/Chessboard'

export default class Referee {
  isValidMove(px: number, py: number, x: number, y: number, type: PieceType) {
    console.log('Referee is checking  the move..')
    return true
  }
}
