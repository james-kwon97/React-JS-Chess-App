import { useState } from 'react'
import {
  Piece,
  PieceType,
  Position,
  TeamType,
  initialBoardState,
  samePosition,
} from '../../Constants'
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

export default function Referee() {
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
  function updatePossibleMoves() {
    setPieces((currentPieces) => {
      return currentPieces.map((p) => {
        p.possibleMoves = getValidMoves(p, currentPieces)
        return p
      })
    })
  }

  function playMove(piece: Piece, destination: Position): boolean {
    const validMove = isValidMove(
      piece.position,
      destination,
      piece.type,
      piece.team
    )
    const enPassantMove = isEnPassantMove(
      piece.position,
      destination,
      piece.type,
      piece.team
    )
    const pawnDirection = piece.team === TeamType.OUR ? 1 : -1

    if (enPassantMove) {
      const updatedPieces = pieces.reduce((results, piece) => {
        if (samePosition(piece.position, destination)) {
          piece.enPassant = false
          piece.position.x = destination.x
          piece.position.y = destination.y
          results.push(piece)
        } else if (
          !samePosition(piece.position, {
            x: destination.x,
            y: destination.y - pawnDirection,
          })
        ) {
          if (piece.type === PieceType.PAWN) {
            piece.enPassant = false
          }
          results.push(piece)
        }
        return results
      }, [] as Piece[])
      setPieces(updatedPieces)
    } else if (validMove) {
      // UPDATES THE PIECE POSITION
      // AND IF A PIECE IS ATTACKED, REMOVES IT
      const updatedPieces = pieces.reduce((results, piece) => {
        if (samePosition(piece.position, piece.position)) {
          // SPECIAL MOVE
          piece.enPassant =
            Math.abs(piece.position.y - destination.y) === 2 &&
            piece.type === PieceType.PAWN

          piece.position.x = destination.x
          piece.position.y = destination.y

          let promotionRow = piece.team === TeamType.OUR ? 7 : 0

          if (destination.y === promotionRow && piece.type === PieceType.PAWN) {
            modalRef.current?.classList.remove('hidden')
            setPromotionPawn(piece)
          }

          results.push(piece)
        } else if (!samePosition(piece.position, { x, y })) {
          if (piece.type === PieceType.PAWN) {
            piece.enPassant = false
          }
          results.push(piece)
        }

        return results
      }, [] as Piece[])
      setPieces(updatedPieces)
    } else {
      // RESETS THE PIECE POSITION
      activePiece.style.position = 'relative'
      activePiece.style.removeProperty('top')
      activePiece.style.removeProperty('left')
    }
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
        const piece = pieces.find(
          (p) =>
            p.position.x === desiredPosition.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.enPassant
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
        validMove = pawnMove(initialPosition, desiredPosition, team, pieces)
        break
      case PieceType.KNIGHT:
        validMove = knightMove(initialPosition, desiredPosition, team, pieces)
        break
      case PieceType.BISHOP:
        validMove = bishopMove(initialPosition, desiredPosition, team, pieces)
        break
      case PieceType.ROOK:
        validMove = rookMove(initialPosition, desiredPosition, team, pieces)
        break
      case PieceType.QUEEN:
        validMove = queenMove(initialPosition, desiredPosition, team, pieces)
        break
      case PieceType.KING:
        validMove = kingMove(initialPosition, desiredPosition, team, pieces)
    }
    return validMove
  }

  function getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
    switch (piece.type) {
      case PieceType.PAWN:
        return getPossiblePawnMoves(piece, boardState)
      case PieceType.KNIGHT:
        return getPossibleKnightMoves(piece, boardState)
      case PieceType.BISHOP:
        return getPossibleBishopMoves(piece, boardState)
      case PieceType.ROOK:
        return getPossibleRookMoves(piece, boardState)
      case PieceType.QUEEN:
        return getPossibleQueenMoves(piece, boardState)
      case PieceType.KING:
        return getPossibleKingMoves(piece, boardState)

      default:
        return []
    }
  }

  return (
    <>
      <Chessboard
        updatePossibleMoves={updatePossibleMoves}
        playMove={playMove}
        pieces={pieces}
      />
    </>
  )
}
