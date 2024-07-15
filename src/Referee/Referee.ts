import {
  PieceType,
  TeamType,
  Piece,
  Position,
  samePosition,
} from '../Constants'
import {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from './rules/GeneralRules'
import { knightMove } from './rules/KnightRules'

import { pawnMove } from './rules/PawnRules'

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

  bishopMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    // MOVEMENT AND ATTACK LOGIC FOR THE BISHOP

    for (let i = 1; i < 8; i++) {
      // TOP RIGHT MOVEMENT
      if (
        desiredPosition.x > initialPosition.x &&
        desiredPosition.y > initialPosition.y
      ) {
        let passedPosition: Position = {
          x: initialPosition.x + i,
          y: initialPosition.y + i,
        }
        // CHECK IF THE TILE IS THE DESTINATION TILE
        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          // DEALING WITH DESTINATION TILE
          if (
            tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)
          ) {
            return true
          }
        } else {
          // DEALING WITH PASSING TILE
          if (tileIsOccupied(passedPosition, boardState)) {
            break
          }
        }
      }
      // TOP LEFT MOVEMENT
      if (
        desiredPosition.x < initialPosition.x &&
        desiredPosition.y > initialPosition.y
      ) {
        let passedPosition: Position = {
          x: initialPosition.x - i,
          y: initialPosition.y + i,
        }
        // CHECK IF THE TILE IS THE DESTINATION TILE
        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          // DEALING WITH DESTINATION TILE
          if (
            tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)
          ) {
            return true
          }
        } else {
          // DEALING WITH PASSING TILE
          if (tileIsOccupied(passedPosition, boardState)) {
            break
          }
        }
      }

      // BOTTOM RIGHT MOVEMENT
      if (
        desiredPosition.x > initialPosition.x &&
        desiredPosition.y < initialPosition.y
      ) {
        let passedPosition: Position = {
          x: initialPosition.x + i,
          y: initialPosition.y - i,
        }
        // CHECK IF THE TILE IS THE DESTINATION TILE
        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          // DEALING WITH DESTINATION TILE
          if (
            tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)
          ) {
            return true
          }
        } else {
          // DEALING WITH PASSING TILE
          if (tileIsOccupied(passedPosition, boardState)) {
            break
          }
        }
      }

      // BOTTOM LEFT MOVEMENT
      if (
        desiredPosition.x < initialPosition.x &&
        desiredPosition.y < initialPosition.y
      ) {
        let passedPosition: Position = {
          x: initialPosition.x - i,
          y: initialPosition.y - i,
        }
        // CHECK IF THE TILE IS THE DESTINATION TILE
        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          // DEALING WITH DESTINATION TILE
          if (
            tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)
          ) {
            return true
          }
        } else {
          // DEALING WITH PASSING TILE
          if (tileIsOccupied(passedPosition, boardState)) {
            break
          }
        }
      }
    }
    return false
  }

  rookMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    if (initialPosition.x === desiredPosition.x) {
      for (let i = 1; i < 8; i++) {
        let multiplier = desiredPosition.y < initialPosition.y ? -1 : 1

        let passedPosition: Position = {
          x: initialPosition.x,
          y: initialPosition.y + i * multiplier,
        }

        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)
          ) {
            return true
          }
        } else {
          if (tileIsOccupied(passedPosition, boardState)) {
            break
          }
        }
      }
    }
    if (initialPosition.y === desiredPosition.y) {
      for (let i = 1; i < 8; i++) {
        let multiplier = desiredPosition.x < initialPosition.x ? -1 : 1

        let passedPosition: Position = {
          x: initialPosition.x + i * multiplier,
          y: initialPosition.y,
        }

        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)
          ) {
            return true
          }
        } else {
          if (tileIsOccupied(passedPosition, boardState)) {
            break
          }
        }
      }
    }
    return false
  }

  queenMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    for (let i = 1; i < 8; i++) {
      let multiplierX =
        desiredPosition.x < initialPosition.x
          ? -1
          : desiredPosition.x > initialPosition.x
          ? 1
          : 0
      let multiplierY =
        desiredPosition.y < initialPosition.y
          ? -1
          : desiredPosition.y > initialPosition.y
          ? 1
          : 0

      let passedPosition: Position = {
        x: initialPosition.x + i * multiplierX,
        y: initialPosition.y + i * multiplierY,
      }

      if (samePosition(passedPosition, desiredPosition)) {
        if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
          return true
        }
      } else {
        if (tileIsOccupied(passedPosition, boardState)) {
          break
        }
      }
    }
    return false
  }

  kingMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    for (let i = 1; i < 2; i++) {
      let multiplierX =
        desiredPosition.x < initialPosition.x
          ? -1
          : desiredPosition.x > initialPosition.x
          ? 1
          : 0
      let multiplierY =
        desiredPosition.y < initialPosition.y
          ? -1
          : desiredPosition.y > initialPosition.y
          ? 1
          : 0

      let passedPosition: Position = {
        x: initialPosition.x + i * multiplierX,
        y: initialPosition.y + i * multiplierY,
      }

      if (samePosition(passedPosition, desiredPosition)) {
        if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
          return true
        }
      } else {
        if (tileIsOccupied(passedPosition, boardState)) {
          break
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
        validMove = this.bishopMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        )
        break
      case PieceType.ROOK:
        validMove = this.rookMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        )
        break
      case PieceType.QUEEN:
        validMove = this.queenMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        )
        break
      case PieceType.KING:
        validMove = this.kingMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        )
    }
    return validMove
  }
}
