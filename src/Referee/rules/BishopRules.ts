import { TeamType } from '../../Constants'
import { Piece, Position } from '../../models'
import {
  tileIsEmptyOrOccupiedByOpponent,
  tileIsOccupied,
  tileIsOccupiedByOpponent,
} from './GeneralRules'

export const bishopMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  // MOVEMENT AND ATTACK LOGIC FOR THE BISHOP

  for (let i = 1; i < 8; i++) {
    // TOP RIGHT MOVEMENT
    if (
      desiredPosition.x > initialPosition.x &&
      desiredPosition.y > initialPosition.y
    ) {
      let passedPosition = new Position(
        initialPosition.x + i,
        initialPosition.y + i
      )
      // CHECK IF THE TILE IS THE DESTINATION TILE
      if (passedPosition.samePosition(desiredPosition)) {
        // DEALING WITH DESTINATION TILE
        if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
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
      let passedPosition = new Position(
        initialPosition.x + i,
        initialPosition.y - i
      )
      // CHECK IF THE TILE IS THE DESTINATION TILE
      if (passedPosition.samePosition(desiredPosition)) {
        // DEALING WITH DESTINATION TILE
        if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
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
      let passedPosition = new Position(
        initialPosition.x - i,
        initialPosition.y - i
      )
      // CHECK IF THE TILE IS THE DESTINATION TILE
      if (passedPosition.samePosition(desiredPosition)) {
        // DEALING WITH DESTINATION TILE
        if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
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
      let passedPosition = new Position(
        initialPosition.x - i,
        initialPosition.y + i
      )
      // CHECK IF THE TILE IS THE DESTINATION TILE
      if (passedPosition.samePosition(desiredPosition)) {
        // DEALING WITH DESTINATION TILE
        if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
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

export const getPossibleBishopMoves = (
  bishop: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = []

  // Upper right movement
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      bishop.position.x + i,
      bishop.position.y + i
    )

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination)
    } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
      possibleMoves.push(destination)
      break
    } else {
      break
    }
  }
  // Bottom right movement
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      bishop.position.x + i,
      bishop.position.y - i
    )

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination)
    } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
      possibleMoves.push(destination)
      break
    } else {
      break
    }
  }

  // Bottom left movement
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      bishop.position.x - i,
      bishop.position.y - i
    )

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination)
    } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
      possibleMoves.push(destination)
      break
    } else {
      break
    }
  }
  // Top left movement
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      bishop.position.x - i,
      bishop.position.y + i
    )

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination)
    } else if (tileIsOccupiedByOpponent(destination, boardState, bishop.team)) {
      possibleMoves.push(destination)
      break
    } else {
      break
    }
  }
  return possibleMoves
}
