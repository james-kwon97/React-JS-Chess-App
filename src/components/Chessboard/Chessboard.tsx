import React from 'react'
import './Chessboard.css'
import Tile from '../Tile/Tile'

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8']
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

interface Piece {
  image: string
  x: number
  y: number
}

const pieces: Piece[] = []

for (let i = 0; i < 8; i++)
  pieces.push({ image: 'assets/images/blackpawn.png', x: i, y: 6 })

for (let i = 0; i < 8; i++)
  pieces.push({ image: 'assets/images/whitepawn.png', x: i, y: 1 })

pieces.push({ image: 'assets/images/blackrook.png', x: 0, y: 7 })
pieces.push({ image: 'assets/images/blackrook.png', x: 7, y: 7 })
pieces.push({ image: 'assets/images/blackknight.png', x: 1, y: 7 })
pieces.push({ image: 'assets/images/blackknight.png', x: 6, y: 7 })
pieces.push({ image: 'assets/images/blackbishop.png', x: 2, y: 7 })
pieces.push({ image: 'assets/images/blackbishop.png', x: 5, y: 7 })
pieces.push({ image: 'assets/images/blackqueen.png', x: 3, y: 7 })
pieces.push({ image: 'assets/images/blackking.png', x: 4, y: 7 })

pieces.push({ image: 'assets/images/whiterook.png', x: 0, y: 0 })
pieces.push({ image: 'assets/images/whiterook.png', x: 7, y: 0 })
pieces.push({ image: 'assets/images/whiteknight.png', x: 1, y: 0 })
pieces.push({ image: 'assets/images/whiteknight.png', x: 6, y: 0 })
pieces.push({ image: 'assets/images/whitebishop.png', x: 2, y: 0 })
pieces.push({ image: 'assets/images/whitebishop.png', x: 5, y: 0 })
pieces.push({ image: 'assets/images/whitequeen.png', x: 3, y: 0 })
pieces.push({ image: 'assets/images/whiteking.png', x: 4, y: 0 })

export default function Chessboard() {
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

      board.push(<Tile image={image} number={number} />)
    }
  }
  return <div id="chessboard">{board}</div>
}
