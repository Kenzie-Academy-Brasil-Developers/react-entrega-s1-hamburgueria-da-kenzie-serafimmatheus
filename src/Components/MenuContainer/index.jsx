import { Products } from "../Products";
import "./style.css";

export const MenuContainer = ({ children, products, onClick }) => {
  return (
    <div className="overflowX">
      <ul>
        <Products children={children} products={products} onClick={onClick} />
      </ul>
    </div>
  );
};
