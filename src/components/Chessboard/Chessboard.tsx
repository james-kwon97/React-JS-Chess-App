import React, { useRef, useState } from 'react'
import './Chessboard.css'
import Tile from '../Tile/Tile'
import Referee from '../../Referee/Referee'
import {
  verticalAxis,
  horizontalAxis,
  Piece,
  TeamType,
  PieceType,
  initialBoardState,
} from '../../Constants'

export default function Chessboard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null)
  const [gridX, setGridX] = useState(0)
  const [gridY, setGridY] = useState(0)
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
  const chessboardRef = useRef<HTMLDivElement>(null)
  const referee = new Referee()

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement
    const chessboard = chessboardRef.current
    if (element.classList.contains('chess-piece') && chessboard) {
      const gridX = Math.floor((e.clientX - chessboard.offsetLeft) / 80)
      const gridY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 640) / 80)
      )
      setGridX(gridX)
      setGridY(gridY)

      const x = e.clientX - 40
      const y = e.clientY - 40
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
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 80)
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 640) / 80)
      )

      const currentPiece = pieces.find((p) => p.x === gridX && p.y === gridY)
      const attackedPiece = pieces.find((p) => p.x === x && p.y === y)

      console.log(currentPiece)
      console.log(attackedPiece)

      if (currentPiece) {
        const validMove = referee.isValidMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        )
        const isEnPassantMove = referee.isEnPassantMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        )
        const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1

        if (isEnPassantMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (piece.x === gridX && piece.y === gridY) {
              piece.enPassant = false
              piece.x = x
              piece.y = y
              results.push(piece)
            } else if (!(piece.x === x && piece.y === y - pawnDirection)) {
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
            if (piece.x === gridX && piece.y === gridY) {
              if (Math.abs(gridY - y) === 2 && piece.type === PieceType.PAWN) {
                // SPECIAL MOVE

                piece.enPassant = true
              } else {
                piece.enPassant = false
              }
              piece.x = x
              piece.y = y
              results.push(piece)
            } else if (!(piece.x === x && piece.y === y)) {
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

  let board = []

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2
      let image = undefined

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image
        }
      })

      board.push(<Tile key={`${j},${i}`} image={image} number={number} />)
    }
  }
  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id="chessboard"
      ref={chessboardRef}
    >
      {board}
    </div>
  )
}
