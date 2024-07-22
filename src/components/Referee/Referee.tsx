import { Position } from '../../Constants'
import Chessboard from '../Chessboard/Chessboard'

export default function Referee() {
  function getPossibleMoves(): Position[] {
    console.log('Getting moves')
    return []
  }

  function playMove() {
    console.log('Playing move')
  }

  return (
    <>
      <Chessboard getPossibleMoves={getPossibleMoves} playMove={playMove} />
    </>
  )
}
