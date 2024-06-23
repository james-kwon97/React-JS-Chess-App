import './Tile.css'

interface Props {
  number: number
}

export default function Tile({ number }: Props) {
  if (number % 2 === 0) {
    return (
      <div className="tile black-tile">
        <img src="./assets/images/blackpawn.png" alt="Black pawn" />
      </div>
    )
  } else {
    return <div className="tile white-tile"></div>
  }
}
