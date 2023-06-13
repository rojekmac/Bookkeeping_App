import React from "react";
import ExpenseTrackerApp from "./ExpenseApp";
import PrimarySearchAppBar from "./AppHeader";
//import SearchBar from './searchBar';

const App = () => {
  //here we lift the filterText state up, so we can pass it to the ExpenseTrackerApp in its props
  //https://react.dev/learn/sharing-state-between-components#lifting-state-up-by-example

  const [filterText, setFilterText] = React.useState("");

  return (
    <div className="container">
      <PrimarySearchAppBar
        filterText={filterText}
        setFilterText={setFilterText}
      />
      <ExpenseTrackerApp filterText={filterText} />
    </div>
  );
};

export default App;
