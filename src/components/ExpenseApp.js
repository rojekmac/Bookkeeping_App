import React from "react";
// import logo from './logo.svg';
import "./App.css";
import Summary from "./Summary";

function ExpenseTrackerApp({ filterText }) {
  const [expenses, setExpenses] = React.useState([]);
  const [expense, setExpense] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [isEditingCost, setIsEditingCost] = React.useState(null);

  const [expenseName, setExpenseName] = React.useState("");
  const [isEditingExpense, setIsEditingExpense] = React.useState(null);

  const [category, setCategory] = React.useState("");
  const [isEditingCategory, setIsEditingCategory] = React.useState(null);

  const [editedCost, setEditedCost] = React.useState("");
  const [editedCategory, setEditedCategory] = React.useState("");

  function addExpense(e) {
    // a common practice in React - page won't regresh when we are pressing our "Add an Expense" button because by default forms refresh the page when submitted
    e.preventDefault();

    const newExpense = {
      id: new Date().getTime(),
      expense: expense,
      cost: parseFloat(cost),
      category: category,
    };
    // Check if the expense name is empty
    if (!newExpense.expense || !newExpense.category) {
      alert("Please enter all the fields.");
      return false;
    }
    // Check if the cost is empty
    if (!newExpense.cost) {
      alert("Please enter the cost.");
      return false;
    }

    // Check if the cost is negative
    if (newExpense.cost <= 0) {
      alert("Please enter a positive value for the cost.");
      return false;
    }

    // I have used a spread operator, because if we keep adding our expenses, they need to be stored in an array, and avoid data mutations
    setExpenses([...expenses, newExpense]);
    // we use this function to restore the second hook to its default value to an empty string so everytime it gets reset after submitting
    setExpense("");
    setCost("");
    setCategory("");
  }
  // this functions filters out the expense that we are trying to delete with the id
  function deleteExpense(id) {
    // we set up a variable -> if we return a truthy value, it will be included in the array, otherwise it will not include it
    //so we are only filtering the ones where expense.id is not equal to id and it will be true for every expense except the one that we are deleting
    const updatedExpenses = [...expenses].filter(
      (expense) => expense.id !== id
    );

    // here we have set up an aditional confirmation to make sure we want to delete certain expense
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses(updatedExpenses);
    }
  }

  function editExpense(id) {
    const updatedExpenses = [...expenses].map((expense) => {
      if (expense.id === id) {
        if (expenseName === "") {
          expense.expense = expense.expense;
        } else if (
          expenseName === "" ||
          expenseName === undefined ||
          expenseName === null
        ) {
          alert("Please enter a value for the expense.");
          return false;
        } else {
          expense.expense = expenseName;
        }
      }
      return expense;
    });
    setExpenses(updatedExpenses);
    setIsEditingExpense(null);
    setExpenseName("");
  }

  //a function to edit cost, I've created additional conditional that does not allow inserting negative or 0 values

  function editCost(id) {
    //find that one expense by id
    const expense = expenses.find((x) => x.id === id);

    //if we could not find return
    if (!expense) {
      alert("Could not find expense!");
      return;
    }

    if (!editedCost || editedCost < 0) {
      alert("Please enter a valid value for the expense.");
      return;
    }

    //state is immutable, we use spread operator to clone it
    const updatedExpenses = [
      ...expenses.filter((x) => x.id !== id),
      { ...expense, cost: parseInt(editedCost) },
    ];
    setExpenses(updatedExpenses);
    setEditedCost("");
    setIsEditingCost(null);
  }

  function editCategory(id) {
    //find that one expense by id
    const expense = expenses.find((x) => x.id === id);

    //if we could not find return
    if (!expense) {
      alert("Could not find expense!");
      return;
    }

    if (!editedCategory) {
      alert("Please enter a valid value for the category");
      return;
    }

    //state is immutable, we use spread operator to clone it
    const updatedExpenses = [
      ...expenses.filter((x) => x.id !== id),
      { ...expense, category: editedCategory },
    ];
    setExpenses(updatedExpenses);
    setEditedCategory("");
    setIsEditingCategory(null);
  }

  //this function handles the search logic
  function searchInExpenses(expenses) {
    //if there is no filter text return all expenses
    if (filterText.length === 0) {
      return expenses;
    }

    //if user entered something, filter them
    return expenses.filter(
      (exp) =>
        exp.category.toLowerCase().indexOf(filterText.toLowerCase()) > -1 ||
        exp.expense.toLowerCase().indexOf(filterText.toLowerCase()) > -1
    );
  }

  // we added a value={expense} that is to make sure that there is a >two way binding< in our code to avoid bugs
  return (
    <div className="App">
      <br></br>
      <h1> Enter your details </h1>
      <form onSubmit={addExpense}>
        <input
          type="text"
          placeholder="Expense Name"
          onChange={(e) => setExpense(e.target.value)}
          value={expense}
        />
        <input
          type="number"
          placeholder="Cost"
          onChange={(e) => setCost(e.target.value)}
          value={cost}
        />
        <input
          type="text"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <button type="submit">Add an Expense</button>
      </form>

      <ul>
        <br></br>
         <h1>List of your expenses:</h1> 
        {/* filter does the search */}
        {searchInExpenses(expenses).map((expense) => (
          <li class="expenseList" key={expense.id} style={{ fontSize: "1.2em" }}>
            {isEditingExpense === expense.id ? (
              <input
                type="text"
                onChange={(e) => setExpenseName(e.target.value)}
                value={expenseName}
              />
            ) : (
              <div id="topOfAnExpense" className="result">
                <b>Expense: </b>
                {expense.expense}
              </div>
            )}
            {isEditingCost === expense.id ? (
              <input
                type="number"
                onChange={(e) => setEditedCost(e.target.value)}
                value={editedCost}
              />
            ) : (
              <div className="result">
                <b>Cost: </b>£{expense.cost}
              </div>
            )}
            {isEditingCategory === expense.id ? (
              <input
                type="text"
                onChange={(e) => setEditedCategory(e.target.value)}
                value={editedCategory}
              />
            ) : (
              <div className="result">
                <b>Category: </b>
                {expense.category}
              </div>
            )}
            <button class="topButton" onClick={() => deleteExpense(expense.id)}>
              Delete Expense
            </button>
            <span> </span> <br></br>
            <button onClick={() => setIsEditingExpense(expense.id)}>
              Edit Expense Name
            </button>
            <button onClick={() => editExpense(expense.id)}>
              Submit Expense Edits
            </button> <br></br>
            <button onClick={() => setIsEditingCost(expense.id)}>
              Edit Cost
            </button> 
            <button onClick={() => editCost(expense.id)}>
              Submit Cost Edits
            </button> <br></br>
            <button onClick={() => setIsEditingCategory(expense.id)}>
              Edit Category
            </button>
            <button class="botButton" onClick={() => editCategory(expense.id)}>
              Submit Category Edits
            </button>
          </li>
        ))}
      </ul>
      <Summary expenses={expenses} />
    </div>
  );
}

export default ExpenseTrackerApp;