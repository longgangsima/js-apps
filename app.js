const buyTab = document.getElementById('buy-btn');
const sellTab = document.getElementById('sell-btn');
const orderbookDiv = document.getElementById('orderbook');

let orderData = {};

// Function to generate random order data
function generateRandomOrder() {
  const quantity = Math.random() * 10 + 0.1; // Random quantity between 0.1 and 10.1
  const price = Math.random() * 1000 + 50;   // Random price between 50 and 1050
  return [quantity, price];
}

// Function to simulate POST API call
async function postOrder(orderType, orderData) {
  try {
    // Simulate API call with fetch (you can replace this with your actual API endpoint)
    console.log(`Posting ${orderType} order:`, orderData);
    
    // For now, we'll simulate a successful response
    // In a real app, you would use: 
    // const response = await fetch('/api/orders', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ type: orderType, ...orderData })
    // });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return { success: true, data: orderData };
  } catch (error) {
    console.error('Error posting order:', error);
    return { success: false, error };
  }
}

// Function to add new order to the front of the list
function addNewOrder(orderType) {
  const newOrder = generateRandomOrder();
  
  // Add to the beginning of the array (so it appears at the top)
  if (!orderData[orderType]) {
    orderData[orderType] = [];
  }
  orderData[orderType].unshift(newOrder);
  
  // Post to API
  postOrder(orderType, { quantity: newOrder[0], price: newOrder[1] })
    .then(result => {
      if (result.success) {
        console.log(`${orderType} order added successfully:`, result.data);
        // Add the new order with animation instead of refreshing entire display
        addOrderWithAnimation(orderType, newOrder);
      } else {
        console.error('Failed to add order:', result.error);
        // Remove the order from local data if API call failed
        orderData[orderType].shift();
      }
    });
}

// Function to add a single order with animation
function addOrderWithAnimation(orderType, orderData) {
  const [quantity, price] = orderData;
  
  // Create the new order row
  const row = document.createElement('div');
  row.className = 'order-row new-order';
  
  const qtySpan = document.createElement('span');
  qtySpan.className = 'price';
  qtySpan.textContent = quantity.toFixed(4);
  
  const totalSpan = document.createElement('span');
  totalSpan.className = 'total';
  totalSpan.textContent = price.toFixed(2);
  
  row.appendChild(qtySpan);
  row.appendChild(totalSpan);
  
  // Find the right position to insert (top of the appropriate section)
  const existingRows = orderbookDiv.querySelectorAll('.order-row');
  
  if (orderType === 'buy') {
    // Insert at the very beginning (top of buy orders)
    if (existingRows.length > 0) {
      orderbookDiv.insertBefore(row, existingRows[0]);
    } else {
      orderbookDiv.appendChild(row);
    }
  } else if (orderType === 'sell') {
    // Insert after separator line
    const separator = orderbookDiv.querySelector('.separator-line');
    if (separator && separator.nextSibling) {
      orderbookDiv.insertBefore(row, separator.nextSibling);
    } else {
      orderbookDiv.appendChild(row);
    }
  }
  
  // Remove the new-order class after animation completes
  setTimeout(() => {
    row.classList.remove('new-order');
  }, 600); // Match the animation duration
}

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
  console.log('Adding new buy order');
  buyTab.classList.add('active');
  sellTab.classList.remove('active');
  
  // Add new buy order and refresh display
  addNewOrder('buy');
});

sellTab.addEventListener('click', () => {
  console.log('Adding new sell order');
  sellTab.classList.add('active');
  buyTab.classList.remove('active');
  
  // Add new sell order and refresh display
  addNewOrder('sell');
});
