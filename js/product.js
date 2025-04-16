// ----------------- Image Slider -----------------
const images = ["images/2.jpg", "images/6.jpg", "images/4.jpg"];
let currentImageIndex = 0;

const productImage = document.getElementById("product-image");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");

function updateImage() {
    productImage.src = images[currentImageIndex];
}

prevButton.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateImage();
});

nextButton.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateImage();
});

updateImage(); // Set initial image

// ----------------- Add More Selections -----------------
document.getElementById("add-more").addEventListener("click", function () {
    const container = document.getElementById("selection-container");
    const colorSelect = document.getElementById("color-select");
    const sizeSelect = document.getElementById("size-select");

    const newRow = document.createElement("div");
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

// ----------------- Handle Form Submission (Frontend Only) -----------------
document.getElementById("order-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const selections = [];
    document.querySelectorAll(".selection-row").forEach(row => {
        selections.push({
            color: row.querySelector("[name='color']").value,
            size: row.querySelector("[name='size']").value,
            quantity: parseInt(row.querySelector("[name='quantity']").value, 10)
        });
    });

    const formData = {
        full_name: document.querySelector("[name='full_name']").value,
        phone: document.querySelector("[name='phone']").value,
        address: document.querySelector("[name='address']").value,
        selections: selections
    };

    // Just show the data in the console for now
    console.log("Order Submitted:", formData);
    alert("Order submitted successfully!\nCheck console for details.");
});
