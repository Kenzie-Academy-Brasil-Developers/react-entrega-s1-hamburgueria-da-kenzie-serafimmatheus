import { MenuContainer } from "./Components/MenuContainer";
import { useState } from "react";
import { Button } from "./Components/Button";
import "./App.css";
import "./reset.css";

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Hamburguer",
      category: "Sanduíches",
      price: 14.0,
      img: "https://i.ibb.co/fpVHnZL/hamburguer.png",
    },
    {
      id: 2,
      name: "X-Burguer",
      category: "Sanduíches",
      price: 16.0,
      img: "https://i.ibb.co/djbw6LV/x-burgue.png",
    },
    {
      id: 3,
      name: "Big Kenzie",
      category: "Sanduíches",
      price: 18.0,
      img: "https://i.ibb.co/FYBKCwn/big-kenzie.png",
    },
    {
      id: 4,
      name: "Fanta Guaraná",
      category: "Bebidas",
      price: 5.0,
      img: "https://i.ibb.co/cCjqmPM/fanta-guarana.png",
    },
    {
      id: 5,
      name: "Coca",
      category: "Bebidas",
      price: 4.99,
      img: "https://i.ibb.co/fxCGP7k/coca-cola.png",
    },
    {
      id: 6,
      name: "Milkshake Ovomaltine",
      category: "Bebidas",
      price: 4.99,
      img: "https://i.ibb.co/QNb3DJJ/milkshake-ovomaltine.png",
    },
  ]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentSale, setCurrentSale] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [isTrue, setIsTrue] = useState(true);
  const [isCarrinho, setIsCarrinho] = useState(false);

  const filterSrc = () => {
    if (nameFilter === "") {
      setIsTrue(true);
    } else {
      nameFilter.toLocaleLowerCase();
      setIsTrue(!isTrue);
      const newArrProdutos = products.filter((filt) =>
        filt.name.toLocaleLowerCase().startsWith(nameFilter)
      );

      setFilteredProducts(newArrProdutos);
    }
  };

  const addCarrinho = (event) => {
    setIsCarrinho(true);
    const idcarrinho = event.target.id;

    const novoItemCarrinho = products.find(
      (carrinho) => carrinho.id === parseInt(idcarrinho)
    );

    if (currentSale.find((elem) => elem.id === novoItemCarrinho.id)) {
      return window.alert("Item já adicionado");
    } else {
      setCurrentSale([...currentSale, novoItemCarrinho]);
    }
  };

  const removeCarrinho = (evt) => {
    const idBtn = evt.target.id;
    setCurrentSale(currentSale.filter((elem) => elem.id != idBtn));
  };

  const removeAll = () => {
    setCurrentSale([]);
    setIsCarrinho(false);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <div className="box-logo">
            <h1>
              Burguer <span>Kenzie</span>
            </h1>
          </div>

          <div className="box-input">
            <input
              placeholder="Clique em Pesquisar para voltar"
              value={nameFilter}
              onChange={(event) => setNameFilter(event.target.value)}
              //
            />
            <button onClick={filterSrc}>Pesquisar</button>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <section className="shop">
            {isTrue ? (
              <MenuContainer products={products} onClick={addCarrinho}>
                Comprar
              </MenuContainer>
            ) : (
              <>
                <h2 className="shop__resultado">
                  Resultado para <span>{nameFilter}</span>
                </h2>
                <MenuContainer
                  products={filteredProducts}
                  onClick={addCarrinho}
                >
                  Comprar
                </MenuContainer>
              </>
            )}
          </section>

          <aside>
            <div className="aside__title">
              <h2>Carrinho de compras</h2>
            </div>
            {isCarrinho === false ? (
              <ul className="box-carrinho_vazia">
                <div className="box-carrinho__style">
                  <h2>Sua sacola está vazia</h2>
                  <p>Adicione itens</p>
                </div>
              </ul>
            ) : (
              <>
                <ul className="box-carrinho">
                  {currentSale.map((elem, index) => (
                    <li key={index + 1}>
                      <div className="shop__img__carrinho">
                        <img src={elem.img} alt={elem.name} />
                      </div>

                      <div className="shop__title">
                        <h2>{elem.name}</h2>
                        <p>{elem.category}</p>
                      </div>
                      <p className="shop__price__carrinho">
                        {"R$ "}
                        {elem.price.toFixed(2).replace(".", ",")}
                      </p>
                      <button
                        onClick={removeCarrinho}
                        className="shop__btn__carrinho"
                        id={elem.id}
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="box-carrinho__value">
                  <span>Total:</span>
                  <span>
                    {"R$"}
                    {currentSale
                      .reduce(
                        (valorAnterior, valorAtual) =>
                          valorAtual.price + valorAnterior,
                        0
                      )
                      .toFixed(2)
                      .replace(".", ",")}
                  </span>
                  <Button onClick={removeAll}>Remover todos</Button>
                </div>
              </>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
