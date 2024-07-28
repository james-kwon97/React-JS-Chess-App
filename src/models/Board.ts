import { PieceType, TeamType } from '../Types'
import { Pawn } from './Pawn'
import { Piece } from './Piece'
import { Position } from './Position'

export class Board {
  pieces: Piece[]

  constructor(pieces: Piece[]) {
    this.pieces = pieces
  }

  calculateAllMoves() {
    for (const piece of this.pieces) {
      piece.possibleMoves = []
    }
  }

  playMove(
    enPassantMove: boolean,
    validMove: boolean,
    destination: Position,
    playedPiece: Piece
  ): boolean {
    const pawnDirection = playedPiece.team === TeamType.OUR ? 1 : -1
    if (enPassantMove) {
      this.pieces = this.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          if (piece.isPawn) (piece as Pawn).enPassant = false
          piece.position.x = destination.x
          piece.position.y = destination.y
          results.push(piece)
        } else if (
          !piece.samePosition(
            new Position(destination.x, destination.y - pawnDirection)
          )
        ) {
          if (piece.isPawn) {
            ;(piece as Pawn).enPassant = false
          }
          results.push(piece)
        }
        return results
      }, [] as Piece[])

      this.calculateAllMoves()
    } else if (validMove) {
      // UPDATES THE PIECE POSITION
      // AND IF A PIECE IS ATTACKED, REMOVES IT
      this.pieces = this.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          // SPECIAL MOVE
          if (piece.isPawn)
            (piece as Pawn).enPassant =
              Math.abs(playedPiece.position.y - destination.y) === 2 &&
              piece.type === PieceType.PAWN

          piece.position.x = destination.x
          piece.position.y = destination.y

          results.push(piece)
        } else if (
          !piece.samePosition(new Position(destination.x, destination.y))
        ) {
          if (piece.isPawn) {
            ;(piece as Pawn).enPassant = false
          }
          results.push(piece)
        }

        return results
      }, [] as Piece[])

      this.calculateAllMoves()
    } else {
      return false
    }
    return true
  }
}
