import React, { useEffect, useRef, useState } from 'react'
import './Chessboard.css'
import Tile from '../Tile/Tile'

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8']
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

interface Piece {
  image: string
  x: number
  y: number
}

export default function Chessboard() {
  const [pieces, setPieces] = useState<Piece[]>([])
  const chessboardRef = useRef<HTMLDivElement>(null)

  let activePiece: HTMLElement | null = null

  useEffect(() => {
    const pieces: Piece[] = []

    for (let p = 0; p < 2; p++) {
      const type = p === 0 ? 'black' : 'white'
      const y = p === 0 ? 7 : 0

      pieces.push({ image: `assets/images/${type}rook.png`, x: 0, y })
      pieces.push({ image: `assets/images/${type}rook.png`, x: 7, y })
      pieces.push({ image: `assets/images/${type}knight.png`, x: 1, y })
      pieces.push({ image: `assets/images/${type}knight.png`, x: 6, y })
      pieces.push({ image: `assets/images/${type}bishop.png`, x: 2, y })
      pieces.push({ image: `assets/images/${type}bishop.png`, x: 5, y })
      pieces.push({ image: `assets/images/${type}queen.png`, x: 3, y })
      pieces.push({ image: `assets/images/${type}king.png`, x: 4, y })
    }

    for (let i = 0; i < 8; i++)
      pieces.push({ image: 'assets/images/blackpawn.png', x: i, y: 6 })

    for (let i = 0; i < 8; i++)
      pieces.push({ image: 'assets/images/whitepawn.png', x: i, y: 1 })
  }, [])

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement
    if (element.classList.contains('chess-piece')) {
      const x = e.clientX - 40
      const y = e.clientY - 40
      element.style.position = 'absolute'
      element.style.left = `${x}px`
      element.style.top = `${y}px`

      activePiece = element
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
    if (activePiece) {
      activePiece = null
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
