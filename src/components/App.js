import React, { useEffect, useState } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizza, setPizza] = useState([]);
  const [pizzaId, setPizzaId] = useState(null);

  useEffect(() => {
    fetch(" http://localhost:3001/pizzas")
      .then((res) => res.json())
      .then((pizzaArr) => setPizza(pizzaArr));
  }, []);

  function onEditMode(id) {
    const selectedPizza = pizza.find((pizza) => pizza.id === id);
    setPizzaId(id);
  
  }

  return (
    <>
      <Header />
      <PizzaForm onEditPizza={onEditMode} pizzaId={pizzaId} pizza={pizza} setPizza={setPizza}/>
      <PizzaList pizza={pizza} onEditPizza={onEditMode} />
    </>
  );
}

export default App;
