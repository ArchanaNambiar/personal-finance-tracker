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

    let finalSpendings = spendingData.reduce((acc,obj) => {
        let key = obj.tag;
        if(!acc[key]){
            acc[key] = { tag : obj.tag, amount:obj.amount};//create a new object with the same properties
        }else{
            acc[key].amount += obj.amount;
        }
        return acc;
    },{});
console.log("Spending Array",Object.values(finalSpendings));
    
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
        padding: 'auto',
        width: 400,//500
        height:300,//200
        autoFit: false,
        xField: 'date',
        yField: 'amount',
        // point:{
        //     size:5,
        //     shape:'diamond',
        // },
        label:{
            style:{
                fill:'#aaa',
            },
        },
        xAxis: {
            // type: 'timeCat',
            tickCount: 5,
          },
        
      };
      const spendingConfig = {
        data:newSpending,
        width: 400,
        height:300,//200
        autoFit: false,
        angleField: "amount",
        colorField: "tag",
      };
      let chart;
      let pieChart;
  return (
    <div className='charts-wrapper'>
        <div class="ant-row my-row css-dev-only-do-not-override-nllxry">
            <div className='ant-card ant-card-bordered my-card css-dev-only-do-not-override-nllxry'>
                <div class="ant-card-body">
                    <div>
                        <h2 style={{marginTop:0}}>Your Analytics </h2>
                        <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
                    </div>
                </div>
            </div>
            <div className='ant-card ant-card-bordered my-card css-dev-only-do-not-override-nllxry'>
                <div class="ant-card-body">
                    <div>
                        <h2 style={{marginTop:0}}>Your Spendings </h2>
                        <Pie { ...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)}/>
                    </div>
                </div>
            </div>
</div>
       
       

    </div>
  )
}

export default Chartsindex;