document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function (event) {
        // Check if the clicked element is inside a product div
        const productDiv = event.target.closest(".product");

        // If clicked element is NOT a product, exit function
        if (!productDiv) return;

        // Extract product details
        const productImage = productDiv.querySelector("img").src;
        const productName = productDiv.querySelector("h5").textContent.trim();
        const productDescription = productDiv.querySelector("p:first-of-type").textContent.trim(); // First <p> is description
        const productPrice = productDiv.querySelector("p:nth-of-type(2)").textContent.trim(); // Second <p> is price
        // Show Swal Modal
        swal({
            title: productName,
            text: "Description: " + productDescription + "\n\nPrice: " + productPrice,
            icon: productImage,
            buttons: {
                confirm: {
                    text: "Close",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true
                }
            }
        });
        // Check if "get-info" button was clicked
        if (event.target.closest(".get-info")) {
            // Show Swal Modal
            // Show the SweetAlert modal
            showBuyAlert();
        }

        // Add-to-cart button functionality (if needed)
        if (event.target.closest(".add-to-cart")) {
            // Create product object
            const product = { productName, productPrice, productImage, quantity: 1 };
            // Add to cart
            addToCart(product);
        }

        // Pay-now button functionality (if needed)
        if (event.target.closest(".pay-now")) {
            // Store product details in a global variable
            let product = {
                productName,
                productPrice,
                productImage,
                quantity: 1
            };
            // Show the SweetAlert modal
            payNow(product);
        }
    });

    // Function to add product to cart (stores in localStorage)
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || []; // Get cart or initialize empty array

        // Check if product already exists in cart
        const exists = cart.some(item => item.productName === product.productName);
        if (exists) {
            swal("Product Already in Cart", "This product is already in your cart. You can increase the purchase quantity from your cart",
                "warning");
            return;
        }

        // Add product to cart
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage

        updateCartTotal();

        // Success message
        swal("Added to Cart!", `${product.productName} has been added to your cart.`, "success");
    }

        // Click event for the cart div
    document.querySelector(".search-bar").addEventListener("click", function (event) {
        comingSoon();
    })


    // Click event for the cart div
    document.querySelector(".account-cart").addEventListener("click", function (event) {
        event.preventDefault();

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            swal("Your Cart is Empty!", "Add products to your cart before viewing.", "info");
            return;
        }

        // Create HTML for the cart modal
        let cartHTML = cart.map((product, index) => `
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <img src="${product.productImage}" alt="${product.productName}" style="width: 100px; height: 100px; border-radius: 5px;">
                <div>
                    <strong>${product.productName}</strong> <br>
                    <span>${product.productPrice}</span>
                </div>
                <div style="margin-left: auto;">
                    <button onclick="updateQuantity(${index}, -1)" class="btn btn-danger btn-sm">-</button>
                    <span id="quantity-${index}">${product.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)" class="btn btn-success btn-sm">+</button>
                </div>
            </div>
        `).join("");

        // Show the cart modal
        swal({
            title: "Your Cart",
            content: {
                element: "div",
                attributes: { innerHTML: cartHTML }
            },
            buttons: {
                close: {
                    text: "Finish Order",
                    value: 'clicked',
                    visible: true,
                    className: "btn btn-success"
                }
            }
        }).then((value) => {
            if (value === "clicked") {
                payNow()
            }
        })
    });
});

