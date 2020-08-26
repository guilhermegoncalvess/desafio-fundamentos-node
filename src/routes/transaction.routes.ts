import { Router } from 'express';
import { uuid } from 'uuidv4';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Transaction {
  id?: string;
  title: string;
  value: number;
  type: string;
}

interface Credito {
  transictions: Transaction[];
  balance: Balance;
}

const transactionRouter = Router();

// const transactionsRepository = new TransactionsRepository();

const transactions: Transaction[] = [];

transactionRouter.get('/', (request, response) => {


  const totalTransactionsIcome = transactions.filter( transaction => transaction.type === "income").reduce( (totalIncome, transaction, ) => {
    return totalIncome + transaction.value;
  },0)

  const totalTransactionsOutcome = transactions.filter( transaction => transaction.type === "outcome").reduce( (totalOutcome, transaction, ) => {
    return totalOutcome + transaction.value;
  },0)

    const balance: any = {
      income: totalTransactionsIcome,
      outcome: totalTransactionsOutcome,
      total:totalTransactionsIcome - totalTransactionsOutcome
    }


  const credito: Credito = {
    transictions: transactions,
    balance: balance
  }

  // transactionByType.reduce( (transactionByType.total, transactionByType.income))

  return response.json(credito);

  // try {
  //   // TODO
  // } catch (err) {
  //   return response.status(400).json({ error: err.message });
  // }
});

transactionRouter.post('/', (request, response) => {
  const { title, value, type } = request.body;

  const transaction = {
    id: uuid(),
    title,
    value,
    type,
  }

  transactions.push(transaction);

  return response.json(transactions);
  // try {
  //   // TODO
  // } catch (err) {
  //   return response.status(400).json({ error: err.message });
  // }
});

export default transactionRouter;
