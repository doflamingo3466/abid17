let expenses = [];
try {
  expenses = JSON.parse(localStorage.getItem("expenses")) || [];
} catch (e) {}

const $ = (id) => document.getElementById(id);
const save = () => {
  try {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  } catch (e) {}
};

function render() {
  $("list").innerHTML =
    expenses
      .map(
        (e) =>
          `<tr><td>${e.title}</td><td>${e.category}</td><td>${e.date}
          </td><td class="right">Rs ${e.amount.toFixed(2)}</td><td class="right"><button class="del" onclick="del(${e.id})">
          Delete</button></td></tr>`,
      )
      .join("") ||
    `<tr><td colspan="5" class="empty">No expenses yet.</td></tr>`;
  $("total").textContent =
    "Total: Rs " + expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2);
}

$("form").onsubmit = function (event) {
  event.preventDefault();
  expenses.push({
    id: Date.now(),
    title: $("title").value.trim(),
    amount: Number($("amount").value),
    category: $("category").value,
    date: $("date").value,
  });
  save();
  render();
  this.reset();
  $("date").valueAsDate = new Date();
};

function del(id) {
  expenses = expenses.filter((e) => e.id !== id);
  save();
  render();
}

$("date").valueAsDate = new Date();
render();
