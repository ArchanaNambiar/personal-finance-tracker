import React from 'react'
import { useState ,useEffect} from 'react';
import Header from '../components/Header/headerindex';
import Cards from '../components/Cards/cardindex';
import NoTransactions from '../components/NoTransactions';
import AddExpenseModal from '../components/Modal/addExpense';
import AddIncomeModal from '../components/Modal/addIncome';
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
// import moment from 'moment/moment';
import TransactionsTable from '../components/TransactionTable/transactionindex';
import Chartsindex from '../components/Charts/chartsindex';



const Dashboard = () => {


  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  
  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    // setTransactions([...transactions, newTransaction]);
    // setIsExpenseModalVisible(false);
    // setIsIncomeModalVisible(false);
    addTransaction(newTransaction);
    //calculateBalance();
  };

  async function addTransaction(transaction,many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      if(!many)
       toast.success("Transaction Added!");
       const newArr=transactions;
       newArr.push(transaction);
       setTransactions(newArr);
      
    } catch (e) {
      console.error("Error adding document: ", e);
      if(!many)
        toast.error("Couldn't add transaction");
      }
  }
  

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  //Calculate the initial balance, income, and expenses
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }
let sortedTransactions=transactions.sort((a,b)=>
{
  return new Date(a.date)-new Date(b.date);
})

  return (
    <div>
       <Header/>
       {loading ? (
        <p>Loading...</p>
       ):(
        <>
       <Cards

          income={income}
          expenses={expenses}
          totalBalance={totalBalance}
          showExpenseModal={showExpenseModal}
          showIncomeModal={showIncomeModal}
          />

          {transactions.length!=0 ? <Chartsindex  sortedTransactions={sortedTransactions} />:<NoTransactions/>}
        <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
            />
        <TransactionsTable transactions={transactions} 
        addTransaction={addTransaction} 
        fetchTransactions={fetchTransactions}/>
       </>
       )}
    </div>
  );
};

export default Dashboard;