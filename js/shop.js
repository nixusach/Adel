const products = [
    {
        prod_name: "Urban Jacket",
        prod_category: "Fashion",
        prod_price: 5500,
        prod_avail_qt: 10,
        prod_image: "1.jpg"
    },
    {
        prod_name: "Bluetooth Speaker",
        prod_category: "Electronics",
        prod_price: 3200,
        prod_avail_qt: 0,
        prod_image: "2.jpg"
    },
    {
        prod_name: "Sneakers Max",
        prod_category: "Footwear",
        prod_price: 6800,
        prod_avail_qt: 5,
        prod_image: "3.jpg"
    },
    {
        prod_name: "Leather Backpack",
        prod_category: "Accessories",
        prod_price: 4500,
        prod_avail_qt: 2,
        prod_image: "7.jpg"
    },
    {
        prod_name: "Smart Watch",
        prod_category: "Electronics",
        prod_price: 7200,
        prod_avail_qt: 0,
        prod_image: "5.jpg"
    },
    {
        prod_name: "Slim Jeans",
        prod_category: "Fashion",
        prod_price: 3900,
        prod_avail_qt: 8,
        prod_image: "6.jpg"
    }
];

const table = document.getElementById("product-table");
let rows = "";

for (let i = 0; i < products.length; i += 4) {
    rows += "<tr>";

    for (let j = 0; j < 4; j++) {
        if (i + j < products.length) {
            const product = products[i + j];
            const isOutOfStock = product.prod_avail_qt == 0 ? "sold-out" : "";

            rows += `
                <td>
                    <div class="product-card">
                        <img src="images/${product.prod_image}" alt="${product.prod_name}" class="product-image ${isOutOfStock}">
                        <div class="product-info">
                            <h3 class="product-name">${product.prod_name}</h3>
                            <p class="product-category">${product.prod_category}</p>
                            <p class="product-price">${product.prod_price} DA</p>
                            <button class="buy-now ${isOutOfStock ? "out-of-stock-btn" : ""}" 
                                ${isOutOfStock ? "disabled" : `onclick="window.location.href='product.html?name=${encodeURIComponent(product.prod_name)}'"`}>
                                ${isOutOfStock ? "Out of Stock" : "Buy Now"}
                            </button>
                        </div>
                    </div>
                </td>
            `;
        } else {
            rows += `<td class="empty-cell"></td>`;
        }
    }

    rows += "</tr>";
}

table.innerHTML = rows;
