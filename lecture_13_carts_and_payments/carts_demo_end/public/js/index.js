/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
async function fetchJSON(uri, body, options = { method: "POST" }) {
  const response = await fetch(uri, {
    headers: {
      // required to get express to automatically parse the body
      "Content-Type": "application/json",
    },
    ...options,
    body: JSON.stringify(body),
  });

  return response.json();
}

// eslint-disable-next-line no-unused-vars
async function addToCart(itemId) {
  await fetchJSON("/api/items/addToCart", { itemId });
}

async function getCart() {
  const response = await fetch("/api/items/getCart");
  const output = await response.json();

  let totalCost = 0;
  const asHtml = output.map(({ name, quantity, total }) => {
    const html = `
      <div>
        <label>${name}</label> qty: ${quantity}, total: ${total}
      </div>`;
    totalCost += total;
    return html;
  });

  let cartList = asHtml.join("");
  cartList += `<h4>Order Total: ${totalCost}`;
  document.getElementById("cart").innerHTML = cartList;
}
