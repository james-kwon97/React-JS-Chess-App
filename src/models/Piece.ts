import { PieceType, Position, TeamType } from '../Constants'

export class Piece {
  image?: string
  position: Position
  type: PieceType
  team: TeamType
  enPassant?: boolean
  possibleMoves?: Position[]
  constructor() {
    this.image = ''
    this.position = { x: 0, y: 0 }
    this.type = PieceType.PAWN
    this.team = TeamType.OUR
  }
}
