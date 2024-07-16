import {
  PieceType,
  TeamType,
  Piece,
  Position,
  samePosition,
} from '../Constants'
import { bishopMove } from './rules/BishopRules'
import {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from './rules/GeneralRules'
import { kingMove } from './rules/KingRules'
import { knightMove } from './rules/KnightRules'

import { pawnMove } from './rules/PawnRules'
import { queenMove } from './rules/QueenRules'
import { rookMove } from './rules/RookRules'

export default class Referee {
  isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    const pawnDirection = team === TeamType.OUR ? 1 : -1

    if (type === PieceType.PAWN) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = boardState.find(
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

  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    let validMove = false
    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMove(initialPosition, desiredPosition, team, boardState)
        break
      case PieceType.KNIGHT:
        validMove = knightMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        )
        break
      case PieceType.BISHOP:
        validMove = bishopMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        )
        break
      case PieceType.ROOK:
        validMove = rookMove(initialPosition, desiredPosition, team, boardState)
        break
      case PieceType.QUEEN:
        validMove = queenMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        )
        break
      case PieceType.KING:
        validMove = kingMove(initialPosition, desiredPosition, team, boardState)
    }
    return validMove
  }
}
