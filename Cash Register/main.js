const checkCashRegister = (price, cash, cid) => {
    const currency = {
      "PENNY": .01,
      "NICKEL": .05,
      "DIME": .10,
      "QUARTER": .25,
      "ONE": 1.00,
      "FIVE": 5.00,
      "TEN": 10.00,
      "TWENTY": 20.00,
      "ONE HUNDRED": 100.00
    }
    //finding totalCID
    let totalCID = 0;
    for(let i = 0; i<cid.length; i++){
      totalCID += cid[i][1];
    }
    totalCID = totalCID.toFixed(2);
   //finding change
    let changeToGive = cash - price;
    const change = [];
    if (changeToGive > totalCID) {
      return { status: "INSUFFICIENT_FUNDS", change: change};
    } else if (changeToGive.toFixed(2) === totalCID) {
      return { status: "CLOSED", change: cid };
    } else {
      cid = cid.reverse();
      for (let elem of cid) {
        let result = [elem[0], 0];
        while (changeToGive >= currency[elem[0]] && elem[1] > 0) {
          result[1] += currency[elem[0]];
          elem[1] -= currency[elem[0]];
          changeToGive -= currency[elem[0]];
          changeToGive = changeToGive.toFixed(2);
        }
        if (result[1] > 0) {
          change.push(result);
        }
      }
    }
    if (changeToGive > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    return { status: "OPEN", change: change};
  }
  
  
  console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));