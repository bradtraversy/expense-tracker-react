import React, { useContext, useState, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { GlobalContext } from '../context/GlobalState';

export const LineCharts = () => {
  const { transactions } = useContext(GlobalContext);
  const [timeFrame, setTimeFrame] = useState('Daily');

  const filterTransactionsByTimeFrame = useMemo(() => {
    let filteredTransactions = [];

    // Assuming transaction.date is a string in 'YYYY-MM-DD' format
    const expenseTransactions = transactions.filter(transaction => transaction.amount < 0);

    const grouped = expenseTransactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);

      let key;
      switch (timeFrame) {
        case 'Weekly':
          // You can adjust to define a week, e.g., by ISO week number
          key = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
          break;
        case 'Monthly':
          key = `${date.getFullYear()}-${date.getMonth() + 1}`; // Months are zero-based
          break;
        default:
          key = transaction.date; // Daily
      }

      acc[key] = (acc[key] || 0) + Math.abs(transaction.amount);
      return acc;
    }, {});

    Object.keys(grouped).forEach(key => {
      filteredTransactions.push({ name: key, amount: grouped[key] });
    });

    return filteredTransactions.sort((a, b) => a.name.localeCompare(b.name)); // Sort by date
  }, [transactions, timeFrame]);

  return (
    <div>
      <h3>Expense Chart</h3>
      <select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>
      <LineChart
        width={500}
        height={300}
        data={filterTransactionsByTimeFrame}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

