document.getElementById("add-more").addEventListener("click", function () {
    let container = document.getElementById("selection-container");

    // Get the existing color and size dropdowns
    let colorSelect = document.getElementById("color-select");
    let sizeSelect = document.getElementById("size-select");

    if (!colorSelect || !sizeSelect) {
        console.error("Color or Size dropdown not found.");
        return;
    }

    // Create a new selection row
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

    // Append new row to container
    container.appendChild(newRow);

    // Add event listener to remove button
    newRow.querySelector(".remove-btn").addEventListener("click", function () {
        container.removeChild(newRow);
    });
});

// ----------------- Load Product Details -----------------
// ----------------- Load Product Details -----------------
async function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get("name");

    if (!productName) {
        console.error("No product name found in URL");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/product?name=${encodeURIComponent(productName)}`);
        const product = await response.json();

        if (!product.prod_name) {
            console.error("Product not found.");
            return;
        }

        // Update product details in the DOM
        document.getElementById("product-name").textContent = product.prod_name;
        document.getElementById("product-price").textContent = `${product.prod_price} DA`;

        // Parse images, colors, and sizes
        const images = product.prod_images.split(",").map(image => `images/${image}`);
        const colors = product.prod_colors.split(",");
        const sizes = product.prod_sizes.split(",");

        // Update image slideshow
        let currentImageIndex = 0;
        const productImage = document.getElementById("product-image");
        const prevButton = document.querySelector(".prev-btn");
        const nextButton = document.querySelector(".next-btn");

        if (images.length > 0) {
            productImage.src = images[0];
        }

        prevButton.addEventListener("click", () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            productImage.src = images[currentImageIndex];
        });

        nextButton.addEventListener("click", () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            productImage.src = images[currentImageIndex];
        });

        // Populate color dropdown
        const colorSelect = document.getElementById("color-select");
        colorSelect.innerHTML = colors.map(color => `<option value="${color}">${color}</option>`).join("");

        // Populate size dropdown
        const sizeSelect = document.getElementById("size-select");
        sizeSelect.innerHTML = sizes.map(size => `<option value="${size}">${size}</option>`).join("");

    } catch (error) {
        console.error("Error fetching product details:", error);
    }
}

// Load product details on page load
document.addEventListener("DOMContentLoaded", loadProductDetails);


// ----------------- Form Submission -----------------
document.getElementById("order-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    let selections = [];

    // Get all selection rows, including the first row if no extra rows were added
    document.querySelectorAll(".selection-row").forEach(row => {
        selections.push({
            color: row.querySelector("[name='color']").value,
            size: row.querySelector("[name='size']").value,
            quantity: parseInt(row.querySelector("[name='quantity']").value, 10), // Ensure it's a number
        });
    });

    if (selections.length === 0) {
        alert("Please select at least one product variation.");
        return;
    }

    let formData = {
        full_name: document.querySelector("[name='full_name']").value,
        phone: document.querySelector("[name='phone']").value,
        address: document.querySelector("[name='address']").value,
        selections: selections,
    };

    // Send data to backend
    try {
        let response = await fetch("http://localhost:3000/api/submit-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        let result = await response.json();
        if (result.success) {
            window.location.href = result.redirect; // Redirect to status.html
        } else {
            alert("Failed to submit order.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error submitting order.");
    }
});
