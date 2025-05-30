const form = document.getElementById('expense-form');
const tableBody = document.getElementById('expense-table-body');
const totalDisplay = document.getElementById('total-expense');
let total = 0;

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const date = document.getElementById('expense-date').value;
  const amount = parseFloat(document.getElementById('expense-amount').value);
  const category = document.getElementById('expense-category').value;
  const description = document.getElementById('expense-description').value;

  if (!date || !amount || !category || !description) return;

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${date}</td>
    <td>$${amount.toFixed(2)}</td>
    <td>${category}</td>
    <td>${description}</td>
    <td><button class="btn btn-danger btn-sm delete-btn">X</button></td>
  `;

  tableBody.appendChild(row);

  total += amount;
  totalDisplay.textContent = total.toFixed(2);

  form.reset();
});

tableBody.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
      const row = e.target.closest('tr');
      const amount = parseFloat(row.children[1].textContent.replace('$', ''));
  
      Swal.fire({
        title: '¿Está seguro que desea eliminar este gasto?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          total -= amount;
          totalDisplay.textContent = total.toFixed(2);
          row.remove();
  
          Swal.fire({
            title: '¡Eliminado!',
            text: 'El gasto ha sido eliminado.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        }
      });
    }
  });
  
