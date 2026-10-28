
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Display expenses
function showExpenses() {
    let list = document.getElementById("list");
    let total = 0;

    list.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {
        list.innerHTML += "<tr>" +
            "<td>" + expenses[i].title + "</td>" +
            "<td>" + expenses[i].category + "</td>" +
            "<td>" + expenses[i].date + "</td>" +
            "<td>Rs " + expenses[i].amount + "</td>" +
            "<td><button onclick='deleteExpense(" + expenses[i].id + ")'>Delete</button></td>" +
            "</tr>";

        total = total + expenses[i].amount;
    }

    if (expenses.length == 0) {
        list.innerHTML = "<tr><td colspan='5'>No expenses yet.</td></tr>";
    }

    document.getElementById("total").innerHTML = "Total: Rs " + total.toFixed(2);
}

// Add expense
document.getElementById("form").onsubmit = function(event) {
    event.preventDefault();

    let expense = {
        id: Date.now(),
        title: document.getElementById("title").value,
        amount: Number(document.getElementById("amount").value),
        category: document.getElementById("category").value,
        date: document.getElementById("date").value
    };

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    showExpenses();

    document.getElementById("form").reset();
    document.getElementById("date").valueAsDate = new Date();
};

// Delete expense
function deleteExpense(id) {
    let newExpenses = [];

    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].id != id) {
            newExpenses.push(expenses[i]);
        }
    }

    expenses = newExpenses;

    localStorage.setItem("expenses", JSON.stringify(expenses));

    showExpenses();
}

// Today's date
document.getElementById("date").valueAsDate = new Date();

// Show saved expenses
showExpenses();
