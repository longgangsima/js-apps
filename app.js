const buyTab = document.getElementById('buy-btn');
const sellTab = document.getElementById('sell-btn');
const orderbookDiv = document.getElementById('orderbook');

let orderData = {};

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    orderData = data;
    processData('buy');
  });

function processData(action) {
  orderbookDiv.innerHTML = '';

  // Display buy orders first
  if (orderData.buy) {
    orderData.buy.map(([quantity, price]) => {
      const row = document.createElement('div');
      row.className = 'order-row buy-row';
      const qtySpan = document.createElement('span');
      qtySpan.className = 'price';
      qtySpan.textContent = quantity.toFixed(4);
      const totalSpan = document.createElement('span');
      totalSpan.className = 'total';
      totalSpan.textContent = price.toFixed(2);

      row.appendChild(qtySpan);
      row.appendChild(totalSpan);
      orderbookDiv.appendChild(row);
    });
  }

  // Add separator line
  const separator = document.createElement('div');
  separator.className = 'separator-line';
  orderbookDiv.appendChild(separator);

  // Display sell orders
  if (orderData.sell) {
    orderData.sell.map(([quantity, price]) => {
      const row = document.createElement('div');
      row.className = 'order-row sell-row';
      const qtySpan = document.createElement('span');
      qtySpan.className = 'price';
      qtySpan.textContent = quantity.toFixed(4);
      const totalSpan = document.createElement('span');
      totalSpan.className = 'total';
      totalSpan.textContent = price.toFixed(2);

      row.appendChild(qtySpan);
      row.appendChild(totalSpan);
      orderbookDiv.appendChild(row);
    });
  }

  if (action == 'buy') {
    console.log('user buy coin');
  } else if (action == 'sell') {
    console.log('user sell coin');
  }
}
buyTab.addEventListener('click', () => {
  console.log('buy');
  buyTab.classList.add('active');
  sellTab.classList.remove('active');
  processData('buy');
});

sellTab.addEventListener('click', () => {
  sellTab.classList.add('active');
  buyTab.classList.remove('active');
  processData('sell');
});
