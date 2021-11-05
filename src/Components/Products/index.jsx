import { Button } from "../Button";
export const Products = ({ children, products, onClick }) => {
  return (
    <>
      {products.map((elem) => (
        <li>
          <div className="shop__img">
            <img src={elem.img} alt={elem.name} />
          </div>
          <h2>{elem.name}</h2>
          <p>{elem.category}</p>
          <p className="shop__price">
            {"R$ "}
            {elem.price.toFixed(2).replace(".", ",")}
          </p>
          <button className="shop__btn" onClick={onClick} id={elem.id}>
            {children}
          </button>
        </li>
      ))}
    </>
  );
};
