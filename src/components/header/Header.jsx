import { mainImg } from "../../assets/images"
import "./Header.css"

const Header = () => {
  return (
    <div>
      <h1>Header</h1>
      <img src={mainImg} alt="Main Image" />
    </div>
  )
}

export default Header