export const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8']
export const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export interface Piece {
  image: string
  x: number
  y: number
  type: PieceType
  team: TeamType
  enPassant?: boolean
}

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
}

export enum TeamType {
  OPPONENT,
  OUR,
}

export const initialBoardState: Piece[] = [
  {
    image: `assets/images/black-rook.png`,
    x: 0,
    y: 7,
    type: PieceType.ROOK,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/black-knight.png`,
    x: 1,
    y: 7,
    type: PieceType.KNIGHT,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/black-bishop.png`,
    x: 2,
    y: 7,
    type: PieceType.BISHOP,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/black-queen.png`,
    x: 3,
    y: 7,
    type: PieceType.QUEEN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/black-king.png`,
    x: 4,
    y: 7,
    type: PieceType.KING,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/black-bishop.png`,
    x: 5,
    y: 7,
    type: PieceType.BISHOP,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/black-knight.png`,
    x: 6,
    y: 7,
    type: PieceType.KNIGHT,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/black-rook.png`,
    x: 7,
    y: 7,
    type: PieceType.ROOK,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/black-pawn.png`,
    x: 0,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/black-pawn.png`,
    x: 1,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/black-pawn.png`,
    x: 2,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/black-pawn.png`,
    x: 3,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/black-pawn.png`,
    x: 4,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/black-pawn.png`,
    x: 5,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/black-pawn.png`,
    x: 6,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/black-pawn.png`,
    x: 7,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  },
  {
    image: `assets/images/white-rook.png`,
    x: 0,
    y: 0,
    type: PieceType.ROOK,
    team: TeamType.OUR,
  },
  {
    image: `assets/images/white-knight.png`,
    x: 1,
    y: 0,
    type: PieceType.KNIGHT,
    team: TeamType.OUR,
  },
  {
    image: `assets/images/white-bishop.png`,
    x: 2,
    y: 0,
    type: PieceType.BISHOP,
    team: TeamType.OUR,
  },
  {
    image: `assets/images/white-queen.png`,
    x: 3,
    y: 0,
    type: PieceType.QUEEN,
    team: TeamType.OUR,
  },
  {
    image: `assets/images/white-king.png`,
    x: 4,
    y: 0,
    type: PieceType.KING,
    team: TeamType.OUR,
  },
  {
    image: `assets/images/white-bishop.png`,
    x: 5,
    y: 0,
    type: PieceType.BISHOP,
    team: TeamType.OUR,
  },
  {
    image: `assets/images/white-knight.png`,
    x: 6,
    y: 7,
    type: PieceType.KNIGHT,
    team: TeamType.OUR,
  },
  {
    image: `assets/images/white-rook.png`,
    x: 7,
    y: 7,
    type: PieceType.ROOK,
    team: TeamType.OUR,
  },
  {
    image: `assets/images/white-pawn.png`,
    x: 0,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: `assets/images/white-pawn.png`,
    x: 1,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: `assets/images/white-pawn.png`,
    x: 2,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: `assets/images/white-pawn.png`,
    x: 3,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: `assets/images/white-pawn.png`,
    x: 4,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: `assets/images/white-pawn.png`,
    x: 5,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: `assets/images/white-pawn.png`,
    x: 6,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
  {
    image: `assets/images/white-pawn.png`,
    x: 7,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  },
]
