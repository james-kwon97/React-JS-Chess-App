import { useEffect, useRef, useState } from 'react'
import { initialBoard } from '../../Constants'
import Chessboard from '../Chessboard/Chessboard'
import {
  bishopMove,
  getPossibleBishopMoves,
  getPossibleKingMoves,
  getPossibleKnightMoves,
  getPossiblePawnMoves,
  getPossibleQueenMoves,
  getPossibleRookMoves,
  kingMove,
  knightMove,
  pawnMove,
  queenMove,
  rookMove,
} from '../../Referee/rules'
import { Piece, Position } from '../../models'
import { PieceType, TeamType } from '../../Types'
import { Pawn } from '../../models/Pawn'
import { Board } from '../../models/Board'

export default function Referee() {
  const [board, setBoard] = useState<Board>(initialBoard)
  const [promotionPawn, setPromotionPawn] = useState<Piece>()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    updatePossibleMoves()
  }, [])

  function updatePossibleMoves() {
    board.calculateAllMoves()
  }

  function playMove(playedPiece: Piece, destination: Position): boolean {
    const validMove = isValidMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    )
    const enPassantMove = isEnPassantMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    )

    // playMove modifies the board thus we need to call setBoard
    setBoard((previousBoard) => {
      // Playing the move
      board.playMove(enPassantMove, validMove, playedPiece, destination)

      const boardClone = board.copy()
      return boardClone
    })

    // This is for promoting a pawn
    let promotionRow = playedPiece.team === TeamType.OUR ? 7 : 0

    if (destination.y === promotionRow && playedPiece.isPawn) {
      modalRef.current?.classList.remove('hidden')
      setPromotionPawn(playedPiece)
    }

    return true
  }

  function isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ) {
    const pawnDirection = team === TeamType.OUR ? 1 : -1

    if (type === PieceType.PAWN) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = board.pieces.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.isPawn &&
            (p as Pawn).enPassant
        )
        if (piece) {
          return true
        }
      }
    }
    return false
  }

  // TO DOS
  // Pawn needs to be promoted
  // Prevent the king from moving into danger
  // King castling
  // Add checks
  // Add checkmate
  // Add stalemate

  function isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ) {
    let validMove = false
    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        )
        break
      case PieceType.KNIGHT:
        validMove = knightMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        )
        break
      case PieceType.BISHOP:
        validMove = bishopMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        )
        break
      case PieceType.ROOK:
        validMove = rookMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        )
        break
      case PieceType.QUEEN:
        validMove = queenMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        )
        break
      case PieceType.KING:
        validMove = kingMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        )
    }
    return validMove
  }

  function promotePawn(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return
    }
    board.pieces = board.pieces.reduce((results, piece) => {
      if (piece.samePiecePosition(promotionPawn)) {
        piece.type = pieceType
        const teamType = piece.team === TeamType.OUR ? 'white' : 'black'
        let image = ''
        switch (pieceType) {
          case PieceType.ROOK: {
            image = 'rook'
            break
          }
          case PieceType.KNIGHT: {
            image = 'knight'
            break
          }
          case PieceType.BISHOP: {
            image = 'bishop'
            break
          }
          case PieceType.QUEEN: {
            image = 'queen'
            break
          }
        }

        piece.image = `assets/images/${teamType}-${image}.png`
      }
      results.push(piece)
      return results
    }, [] as Piece[])

    updatePossibleMoves()

    modalRef.current?.classList.add('hidden')
  }

  function promotionTeamType() {
    return promotionPawn?.team === TeamType.OUR ? 'white' : 'black'
  }

  return (
    <>
      <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
        <div className="modal-body">
          <img
            onClick={() => promotePawn(PieceType.ROOK)}
            src={`/assets/images/${promotionTeamType()}-rook.png`}
            alt="Rook piece"
          />
          <img
            onClick={() => promotePawn(PieceType.KNIGHT)}
            src={`/assets/images/${promotionTeamType()}-knight.png`}
            alt="Knight piece"
          />
          <img
            onClick={() => promotePawn(PieceType.BISHOP)}
            src={`/assets/images/${promotionTeamType()}-bishop.png`}
            alt="Bishop piece"
          />
          <img
            onClick={() => promotePawn(PieceType.QUEEN)}
            src={`/assets/images/${promotionTeamType()}-queen.png`}
            alt="Queen piece"
          />
        </div>
      </div>
      <Chessboard playMove={playMove} pieces={board.pieces} />
    </>
  )
}
