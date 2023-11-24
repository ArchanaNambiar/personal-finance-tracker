import React from 'react'
import { Line,Pie } from '@ant-design/charts';
import { transaction } from 'firebase/firestore';

function Chartsindex({sortedTransactions}) {
    const data = sortedTransactions.map((item) => {
        return { date: item.date, amount : item.amount };
    });
    
    const spendingData = sortedTransactions.filter((transaction)=>  { 
        if(transaction.type=="expense"){
    return { tag:transaction.tag , amount:transaction.amount};
        }
    });

    let finalSpending = spendingData.reduce((acc,obj) => {
        let key = obj.tag;
        if(!acc[key]){
            acc[key] = { tag : obj.tag, amount:obj.amount};//create a new object with the same properties
        }else{
            acc[key].amount += obj.amount;
        }
        return acc;
    },{});

    let newSpending=[
        { tag:"food",amount:0 },
        {tag:"education",amount:0},
        {tag:"office",amount:0},
        ];

        spendingData.forEach((item) => {
            if (item.tag=="food"){
                newSpending[0].amount +=item.amount;
            }else if (item.tag=="education"){
                newSpending[1].amount +=item.amount;
            }else{
                newSpending[2].amount +=item.amount;
            }
            
        });
      const config = {
        data:data,
        width: 500,
        autoFit: true,
        xField: 'date',
        yField: 'amount',
        
      };
      const spendingConfig = {
        data:newSpending,
        width: 500,
        autoFit: true,
        angleField: "amount",
        colorField: "tag",
      };
      let chart;
      let pieChart;
  return (
    <div className='charts-wrapper'>
        <div>
            <h2 style={{marginTop:0}}>Your Analytics </h2>
            <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
        </div>
        <div>
            <h2>Your Spendings </h2>
            <Pie { ...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)}/>
        </div>
    </div>
  )
}

export default Chartsindex;