import React from "react";
import Pizza from "./Pizza";

function PizzaList({ pizza, onEditPizza }) {

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Topping</th>
          <th scope="col">Size</th>
          <th scope="col">Vegetarian?</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
        {pizza.map((p) => (
          <Pizza
            key={p.id}
            id={p.id}
            topping={p.topping}
            size={p.size}
            vegetarian={p.vegetarian}
            onEditPizza={onEditPizza}
          />
        ))}
      </tbody>
    </table>
  );
}

export default PizzaList;
