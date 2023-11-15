function eById(id) {
  return document.getElementById(id);
}

function evById(id) {
  return document.getElementById(id).value;
}

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

async function reloadItems() {
  const response = await fetch("/api/items");
  const output = await response.text();
  eById("results").innerHTML = output;
}

async function addNewItem() {
  const name = evById("new_item");
  const output = await fetchJSON("/api/items", { name });
  if (output.success) {
    window.location.reload();
  }
}

async function toggle(id) {
  const output = await fetchJSON("/api/items/toggle", { id });
  if (output.success) {
    window.location.reload();
  }
}
