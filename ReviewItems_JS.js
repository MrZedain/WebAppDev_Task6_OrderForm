document.addEventListener("DOMContentLoaded", function () {
    // Get all plus buttons
    var plusButtons = document.querySelectorAll(".plus");

   

    // Add event listeners to plus buttons
    plusButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var quantityElement = button.parentElement.querySelector(".quantity");
            var currentQuantity = parseInt(quantityElement.textContent);
            
            if (currentQuantity < 3) { // Limit maximum quantity to 3
            quantityElement.textContent = currentQuantity + 1;
            updatePrice(button.parentElement.parentElement);
            } else if (currentQuantity === 3) {
            // Show the custom error message using SweetAlert2
            Swal.fire({
                icon: 'warning',
                title: 'Max quantity reached',
                text: 'Max quantity of 3 per product',
                confirmButtonText: 'OK'
            
            })
            }
        });
    });

    // Get all minus buttons
    var minusButtons = document.querySelectorAll(".minus");

    // Add event listeners to minus buttons
    minusButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var quantityElement = button.parentElement.querySelector(".quantity");
            var currentQuantity = parseInt(quantityElement.textContent);
            
            if (currentQuantity > 0) {
                quantityElement.textContent = currentQuantity - 1;
                updatePrice(button.parentElement.parentElement);
            }
        });
    });

 // Define default per unit prices for each product
var productPrices = {
    "ASUS PRIME Z690-A - motherboard - ATX - LGA1700 Socket - Z690": 200,
    "AMD Ryzen 5 3500 MPK 3.6GHz 6 Core 16MB Socket AM4 Processor": 119,
    "TUF GeForce RTX 3060 GAMING V2 OC 12GB GDDR6 192Bit NVIDIA Graphics Card": 329,
    "Periphio Hydra Gaming PC Tower": 100,
    "MSI MPG A650GF 650W 80+ GOLD POWER SUPPLY": 99
};

// Function to calculate and update product prices
function updatePrice(productRow) {
   
    var quantityElement = productRow.querySelector(".quantity");
    var productName = productRow.querySelector(".product").textContent;
    var priceElement = productRow.querySelector(".productPrice");
    

    var quantity = parseInt(quantityElement.textContent);
    var perUnitPrice = productPrices[productName];
    var price = quantity * perUnitPrice;

    // Check if the quantity is greater than or equal to 0
    if (quantity >= 0) {
        priceElement.textContent = "$" + price.toFixed(0);
    }
    
    //Update totals at end of each price update
    updateTotals();
    
}
});

  // Function to update the subtotal of product prices
  function updateTotals() {
        
        var productPriceElements = document.querySelectorAll(".productPrice");
        var subtotal = 0;

        productPriceElements.forEach(function (element) {
            var priceText = element.textContent;
            var priceValue = parseInt(priceText.substring(1)); // Remove the "$" sign and parse as an integer
            subtotal += priceValue;
        });

        //Adjust shipping cost in relation to subtotal
        var shippingCost;
        if (subtotal > 0) {
            shippingCost = 50;
        } else {
            shippingCost = 0;
        }
        var total= subtotal + shippingCost;

        // Update the shippingPrice in the totals table
        var shippingPriceElement = document.querySelector(".shippingPrice")
       shippingPriceElement.textContent = "$" + shippingCost.toFixed(0);
        
       // Update the subtotalPrice in the totals table
        var subtotalPriceElement = document.querySelector(".subtotalPrice");
        subtotalPriceElement.textContent = "$" + subtotal.toFixed(0);

        // Update the totalPrice in the totals table
        var totalPriceElement = document.querySelector(".totalPrice");
        totalPriceElement.textContent = "$" + total.toFixed(0);
    }

    // Initial update of totals
    updateTotals();


        
    