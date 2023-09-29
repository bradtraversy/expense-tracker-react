// import React, {useContext} from 'react';
// import { GlobalContext } from '../context/GlobalState';

// //Money formatter function
// function moneyFormatter(num) {
//   let p = num.toFixed(2).split('.');
//   return (
//     '$ ' +
//     p[0]
//       .split('')
//       .reverse()
//       .reduce(function (acc, num, i, orig) {
//         return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
//       }, '') +
//     '.' +
//     p[1]
//   );
// }

// export const Transaction = ({ transaction }) => {
//   const { deleteTransaction } = useContext(GlobalContext);

//   const sign = transaction.amount < 0 ? '-' : '+';

//   return (
//     <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
//       {transaction.text} <span>{sign}{moneyFormatter(transaction.amount)}</span><button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">x</button>
//     </li>
//   )
// }

import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    '$ ' +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

export const Transaction = ({ transaction }) => {
  const { deleteTransaction, editTransaction } = useContext(GlobalContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(transaction.text);
  const [newAmount, setNewAmount] = useState(transaction.amount.toString());

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {isEditing ? (
        <div>
          <input 
            type="text" 
            value={newText} 
            onChange={(e) => setNewText(e.target.value)} 
          />
          <input 
            type="number" 
            value={newAmount} 
            onChange={(e) => setNewAmount(e.target.value)} 
          />
          <button onClick={() => {
            if(newText && !isNaN(newAmount)) {
              editTransaction(transaction._id, newText, parseFloat(newAmount));
              setIsEditing(false);
            }
          }}>Confirm</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <span onClick={() => setIsEditing(true)}>
          {transaction.text} <span>{sign}{moneyFormatter(transaction.amount)}</span>
        </span>
      )}
      <button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">x</button>
    </li>
  )
}
