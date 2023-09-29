import React, { useContext, useEffect, useState } from 'react';
import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [selectedDate, setSelectedDate] = useState('');
  const [filterByWeek, setFilterByWeek] = useState(false);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const uniqueCategories = [...new Set(transactions.map(transaction => transaction.category))];
    setCategories(['All', ...uniqueCategories]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  const getStartAndEndOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const startOfWeek = new Date(d.setDate(diff));
    const endOfWeek = new Date(d.setDate(diff + 6));
    return { startOfWeek, endOfWeek };
  }

  const filteredTransactions = transactions
    .filter(transaction => selectedCategory === 'All' || transaction.category === selectedCategory)
    .filter(transaction => {
      if (!selectedDate) return true;
      if (filterByWeek) {
        const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(selectedDate);
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startOfWeek && transactionDate <= endOfWeek;
      }
      return new Date(transaction.date).toDateString() === new Date(selectedDate).toDateString();
    });

  return (
    <>
      <h3>History</h3>

      <div className="filter-row">
        <label htmlFor="categoryFilter">Filter by Category: </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => <option key={category} value={category}>{category}</option>)}
        </select>
      </div>

      <div className="filter-row">
        <label htmlFor="dateFilter">Filter by Date: </label>
        <input
          type="date"
          id="dateFilter"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={filterByWeek}
            onChange={() => setFilterByWeek(!filterByWeek)}
          />
          Filter by Week
        </label>
      </div>

      <ul className="list">
        {filteredTransactions.map(transaction => <Transaction key={transaction._id} transaction={transaction} />)}
      </ul>
    </>
  );
};
