import { Position } from '../../Constants'
import Chessboard from '../Chessboard/Chessboard'

export default function Referee() {
  function getPossibleMoves(): Position[] {
    return []
  }

  function playMove() {}
  return (
    <>
      <Chessboard />
    </>
  )
}
