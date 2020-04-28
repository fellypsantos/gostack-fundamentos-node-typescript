import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionWithBalance {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionWithBalance {
    const transactionsWithBalance: TransactionWithBalance = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };

    return transactionsWithBalance;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions
      .filter(t => t.type === 'income')
      .reduce(
        (accumulator, currentValue) => (accumulator += currentValue.value),
        0,
      );

    const totalOutcome = this.transactions
      .filter(t => t.type === 'outcome')
      .reduce(
        (accumulator, currentValue) => (accumulator += currentValue.value),
        0,
      );

    const balance: Balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
