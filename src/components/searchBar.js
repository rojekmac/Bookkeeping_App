// Import the `useState` hook from React.
import { useState } from "react";

// Import the `ExpenseTrackerApp` component from the `./ExpenseApp` file.
import ExpenseTrackerApp from "./ExpenseApp";

// Define the `SearchBar` component.
function SearchBar() {

  // Create a constant called `expense` that stores an array of all the expenses from the `ExpenseTrackerApp` component.
  const expense = [ExpenseTrackerApp.expenses];

  // Define two state variables: `searchString` and `setSearchString`.
  // The `searchString` variable stores the current search string,
  // and the `setSearchString` variable is a function that is used to update the `searchString` variable.
  const [searchString, setSearchString] = useState("");

  // The `startsWith` function takes a string as its input and returns a function that takes another string as its input.
  // The returned function checks if the second string starts with the first string.
  const startsWith = str => word => str ? word.slice(0, str.length).toLowerCase() === str.toLowerCase() : true;

  // Return a `div` element.
  // Return an `input` element with an `onChange` event handler that calls the `setSearchString` function to update the `searchString` variable when the user changes the input value.
  // Later I generated  a list of all the expenses that start with the current search string.
  // The list items are generated by calling the `map` function on the `expense` array and passing the `startsWith` function as a callback.
  return (
    <div>
      
      <input
        onChange={e => setSearchString(e.target.value)}
      />

      <ul>
        
        {expense.filter(startsWith(searchString)).map(expense => (
          <li key={expense.id}>{expense}</li>
        ))}
      </ul>
    </div>
  );
}

// Export the `SearchBar` component as the default export.
export default SearchBar;
