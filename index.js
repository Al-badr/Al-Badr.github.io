let form = document.getElementById("form");
let expenseList = JSON.parse(localStorage.getItem("expenseList")) || [];
let balance = document.getElementById("bal").value;
//let balance = prompt("Enter your balance.");
localStorage.setItem("balance", balance);

if (JSON.parse(window.localStorage.getItem("expenseList")) !== null) {
  initialState = JSON.parse(window.localStorage.getItem("expenseList"));
}

function updateBalance() {}

function expense(desc, amt, date, bud) {
  return (expenseObj = {
    description: desc,
    amount: amt,
    date,
    budget: bud,
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let budget = e.target.bud.value;
  let description = e.target.des.value;
  let amount = e.target.amt.value;
  let date = e.target.date.value;
  let newExpense = new expense(description, amount, date, budget);
  expenseList.push(newExpense);
  console.log(expenseList);
  addToLocalStorage(expenseList);
  //addExpense();
  addExpenseToTable();
});

form.addEventListener("reset", (e) => {
  if (confirm("Do you want to reset all expenses?")) {
    console.log("Clear");
    expenseList = [];
    balance = 0;
    addToLocalStorage(expenseList);
    document.getElementById("tableBody").innerHTML = "";
    document.getElementById("mainPage").innerHTML = "";
    document.getElementById("balance").innerHTML = "";
    location.reload();
  }
});

// function addExpense() {
//   let div = document.createElement("div");
//   let descText = document.createElement("p");
//   let amtText = document.createElement("p");
//   let dateText = document.createElement("p");
//   let budText = document.createElement("p");
//   for (let i = 0; i < expenseList.length; i++) {
//     descText.innerText = `Description : ${expenseList[i].description}`;
//     amtText.innerText = `Amount : ${expenseList[i].amount}`;
//     dateText.innerText = `Date : ${expenseList[i].date}`;
//     budText.innerText = `Remaining from the budget :${
//       expenseList[i].budget - expenseList[i].amount
//     }`;
//     div.appendChild(descText);
//     div.appendChild(amtText);
//     div.appendChild(dateText);
//     div.appendChild(budText);
//     div.className = "expense";
//     document.getElementById("mainPage").appendChild(div);
//   }

//   addToLocalStorage(expenseList);
// }

function addExpenseToTable() {
  let tableBody = document.getElementById("tableBody");
  let newRow = tableBody.insertRow();
  let descCell = newRow.insertCell(0);
  let amtCell = newRow.insertCell(1);
  let dateCell = newRow.insertCell(2);
  let budCell = newRow.insertCell(3);
  for (let i = 0; i < expenseList.length; i++) {
    descCell.innerText = expenseList[i].description;
    amtCell.innerText = expenseList[i].amount;
    dateCell.innerText = expenseList[i].date;
    budCell.innerText = expenseList[i].budget - expenseList[i].amount;
  }

  balance -= expenseList[expenseList.length - 1].amount;
  document.getElementById("balance").innerHTML = balance;
  addToLocalStorage(expenseList, balance);
}

const addToLocalStorage = (expenseList, balance) => {
  localStorage.setItem("expenseList", JSON.stringify(expenseList));
  localStorage.setItem("balance", balance);
};

const getFromLocalStorage = (expenseList) => {
  expenseList.forEach((expense) => {
    //addExpense();
    addExpenseToTable();
  });
};

if (localStorage.getItem("expenseList") !== null) {
  getFromLocalStorage(expenseList);
}
document.getElementById("balance").innerHTML = balance;
