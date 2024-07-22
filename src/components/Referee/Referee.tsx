import { useState } from 'react'
import { Piece, Position, initialBoardState } from '../../Constants'
import Chessboard from '../Chessboard/Chessboard'

export default function Referee() {
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
  function getPossibleMoves(): Position[] {
    return []
  }

  function playMove() {}

  return (
    <>
      <Chessboard getPossibleMoves={getPossibleMoves} playMove={playMove} />
    </>
  )
}
