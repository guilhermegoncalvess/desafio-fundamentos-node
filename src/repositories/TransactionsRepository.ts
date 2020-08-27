import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {} as Balance;
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalTransactionsIcome = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((totalIncome, transaction) => {
        return totalIncome + transaction.value;
      }, 0);

    const totalTransactionsOutcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((totalOutcome, transaction) => {
        return totalOutcome + transaction.value;
      }, 0);

    this.balance = {
      income: totalTransactionsIcome,
      outcome: totalTransactionsOutcome,
      total: totalTransactionsIcome - totalTransactionsOutcome,
    };

    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
