import { Piece } from './models/Piece'

export const VERTICAL_AXIS = ['1', '2', '3', '4', '5', '6', '7', '8']
export const HORIZONTAL_AXIS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export const GRID_SIZE = 80

export function samePosition(p1: Position, p2: Position) {
  return p1.x === p2.x && p1.y === p2.y
}

export interface Position {
  x: number
  y: number
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
  new Piece(
    `assets/images/black-rook.png`,
    { x: 0, y: 7 },
    PieceType.ROOK,
    TeamType.OPPONENT
  ),
  new Piece(
    `assets/images/black-knight.png`,
    { x: 1, y: 7 },
    PieceType.KNIGHT,
    TeamType.OPPONENT
  ),
  new Piece(
    `assets/images/black-bishop.png`,
    {
      x: 2,
      y: 7,
    },
    PieceType.BISHOP,
    TeamType.OPPONENT
  ),
  new Piece(
    `assets/images/black-queen.png`,
    {
      x: 3,
      y: 7,
    },
    PieceType.QUEEN,
    TeamType.OPPONENT
  ),
  new Piece(
    `assets/images/black-king.png`,
    { x: 4, y: 7 },
    PieceType.KING,
    TeamType.OPPONENT
  ),
  new Piece(
    `assets/images/black-bishop.png`,
    { x: 5, y: 7 },
    PieceType.BISHOP,
    TeamType.OPPONENT
  ),
  new Piece(
    `assets/images/black-knight.png`,
    { x: 6, y: 7 },
    PieceType.KNIGHT,
    TeamType.OPPONENT
  ),
  new Piece(
    `assets/images/black-rook.png`,
    { x: 7, y: 7 },
    PieceType.ROOK,
    TeamType.OPPONENT
  ),
  new Piece(
    `assets/images/black-pawn.png`,
    { x: 0, y: 6 },
    PieceType.PAWN,
    TeamType.OPPONENT
  ),
  new Piece(
    `assets/images/black-pawn.png`,
    { x: 1, y: 6 },
    PieceType.PAWN,
    TeamType.OPPONENT
  ),
  new Piece(
    `assets/images/black-pawn.png`,
    { x: 2, y: 6 },
    PieceType.PAWN,
    TeamType.OPPONENT
  ),
  new Piece(
    `assets/images/black-pawn.png`,
    { x: 3, y: 6 },
    PieceType.PAWN,
    TeamType.OPPONENT
  ),
  new Piece(
    `assets/images/black-pawn.png`,
    { x: 4, y: 6 },
    PieceType.PAWN,
    TeamType.OPPONENT
  ),
  new Piece(
    `assets/images/black-pawn.png`,
    { x: 5, y: 6 },
    PieceType.PAWN,
    TeamType.OPPONENT
  ),
  new Piece(
    `assets/images/black-pawn.png`,
    { x: 6, y: 6 },
    PieceType.PAWN,
    TeamType.OPPONENT
  ),
  new Piece(
    `assets/images/black-pawn.png`,
    { x: 7, y: 6 },
    PieceType.PAWN,
    TeamType.OPPONENT
  ),
  new Piece(
    `assets/images/white-rook.png`,
    { x: 0, y: 0 },
    PieceType.ROOK,
    TeamType.OUR
  ),
  new Piece(
    `assets/images/white-knight.png`,
    { x: 1, y: 0 },
    PieceType.KNIGHT,
    TeamType.OUR
  ),
  new Piece(
    `assets/images/white-bishop.png`,
    { x: 2, y: 0 },
    PieceType.BISHOP,
    TeamType.OUR
  ),
  new Piece(
    `assets/images/white-queen.png`,
    { x: 3, y: 0 },
    PieceType.QUEEN,
    TeamType.OUR
  ),
  new Piece(
    `assets/images/white-king.png`,
    { x: 4, y: 0 },
    PieceType.KING,
    TeamType.OUR
  ),
  new Piece(
    `assets/images/white-bishop.png`,
    { x: 5, y: 0 },
    PieceType.BISHOP,
    TeamType.OUR
  ),
  new Piece(
    `assets/images/white-knight.png`,
    { x: 6, y: 0 },
    PieceType.KNIGHT,
    TeamType.OUR
  ),
  new Piece(
    `assets/images/white-rook.png`,
    { x: 7, y: 0 },
    PieceType.ROOK,
    TeamType.OUR
  ),
  new Piece(
    `assets/images/white-pawn.png`,
    { x: 0, y: 1 },
    PieceType.PAWN,
    TeamType.OUR
  ),
  new Piece(
    `assets/images/white-pawn.png`,
    { x: 1, y: 1 },
    PieceType.PAWN,
    TeamType.OUR
  ),
  new Piece(
    `assets/images/white-pawn.png`,
    { x: 2, y: 1 },
    PieceType.PAWN,
    TeamType.OUR
  ),
  new Piece(
    `assets/images/white-pawn.png`,
    { x: 3, y: 1 },
    PieceType.PAWN,
    TeamType.OUR
  ),
  new Piece(
    `assets/images/white-pawn.png`,
    { x: 4, y: 1 },
    PieceType.PAWN,
    TeamType.OUR
  ),
  new Piece(
    `assets/images/white-pawn.png`,
    { x: 5, y: 1 },
    PieceType.PAWN,
    TeamType.OUR
  ),
  new Piece(
    `assets/images/white-pawn.png`,
    { x: 6, y: 1 },
    PieceType.PAWN,
    TeamType.OUR
  ),
  new Piece(
    `assets/images/white-pawn.png`,
    { x: 7, y: 1 },
    PieceType.PAWN,
    TeamType.OUR
  ),
]
