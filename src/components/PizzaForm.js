import React, { useEffect, useState } from "react";

function PizzaForm({ onEditPizza, pizzaId, setPizza }) {
  const [topping, setTopping] = useState("");
  const [size, setSize] = useState("");
  const [vegetarian, setVegetarian] = useState(true);

  // fetch the pizza that is editable.(id changes =>  pizza fetched)

  useEffect(() => {
    fetch(`http://localhost:3001/pizzas/${pizzaId}`)
      .then((res) => res.json())
      .then((pizza) => {
        setTopping(pizza.topping);
        setSize(pizza.size);
        setVegetarian(pizza.vegetarian);
      });
  }, [pizzaId]);


  function handleSubmit(e) {
    e.preventDefault();
    onEditPizza(pizzaId); // Send updated pizza data to onEditPizza function
    setPizza((prev) => {
      // setter for pizza state
      const updatedPizzaList = prev.map((pizza) => {
        // previous state => updated state
        if (pizza.id === pizzaId) {
          return {
            //  update the specific property based on the form input value.
            ...pizza,
            topping: topping,
            size: size,
            vegetarian: vegetarian,
          };
        }
        return pizza;
      });

      return updatedPizzaList;
    });
    const editedPizza = {
      topping: topping,
      size: size,
      vegetarian: vegetarian,
    };
    // persist data to backend
    // PATCH request

    fetch(`http://localhost:3001/pizzas/${pizzaId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedPizza),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error, "not found")
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            onChange={(e) => setTopping(e.target.value)}
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={topping}
          />
        </div>
        <div className="col">
          <select
            onChange={(e) => setSize(e.target.value)}
            className="form-control"
            name="size"
            value={size} // Set the value of the select element to the current of `size`
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value={true}
              checked={vegetarian === true}
              onChange={() => setVegetarian(true)}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value={false}
              checked={vegetarian === false}
              onChange={() => setVegetarian(false)}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
