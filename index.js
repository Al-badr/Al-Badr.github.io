let form = document.getElementById("form");
let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];

if (JSON.parse(window.localStorage.getItem('expenseList')) !== null) {
	initialState = JSON.parse(window.localStorage.getItem('expenseList'))
}

function expense(desc, amt, date,bud) {
  return (expenseObj = {
    description: desc,
    amount: amt,
    date,
    budget: bud
  });
}




form.addEventListener("submit", (e) => {
  e.preventDefault();
  let budget =e.target.bud.value;
  let description = e.target.des.value;
  let amount = e.target.amt.value;
  let date = e.target.date.value;
  let newExpense = new expense(description, amount, date,budget);
  expenseList.push(newExpense);
  console.log(expenseList);
  addToLocalStorage(expenseList)
  addExpense();
  
});

form.addEventListener("reset",(e)=>{
  if (confirm("Do you want to reset all expenses?")) {
    console.log("Clear");
  expenseList=[]
  addToLocalStorage(expenseList)
  document.getElementById("mainPage").innerHTML="";
  }
  
})

/* function budget(bud) {
  let newBud = document.createElement("h3")
  for (let i = 0; i < expenseList.length; i++) {
    newBud.innerText=budget- expenseList[i].amount;
  
}} */

function addExpense() {
  let div = document.createElement("div");
  let descText = document.createElement("p");
  let amtText = document.createElement("p");
  let dateText = document.createElement("p");
  let budText = document.createElement("p");
  for (let i = 0; i < expenseList.length; i++) {
    descText.innerText = `Description : ${expenseList[i].description}`;
    amtText.innerText = `Amount : ${expenseList[i].amount}`;
    dateText.innerText = `Date : ${expenseList[i].date}`;
    budText.innerText=`Remaining from the budget :${expenseList[i].budget-expenseList[i].amount}`
    div.appendChild(descText);
    div.appendChild(amtText);
    div.appendChild(dateText);
    div.appendChild(budText);
    div.className = "expense";
    document.getElementById("mainPage").appendChild(div);
  }
  addToLocalStorage(expenseList)
}

const addToLocalStorage = (expenseList) => {
  localStorage.setItem('expenseList', JSON.stringify(expenseList));
}

const getFromLocalStorage = (expenseList) => {
  expenseList.forEach((expense)=>{
    addExpense();
  })
}

if (localStorage.getItem('expenseList') !== null){
  getFromLocalStorage(expenseList);
}
