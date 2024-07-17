import React, { useRef, useState } from 'react'
import './Chessboard.css'
import Tile from '../Tile/Tile'
import Referee from '../../Referee/Referee'
import {
  VERTICAL_AXIS,
  HORIZONTAL_AXIS,
  GRID_SIZE,
  Piece,
  TeamType,
  PieceType,
  initialBoardState,
  Position,
  samePosition,
} from '../../Constants'

export default function Chessboard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null)
  const [promotionPawn, setPromotionPawn] = useState<Piece>()
  const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 })
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
  const chessboardRef = useRef<HTMLDivElement>(null)
  const referee = new Referee()

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement
    const chessboard = chessboardRef.current
    if (element.classList.contains('chess-piece') && chessboard) {
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE)
      const grabY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 640) / GRID_SIZE)
      )
      setGrabPosition({
        x: grabX,
        y: grabY,
      })

      const x = e.clientX - GRID_SIZE / 2
      const y = e.clientY - GRID_SIZE / 2
      element.style.position = 'absolute'
      element.style.left = `${x}px`
      element.style.top = `${y}px`

      setActivePiece(element)
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 20
      const minY = chessboard.offsetTop - 20
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 60
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 60
      const x = e.clientX - 40
      const y = e.clientY - 40
      activePiece.style.position = 'absolute'

      // If x is smaller than min amount
      if (x < minX) {
        activePiece.style.left = `${minX}px`
        // If x is bigger than max amount
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`
        // If x is within the constraints
      } else {
        activePiece.style.left = `${x}px`
      }

      // If y is smaller than min amount
      if (y < minY) {
        activePiece.style.top = `${minY}px`
        // If y is bigger than max amount
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`
        // If y is within the constraints
      } else {
        activePiece.style.top = `${y}px`
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE)
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 640) / GRID_SIZE)
      )

      const currentPiece = pieces.find((p) =>
        samePosition(p.position, grabPosition)
      )

      if (currentPiece) {
        const validMove = referee.isValidMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        )
        const isEnPassantMove = referee.isEnPassantMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        )
        const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1

        if (isEnPassantMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant = false
              piece.position.x = x
              piece.position.y = y
              results.push(piece)
            } else if (
              !samePosition(piece.position, { x, y: y - pawnDirection })
            ) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false
              }
              results.push(piece)
            }
            return results
          }, [] as Piece[])
          setPieces(updatedPieces)
        } else if (validMove) {
          // UPDATES THE PIECE POSITION
          // AND IF A PIECE IS ATTACKED, REMOVES IT
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              // SPECIAL MOVE
              piece.enPassant =
                Math.abs(grabPosition.y - y) === 2 &&
                piece.type === PieceType.PAWN

              piece.position.x = x
              piece.position.y = y

              let promotionRow = piece.team === TeamType.OUR ? 7 : 0

              if (y === promotionRow) {
                setPromotionPawn(piece)
              }

              results.push(piece)
            } else if (!samePosition(piece.position, { x, y })) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false
              }
              results.push(piece)
            }

            return results
          }, [] as Piece[])
          setPieces(updatedPieces)
        } else {
          // RESETS THE PIECE POSITION
          activePiece.style.position = 'relative'
          activePiece.style.removeProperty('top')
          activePiece.style.removeProperty('left')
        }

        setActivePiece(null)
      }
    }
  }

  function promotePawn(pieceType: PieceType) {
    console.log(`Promoting pawn! Into ${pieceType}`)
    console.log(promotionPawn)
  }

  let board = []

  for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      const number = j + i + 2
      const piece = pieces.find((p) => samePosition(p.position, { x: i, y: j }))
      let image = piece ? piece.image : undefined

      board.push(<Tile key={`${j},${i}`} image={image} number={number} />)
    }
  }
  return (
    <>
      <div id="pawn-promotion-modal">
        <img
          onClick={() => promotePawn(PieceType.ROOK)}
          src="/assets/images/white-rook.png"
          alt="Rook piece"
        />
        <img
          onClick={() => promotePawn(PieceType.KNIGHT)}
          src="/assets/images/white-knight.png"
          alt="Knight piece"
        />
        <img
          onClick={() => promotePawn(PieceType.BISHOP)}
          src="/assets/images/white-bishop.png"
          alt="Rook piece"
        />
        <img
          onClick={() => promotePawn(PieceType.QUEEN)}
          src="/assets/images/white-queen.png"
          alt="Queen piece"
        />
      </div>
      <div
        onMouseMove={(e) => movePiece(e)}
        onMouseDown={(e) => grabPiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        id="chessboard"
        ref={chessboardRef}
      >
        {board}
      </div>
    </>
  )
}
