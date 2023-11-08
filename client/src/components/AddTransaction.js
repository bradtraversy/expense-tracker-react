import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [category, setCategory] = useState(''); 
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState(['Salary', 'Bonus', 'Gift', 'Rent', 'Groceries', 'Entertainment']); // Predefined categories

  const { addTransaction } = useContext(GlobalContext);

  const addNewCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories(prevCategories => [...prevCategories, newCategory]);
      setNewCategory(''); // Clear the new category input
    } else {
      console.error('Category already exists or invalid!');
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    if (!text.trim() || !amount || !date.trim() || !category.trim()) {
      console.error('Please fill in all fields');
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
      date,
      category, // Include the category in the new transaction
    }

    addTransaction(newTransaction);

    // Clear the form
    setText('');
    setAmount(0);
    setDate(today); // Reset to today's date
    setCategory(''); // Reset category
  }

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <div className="form-control">
          <label htmlFor="date">Date<br /></label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="date-input" />
        </div>
        <div className="form-control">
          <label htmlFor="category">Category<br /></label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="" disabled>Select category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="newCategory">New Category <br /></label>
          <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Add new category" />
          <button type="button" onClick={addNewCategory}>Add Category</button>
        </div>
        <button className="btn" disabled={!text.trim() || !amount || !date.trim() || !category.trim()}>Add transaction</button>
      </form>
    </>
  )
}
