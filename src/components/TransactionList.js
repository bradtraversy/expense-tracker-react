import React, { useContext } from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);
  const [filter, setFilter] = useState();

  // added filtering

  const incomes = transactions.filter(transaction => {
    return transaction.amount > 0;
  });

  const expenses = transactions.filter(transaction => {
    return transaction.amount < 0;
  });

  const all = transactions.map(transaction => {
    return transaction
  });

  function handleChange(e){
    const selectFilter = e.target.value;
    setFilter(selectFilter);
  }
  
  return (
    <>
      <h3>History    
        {/* add this Select for sorting */}
        <select name="cars" id="cars" onChange={handleChange}>
          <option value="Income">Sort By</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
          <option value="All">All</option>
        </select>
      </h3>
    {/* add some condition */}
      <ul className="list">
      {(filter === "Income"
        ? incomes
        : filter === "Expense"
        ? expenses
        : all).map(transaction => (<Transaction key={transaction.id} transaction={transaction} />))}
      </ul>
      
    </>
  )
}
