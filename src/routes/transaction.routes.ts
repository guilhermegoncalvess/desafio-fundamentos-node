import { Router } from 'express';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface StatementOfTransactions {
  transactions: Transaction[];
  balance: Balance;
}

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  const transactions = transactionsRepository.all();
  const statementOfTransactions: StatementOfTransactions = {
    transactions,
    balance: transactionsRepository.getBalance(),
  };
  return response.json(statementOfTransactions);
  // try {
  // } catch (err) {
  //   return response.status(400).json({ error: err.message });
  // }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const transaction: Transaction = {
      title,
      value,
      type,
    };

    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );

    return response.json(createTransactionService.execute(transaction));
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }

  // return response.json(transactions);
});

export default transactionRouter;
