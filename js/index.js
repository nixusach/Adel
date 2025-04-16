// Simulated product list
const sampleProducts = [
    {
        prod_name: "Stylish Shirt",
        prod_price: "2500",
        prod_images: "shirt1.jpg,shirt2.jpg,shirt3.jpg",
        prod_colors: "Red,Blue,Green",
        prod_sizes: "S,M,L,XL",
    },
    {
        prod_name: "Modern Jacket",
        prod_price: "5200",
        prod_images: "jacket1.jpg,jacket2.jpg",
        prod_colors: "Black,Gray",
        prod_sizes: "M,L,XL",
    },
    {
        prod_name: "Sport Shoes",
        prod_price: "3500",
        prod_images: "shoes1.jpg,shoes2.jpg",
        prod_colors: "White,Black",
        prod_sizes: "40,41,42,43",
    },
    {
        prod_name: "Classic Pants",
        prod_price: "2700",
        prod_images: "pants1.jpg,pants2.jpg",
        prod_colors: "Beige,Navy Blue",
        prod_sizes: "M,L,XL",
    }
];

// Get product by name from URL
function getProductByName(name) {
    return sampleProducts.find(product => product.prod_name === name);
}

// Load product details into the DOM
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get("name");

    const product = getProductByName(productName);
    if (!product) {
        alert("Product not found.");
        return;
    }

    document.getElementById("product-name").textContent = product.prod_name;
    document.getElementById("product-price").textContent = `${product.prod_price} DA`;

    const images = product.prod_images.split(",").map(image => `images/${image}`);
    const colors = product.prod_colors.split(",");
    const sizes = product.prod_sizes.split(",");

    // Image Slideshow
    let currentImageIndex = 0;
    const productImage = document.getElementById("product-image");
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");

    productImage.src = images[0];
    prevButton.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        productImage.src = images[currentImageIndex];
    });
    nextButton.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        productImage.src = images[currentImageIndex];
    });

    // Dropdowns
    const colorSelect = document.getElementById("color-select");
    const sizeSelect = document.getElementById("size-select");
    colorSelect.innerHTML = colors.map(c => `<option value="${c}">${c}</option>`).join("");
    sizeSelect.innerHTML = sizes.map(s => `<option value="${s}">${s}</option>`).join("");
}

// Add More Logic
document.getElementById("add-more").addEventListener("click", function () {
    let container = document.getElementById("selection-container");
    let colorSelect = document.getElementById("color-select");
    let sizeSelect = document.getElementById("size-select");

    let newRow = document.createElement("div");
    newRow.classList.add("selection-row");
    newRow.innerHTML = `
        <label>Color:</label>
        <select name="color">${colorSelect.innerHTML}</select>  
        <label>Size:</label>
        <select name="size">${sizeSelect.innerHTML}</select>  
        <label>Quantity:</label>
        <input type="number" name="quantity" value="1" min="1">
        <button type="button" class="remove-btn">Remove</button>
    `;
    container.appendChild(newRow);

    newRow.querySelector(".remove-btn").addEventListener("click", function () {
        container.removeChild(newRow);
    });
});

// Handle form submission (just simulate it)
document.getElementById("order-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let selections = [];
    document.querySelectorAll(".selection-row").forEach(row => {
        selections.push({
            color: row.querySelector("[name='color']").value,
            size: row.querySelector("[name='size']").value,
            quantity: parseInt(row.querySelector("[name='quantity']").value, 10),
        });
    });

    const orderData = {
        full_name: document.querySelector("[name='full_name']").value,
        phone: document.querySelector("[name='phone']").value,
        address: document.querySelector("[name='address']").value,
        selections: selections,
    };

    console.log("Order submitted:", orderData);
    alert("Order submitted! (simulated)");
    // Optionally redirect
    // window.location.href = "status.html";
});

document.addEventListener("DOMContentLoaded", loadProductDetails);
