import {
  PieceType,
  TeamType,
  Piece,
  Position,
  samePosition,
} from '../Constants'

export default class Referee {
  tileIsEmptyOrOccupiedByOpponent(
    position: Position,
    boardState: Piece[],
    team: TeamType
  ) {
    return (
      !this.tileIsOccupied(position, boardState) ||
      this.tileIsOccupiedByOpponent(position, boardState, team)
    )
  }
  tileIsOccupied(position: Position, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => samePosition(p.position, position))
    if (piece) {
      return true
    } else return false
  }

  tileIsOccupiedByOpponent(
    position: Position,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => samePosition(p.position, position) && p.team !== team
    )
    if (piece) {
      return true
    }
    return false
  }

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

  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    if (type === PieceType.PAWN) {
      const specialRow = team === TeamType.OUR ? 1 : 6
      const pawnDirection = team === TeamType.OUR ? 1 : -1

      // PAWN MOVEMENT LOGIC
      if (
        initialPosition.x === desiredPosition.x &&
        initialPosition.y === specialRow &&
        desiredPosition.y - initialPosition.y === 2 * pawnDirection
      ) {
        if (
          !this.tileIsOccupied(desiredPosition, boardState) &&
          !this.tileIsOccupied(
            { x: desiredPosition.x, y: desiredPosition.y - pawnDirection },
            boardState
          )
        ) {
          return true
        }
      } else if (
        initialPosition.x === desiredPosition.x &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (!this.tileIsOccupied(desiredPosition, boardState)) {
          return true
        }
      }
      // PAWN ATTACK LOGIC
      else if (
        desiredPosition.x - initialPosition.x === -1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        //PAWN ATTACK IN THE UPPER OR BOTTOM LEFT CORNER
        console.log('Upper/ bottom left corner')
        if (this.tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
          return true
        }
      } else if (
        desiredPosition.x - initialPosition.x === 1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        // PAWN ATTACK IN THE UPPER OR BOTTOM RIGHT CORNER
        console.log('Upper/ lower right corner')
        if (this.tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
          return true
        }
      }
    } else if (type === PieceType.KNIGHT) {
      for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {
          // TOP AND BOTTOM SIDE MOVEMENT
          if (desiredPosition.y - initialPosition.y === 2 * i) {
            if (desiredPosition.x - initialPosition.x === j) {
              if (
                this.tileIsEmptyOrOccupiedByOpponent(
                  desiredPosition,
                  boardState,
                  team
                )
              ) {
                return true
              }
            }
          }

          // LEFT AND RIGHT SIDE MOVEMENT
          if (desiredPosition.x - initialPosition.x === 2 * i) {
            if (desiredPosition.y - initialPosition.y === j) {
              if (
                this.tileIsEmptyOrOccupiedByOpponent(
                  desiredPosition,
                  boardState,
                  team
                )
              ) {
                return true
              }
            }
          }
        }
      }
    } else if (type === PieceType.BISHOP) {
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
              this.tileIsEmptyOrOccupiedByOpponent(
                passedPosition,
                boardState,
                team
              )
            ) {
              return true
            }
          } else {
            // DEALING WITH PASSING TILE
            if (this.tileIsOccupied(passedPosition, boardState)) {
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
              this.tileIsEmptyOrOccupiedByOpponent(
                passedPosition,
                boardState,
                team
              )
            ) {
              return true
            }
          } else {
            if (this.tileIsOccupied(passedPosition, boardState)) {
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
              this.tileIsEmptyOrOccupiedByOpponent(
                passedPosition,
                boardState,
                team
              )
            ) {
              return true
            }
          }
          // DEALING WITH PASSING TILE
          else if (this.tileIsOccupied(passedPosition, boardState)) {
            break
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
              this.tileIsEmptyOrOccupiedByOpponent(
                passedPosition,
                boardState,
                team
              )
            ) {
              return true
            }
          }
          // DEALING WITH PASSING TILE
          else if (this.tileIsOccupied(passedPosition, boardState)) {
            break
          }
        }
      }
    } else if (type === PieceType.ROOK) {
      if (initialPosition.x === desiredPosition.x) {
        console.log('Moving vertically')

        for (let i = 1; i < 8; i++) {
          let multiplier = desiredPosition.y < initialPosition.y ? -1 : 1

          let passedPosition: Position = {
            x: initialPosition.x,
            y: initialPosition.y + i * multiplier,
          }
          console.log(passedPosition)
          if (
            passedPosition.x === desiredPosition.x &&
            passedPosition.y === desiredPosition.y
          ) {
            console.log('Arrived!')
            break
          }
        }
      }
      if (initialPosition.y === desiredPosition.y) {
        console.log('Moving horizontally')

        for (let i = 1; i < 8; i++) {
          let multiplier = desiredPosition.x < initialPosition.x ? -1 : 1

          let passedPosition: Position = {
            x: initialPosition.x + i * multiplier,
            y: initialPosition.y,
          }
          console.log(passedPosition)
          if (
            passedPosition.x === desiredPosition.x &&
            passedPosition.y === desiredPosition.y
          ) {
            console.log('Arrived!')
            break
          }
        }
      }
    }
    return false
  }
}
