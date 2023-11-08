# Expense Tracker

This project is a modification from https://www.youtube.com/watch?v=KyWaXA_NvT0. Thank you Brad!

## Usage

```
Create a new databse in mongoDB and change config.env file in config folder accordingly.
```

```
 npm install
 cd client npm install
 cd ..
 
 # Run front and backend
 npm run dev
 
 # Backend only
 npm run server
 
 # Frontend only
 npm run client
 
 # Build client
 cd client
 npm run build
 
 # Prod
 npm start
```

## Functionalities
<img width="1710" alt="Screenshot 2023-09-29 at 10 25 15 AM" src="https://github.com/JingyaoGu1/expense-tracker/assets/43628019/37f609f0-fffb-4ade-baba-c00c69cd3f8a">

- Add transaction based on transaction name, amount, date, and category.
- Add a new category.
- Edit and delete transactions directly from the transaction list.
- Filter transactions based on category and time.
- Pie charts of expenses and income, hovering to see details.
- Line charts for daily/weekly/monthly expenses
- AI to auto suggest catrgory
