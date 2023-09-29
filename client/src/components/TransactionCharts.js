import React, { useContext, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { GlobalContext } from '../context/GlobalState';

export const TransactionCharts = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  const incomeTransactions = transactions
    .filter(transaction => transaction.amount > 0)
    .map(transaction => ({ ...transaction, amount: Math.abs(transaction.amount) }));
  
  const expenseTransactions = transactions
    .filter(transaction => transaction.amount < 0)
    .map(transaction => ({ ...transaction, amount: Math.abs(transaction.amount) }));

    const renderChart = (data, title) => (
      <div style={{ width: '50%' }}>
        <h2 style={{ marginBottom: '10px' }}>{title}</h2>
        <PieChart width={500} height={500} style={{ margin: 'auto auto' }}>
          <Pie
            dataKey="amount"
            nameKey="text"
            data={data.length > 0 ? data : [{amount: 1}]}
            cx={200}
            cy={200}
            outerRadius={150}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
  );
  
  return (
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {renderChart(incomeTransactions, 'Income Chart')}
        {renderChart(expenseTransactions, 'Expense Chart')}
      </div>
  );
  
}
