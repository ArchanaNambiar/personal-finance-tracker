import React from 'react';
import "./cardstyle.css";
import {Card,Row} from "antd";
import Button from '../Buttoncomponent/button';

function Cards({
  income,
  expenses,
  totalBalance,
  showExpenseModal,
  showIncomeModal}) {
  return (
    <div>
        <Row className='my-row'>
           

           <Card  className='my-card' bordered={true} >
                <h2>Current Balance</h2>
                <p>{totalBalance}</p>
                <Button text="Reset Balance"/ >
                
              
            </Card>

      <Card className='my-card' bordered={true} >
                <h2>Total Income</h2>
                <p>{income}</p>
                <Button text="Add Income" onClick={showIncomeModal}/>
               
      </Card>

      <Card className='my-card' bordered={true} >
        <h2>Total Expenses</h2>
        <p>{expenses}</p>
        <Button text="Add Expense" onClick={showExpenseModal}/>
          
      </Card>


        </Row>
    </div>
  );
};

export default Cards;