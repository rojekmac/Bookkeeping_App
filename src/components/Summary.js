import React from "react";

function Summary({ expenses }) {
  const [categories, setCategories] = React.useState([]);
  //this method triggers whenever the dependency array, in this case expenses changes
  React.useEffect(() => {
    const distinctCategories = [];

    for (let i = 0; i < expenses.length; i++) {
      if (!distinctCategories.includes(expenses[i].category)) {
        distinctCategories.push(expenses[i].category);
      }
    }

    setCategories(distinctCategories);
    //[expenses] is the dependency array of useEffect, whenever this changes, this whole method rerun. basically when a new expense is added, this components props receives it, and we update the categories
  }, [expenses]);

  const totalCost = expenses.reduce((prev, curr) => (prev += curr.cost), 0);

  return (
    <div>
      <ul>
        <li id="topLi"><b>Amount of unique categories: </b> {categories.length}</li>
        <li class="costLI"><b>Total costs:</b> £{totalCost}</li>
        {categories.map((category) => {
          //we have the categories in our state, we just filter all items from the props by this category
          const categoryExpenses = expenses.filter(
            (x) => x.category === category
          );

          //then we sum their cost
          const categoryTotalCost = categoryExpenses.reduce(
            (prev, curr) => (prev += curr.cost),
            0
          );

          return (
            <>
              <li class="summaryLI">
                {/* and just print its length */}
                <b>Total items in the {category} category:</b> {categoryExpenses.length}
              </li>
              <li >
              <b>Total costs for {category} category:</b> £{categoryTotalCost}
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default Summary;