// Function to show the alert when the button is clicked
function showBuyAlert() {
    swal({
        title: "Contact Seller",
        text: "Easily contact seller on social media. You may be lucky to get a discount.",
        icon: 'warning',
        content: {
            element: "div",
            attributes: {
                innerHTML: `
                    <button id="btn1" class="btn btn-primary"><i class="bi bi-facebook"></i> Facebook</button>
                    <button id="btn2" class="btn btn-success"><i class="bi bi-whatsapp"></i> Whatsapp</button>
                    <button id="btn3" class="btn btn-warning"><i class="bi bi-instagram"></i> Instagram</button>
                `
            }
        },
        buttons: false // Hide default buttons
    });

    // Wait for the DOM to update before adding event listeners
    setTimeout(() => {
        document.getElementById("btn1").addEventListener("click", function () {
            const fbUsername = "yourPageUsername"; // Get business page name from localhost

            // Get stored product details
            const { productName, productDescription, productPrice, productURL } = window.selectedProduct;

            // Construct Messenger message
            const message = `Hello, I'm interested in *${productName}*, ${productDescription} priced at *${productPrice}*. Can you provide more details?%0A%0A${productURL}`;

            // Facebook Messenger link (Opens chat with your page)
            const fbMessengerURL = `https://m.me/${fbUsername}`;

            // Copy message and redirect to Messenger
            navigator.clipboard.writeText(message).then(() => {
                alert("Message copied! Please paste it in Messenger.");
                window.open(fbMessengerURL, "_blank");
            }).catch(err => {
                alert("Copy failed! Please manually copy the message:\n\n" + message);
                window.open(fbMessengerURL, "_blank");
            });
        });

        document.getElementById("btn2").addEventListener("click", function () {
            const phoneNumber = "2349076993818"; // Get number from localhost

            // Get stored product details
            const { productName, productDescription, productPrice, productURL } = window.selectedProduct;

            // Construct WhatsApp message
            const message = `Hello, I'm interested in *${productName}*, ${productDescription} priced at *${productPrice}*. Can you provide more details? %0A%0A${productURL}`;
            const encodedMessage = encodeURIComponent(message);

            // Generate WhatsApp link
            window.location.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
        });

        document.getElementById("btn3").addEventListener("click", function () {
            swal('Coming Soon', 'Buy on Instagram is coming soon', 'info');
        });
    }, 100);
}

// Function to update total price
function updateCartTotal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + (parseFloat(item.productPrice.replace("₦", "")) * item.quantity), 0);
    document.getElementById("cart-total").textContent = total.toFixed(2);
}

// Run function on page load
document.addEventListener("DOMContentLoaded", updateCartTotal);

// Function to update quantity in cart
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index]) {
        cart[index].quantity += change;

        // Remove item if quantity is 0
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartTotal();

        // Refresh the cart modal
        document.querySelector(".account-cart").click();
    }
}

function payNow(product = null) {
    let cart;
    let totalPrice;

    if (product) {
        // Single product purchase
        cart = [product]; // Treat the single product as a cart array
        let price = parseFloat(product.productPrice.replace(/[^\d.]/g, '')) || 0;
        totalPrice = price * product.quantity;
    } else {
        // Full cart purchase
        cart = JSON.parse(localStorage.getItem("cart")) || [];
        totalPrice = cart.reduce((sum, item) => {
            let price = parseFloat(item.productPrice.replace(/[^\d.]/g, '')) || 0;
            return sum + price * item.quantity;
        }, 0);
    }

    swal({
        title: "Pay Now",
        icon: 'https://peppubuild.com/favicon.ico',
        content: {
            element: "div",
            attributes: {
                innerHTML: `
                    <div style="text-align: center;">
                        <div style="margin-bottom: 15px;">
                            <i class="bi bi-basket2-check" style="font-size: 40px; color: #2DA44E;"></i>
                        </div>
                        <p style="font-size: 18px; font-weight: bold;">Choose a method to complete your Order</p>
    
                        <div id="payNowBtn" style="display: flex; align-items: center; padding: 12px; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 10px; cursor: pointer;">
                            <i class="bi bi-wallet2" style="font-size: 24px; margin-right: 12px; color: #FF6600;"></i>
                            <div>
                                <strong>Pay Now</strong>
                                <p style="margin: 0; font-size: 14px; color: #666;">Pay with any method of your choice</p>
                            </div>
                        </div>
    
                        <div id="sendToWhatsApp" style="display: flex; align-items: center; padding: 12px; border: 1px solid #ddd; border-radius: 10px; margin-top: 10px; cursor: pointer;">
                            <i class="bi bi-whatsapp" style="font-size: 24px; margin-right: 12px; color: #25D366;"></i>
                            <div>
                                <strong>Send to WhatsApp</strong>
                                <p style="margin: 0; font-size: 14px; color: #666;">Finalize order with merchant on WhatsApp</p>
                            </div>
                        </div>
                        <a href="#" onclick="showInvoice(${product ? JSON.stringify(cart) : ''})" style="display: block; margin-top: 15px; color: #5C3BFE; text-decoration: none; font-weight: bold;">See Order Summary ↗</a>
                    </div>
                `
            }
        },
        buttons: {
            cancel: {
                text: "Cancel",
                value: null,
                visible: true,
                className: "btn btn-secondary"
            }
        }
    });

    // Add event listeners after modal appears
    setTimeout(() => {
        document.getElementById("payNowBtn").addEventListener("click", () => {
            swal("Direct Payment", "Direct payment isn't available for now, pay via WhatsApp", "info");
        });

        document.getElementById("sendToWhatsApp").addEventListener("click", () => {
            downloadInvoice(cart, totalPrice);
            swal("WhatsApp", "We've downloaded your purchase summary. Open WhatsApp and send to the vendor.", "success")
                .then(() => {
                    const phoneNumber = "2349076993818";
                    const message = `Hello, I'd like to make a purchase. I have attached the invoice.`;
                    const encodedMessage = encodeURIComponent(message);
                    window.location.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
                });
        });
    }, 100);
}

