let purchaseCount = 0;
let totalTicketsSold = 0;
let vipTicketsSold = 0;
let grandTotal = 0;

function addPurchase() {

    let type = "";
    let qty = 0;
    let promo = "";

    let errorMsg = "";

    do {
        type = document.getElementById("type").value.trim().toUpperCase();

        if (type !== "REG" && type !== "STU" && type !== "VIP") {
            errorMsg = "Invalid ticket type. Use REG, STU, or VIP.";
            break;
        }

        let qtyInput = document.getElementById("qty").value;
        qty = Number(qtyInput);

        if (
            isNaN(qty) ||
            qty < 1 ||
            !Number.isInteger(qty)
        ) {
            errorMsg = "Quantity must be a whole number >= 1.";
            break;
        }

        promo = document.getElementById("promo").value.trim().toUpperCase();

        if (promo !== "" && promo !== "SAVE5") {
            errorMsg = "Invalid promo code. Valid code is SAVE5.";
            break;
        }

        errorMsg = "";
    } while (false);

    if (errorMsg !== "") {
        document.getElementById("error").innerText = errorMsg;
        return;
    }

    document.getElementById("error").innerText = "";

    let price = 0;

    if (type === "REG") price = 12.50;
    else if (type === "STU") price = 9.00;
    else if (type === "VIP") price = 25.00;

    let subtotal = price * qty;
    let discount = 0;
    let serviceFee = 0;
    let promoAmt = 0;

    if (qty >= 5) {
        discount = subtotal * 0.10;
    }

    if (type === "VIP" && qty >= 2) {
        serviceFee = 5.00;
    }

    let beforePromo = subtotal - discount + serviceFee;

    if (promo === "SAVE5") {
        promoAmt = 5.00;
        if (beforePromo - promoAmt < 0) {
            promoAmt = beforePromo;
        }
    }

    let beforeTax = beforePromo - promoAmt;
    let tax = beforeTax * 0.13;
    let total = beforeTax + tax;

    purchaseCount++;
    totalTicketsSold += qty;
    if (type === "VIP") vipTicketsSold += qty;
    grandTotal += total;

    let receiptHTML = `<table border="1">
        <tr><th colspan="2">Receipt</th></tr>
        <tr><td>${type} Tickets</td><td>${qty} x $${price.toFixed(2)}</td></tr>
        <tr><td>Sub Total</td><td>$${subtotal.toFixed(2)}</td></tr>
        <tr><td>Discount</td><td>-$${discount.toFixed(2)}</td></tr>
        <tr><td>Service Fee</td><td>$${serviceFee.toFixed(2)}</td></tr>
        <tr><td>Promo</td><td>-$${promoAmt.toFixed(2)}</td></tr>
        <tr><td>Sub Total After</td><td>$${beforeTax.toFixed(2)}</td></tr>
        <tr><td>Tax</td><td>$${tax.toFixed(2)}</td></tr>
        <tr><td><b>Total</b></td><td><b>$${total.toFixed(2)}</b></td></tr>
    </table><br>`;

    document.getElementById("receipt").innerHTML += receiptHTML;
}

function showSummary() {

    if (purchaseCount === 0) {
        document.getElementById("summary").innerText =
            "No purchases have been made yet.";
        return;
    }

    let summaryHTML = `<table border="1">
        <tr><th colspan="2">Final Summary</th></tr>
        <tr><td>Total Purchases</td><td>${purchaseCount}</td></tr>
        <tr><td>Total Tickets Sold</td><td>${totalTicketsSold}</td></tr>
        <tr><td>VIP Tickets Sold</td><td>${vipTicketsSold}</td></tr>
        <tr><td><b>Grand Total</b></td>
            <td><b>$${grandTotal.toFixed(2)}</b></td></tr>
    </table>`;

    document.getElementById("summary").innerHTML = summaryHTML;
}