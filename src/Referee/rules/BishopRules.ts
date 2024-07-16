import { Piece, Position, TeamType } from '../../Constants'
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied } from './GeneralRules'

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