function showInvoice(cartData = null) {
    let cart;
    if (cartData) {
        // If cartData is provided (single product or custom cart), parse it
        cart = [];
        cart.push(cartData);
    } else {
        // Otherwise, use the full cart from localStorage
        cart = JSON.parse(localStorage.getItem("cart")) || [];
    }

    if (cart.length === 0) {
        swal("Cart is Empty", "Please add items before generating an invoice.", "warning");
        return;
    }

    // Calculate total price
    let totalPrice = cart.reduce((sum, product) => {
        let price = parseFloat(product.productPrice.replace(/[^\d.]/g, '')) || 0;
        return sum + price * product.quantity;
    }, 0);

    // Generate invoice HTML
    let invoiceHTML = `
        <div style="font-family: Arial, sans-serif; text-align: left; padding: 10px;">
            <h3 style="text-align: center;">Invoice</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <th style="border-bottom: 1px solid #ddd; padding: 5px;">Product</th>
                    <th style="border-bottom: 1px solid #ddd; padding: 5px;">Price</th>
                    <th style="border-bottom: 1px solid #ddd; padding: 5px;">Qty</th>
                    <th style="border-bottom: 1px solid #ddd; padding: 5px;">Total</th>
                </tr>
                ${cart.map(product => `
                    <tr>
                        <td style="padding: 5px;">${product.productName}</td>
                        <td style="padding: 5px;">${product.productPrice}</td>
                        <td style="padding: 5px;">${product.quantity}</td>
                        <td style="padding: 5px;">₦ ${(parseFloat(product.productPrice.replace(/[^\d.]/g, '')) || 0) * product.quantity}</td>
                    </tr>
                `).join('')}
            </table>
            <h4 style="text-align: right; margin-top: 10px;">Total: ₦ ${totalPrice.toFixed(2)}</h4>
        </div>
    `;

    // Show the invoice modal
    swal({
        title: "Invoice",
        content: {
            element: "div",
            attributes: { innerHTML: invoiceHTML }
        },
        buttons: {
            download: {
                text: "Download Summary",
                value: "download",
                className: "btn btn-primary"
            },
            close: {
                text: "Close",
                value: null,
                visible: true,
                className: "btn btn-secondary"
            }
        }
    }).then((value) => {
        if (value === "download") {
            downloadInvoice(cart, totalPrice);
        }
    });
}

// Function to generate and download invoice as a text file
function downloadInvoice(cart, totalPrice) {
    // Load jsPDF (Ensure you include jsPDF in your project)
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Invoice", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    let y = 40; // Vertical position for text
    doc.text("------------------------------------------------", 20, y);
    y += 10;

    cart.forEach(product => {
        let price = parseFloat(product.productPrice.replace(/[^\d.]/g, '')) || 0;
        let total = price * product.quantity;
        doc.text(`${product.productName} - ${product.productPrice} x ${product.quantity} = ₦ ${total}`, 20, y);
        y += 10;
    });

    doc.text("------------------------------------------------", 20, y);
    y += 10;
    doc.text(`Total: ₦ ${totalPrice.toFixed(2)}`, 20, y);

    // Save the PDF
    doc.save("invoice.pdf");
}

function comingSoon() {
    swal("Feature coming soon!", "This Feature is coming soon!",
        "warning");
}


// Run total update when page loads
// updateCartTotal();


