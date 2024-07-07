import { PieceType, TeamType, Piece, Position } from '../Constants'

export default class Referee {
  isTileOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y
    )
    if (piece) {
      return true
    } else return false
  }

  tileIsOccupiedByOpponent(
    x: number,
    y: number,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y && p.team !== team
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
          !this.isTileOccupied(
            desiredPosition.x,
            desiredPosition.y,
            boardState
          ) &&
          !this.isTileOccupied(
            desiredPosition.x,
            desiredPosition.y - pawnDirection,
            boardState
          )
        ) {
          return true
        }
      } else if (
        initialPosition.x === desiredPosition.x &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        if (
          !this.isTileOccupied(desiredPosition.x, desiredPosition.y, boardState)
        ) {
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
        if (
          this.tileIsOccupiedByOpponent(
            desiredPosition.x,
            desiredPosition.y,
            boardState,
            team
          )
        ) {
          return true
        }
      } else if (
        desiredPosition.x - initialPosition.x === 1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        // PAWN ATTACK IN THE UPPER OR BOTTOM RIGHT CORNER
        console.log('Upper/ lower right corner')
        if (
          this.tileIsOccupiedByOpponent(
            desiredPosition.x,
            desiredPosition.y,
            boardState,
            team
          )
        ) {
          return true
        }
      }
    } else if (type === PieceType.KNIGHT) {
      console.log('Knight')
      // MOVING LOGIC FOR THE KNIGHT
      // 8 different moving patterns

      //TOP LINE
      if (desiredPosition.y - initialPosition.y === 2) {
        if (desiredPosition.x - initialPosition.x === -1) {
          console.log('Top left knight movement')
        }
        if (desiredPosition.x - initialPosition.x === 1) {
          console.log('Top right knight movement')
        }
      }

      // RIGHT LINE
      if (desiredPosition.x - initialPosition.x === 2) {
        if (desiredPosition.y - initialPosition.y === 1) {
          console.log('Right top knight movement')
        }
        if (desiredPosition.y - initialPosition.y === -1) {
          console.log('Right bottom knight movement')
        }
      }

      // BOTTOM LINE
      if (desiredPosition.y - initialPosition.y === -2) {
        if (desiredPosition.x - initialPosition.x === -1) {
          console.log('Bottom left knight movement')
        }
        if (desiredPosition.x - initialPosition.x === 1) {
          console.log('Bottom right knight movement')
        }
      }

      // LEFT LINE
      if (desiredPosition.x - initialPosition.x === -2) {
        if (desiredPosition.y - initialPosition.y === 1) {
          console.log('Left top knight movement')
        }
        if (desiredPosition.y - initialPosition.y === -1) {
          console.log('Left bottom knight movement')
        }
      }
    }
    return false
  }
}
