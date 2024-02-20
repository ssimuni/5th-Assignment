function scrollToTicketSection() {
    // Get the ticket section element
    var ticketSection = document.getElementById('ticket');

    // Scroll to the ticket section smoothly
    ticketSection.scrollIntoView({ behavior: 'smooth' });
}

const seatButtons = document.querySelectorAll('.seat-button button');
const seatIncElement = document.getElementById('seat-inc');
const seatDecElement = document.getElementById('seat-dec');
const seat1RowElement = document.getElementById('seat1-row');
const seat2RowElement = document.getElementById('seat2-row');
const seat3RowElement = document.getElementById('seat3-row');
const seat4RowElement = document.getElementById('seat4-row');
const tbodyElement = document.querySelector('#ticket tbody');
const totalPriceElement = document.getElementById('total-price');
const grandTotalElement = document.getElementById('grand-total');
const couponCodeInput = document.getElementById('coupon-code');
const applyButton = document.getElementById('apply');

// Initialize counters
let selectedSeats = 0;
let totalAmount = 0;
let grandTotal = 0;

// Hide all seat rows initially
seat1RowElement.style.display = 'none';
seat2RowElement.style.display = 'none';
seat3RowElement.style.display = 'none';
seat4RowElement.style.display = 'none';

// Add click event listeners to each seat button
seatButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Check if the button is not already selected and the limit is not reached
        if (!button.classList.contains('selected') && selectedSeats < 4) {
            // Increment counters
            selectedSeats++;
            seatIncElement.textContent = selectedSeats;
            // Decrement the available seats
            const availableSeats = parseInt(seatDecElement.textContent, 10);
            seatDecElement.textContent = availableSeats - 1;

            // Show the corresponding seat row
            if (selectedSeats === 1) {
                seat1RowElement.style.display = 'table-row';
            } else if (selectedSeats === 2) {
                seat2RowElement.style.display = 'table-row';
            } else if (selectedSeats === 3) {
                seat3RowElement.style.display = 'table-row';
            } else if (selectedSeats === 4) {
                seat4RowElement.style.display = 'table-row';
            }

            // Update corresponding seat information
            const seatElement = document.getElementById(`seat${selectedSeats}`);
            seatElement.textContent = button.textContent;

            // Add 550 to the total amount
            totalAmount += 550;
            totalPriceElement.textContent = totalAmount;

            // Mark the button as selected and change the background color
            button.classList.add('selected');
            button.style.backgroundColor = '#1DD100'; // Set your desired green color

        } else if (button.classList.contains('selected')) {
            // If the button is already selected, deselect it
            // Decrement counters
            selectedSeats--;
            seatIncElement.textContent = selectedSeats;
            seatDecElement.textContent = 40 - selectedSeats; // Update the seat-dec element

            // Hide the corresponding seat row
            if (selectedSeats === 0) {
                seat1RowElement.style.display = 'none';
            } else if (selectedSeats === 1) {
                seat2RowElement.style.display = 'none';
            } else if (selectedSeats === 2) {
                seat3RowElement.style.display = 'none';
            } else if (selectedSeats === 3) {
                seat4RowElement.style.display = 'none';
            }

            // Update corresponding seat information to an empty string
            const seatElement = document.getElementById(`seat${selectedSeats + 1}`);
            seatElement.textContent = '';

            //  550 to the total amount
            totalAmount -= 550;
            totalPriceElement.textContent = totalAmount;

            // Unmark the button as selected and reset the background color
            button.classList.remove('selected');
            button.style.backgroundColor = '#F7F8F8'; // Set your default background color
        }
    });
});

applyButton.addEventListener('click', () => {
    const couponCode = couponCodeInput.value.trim().toLowerCase();

    // Check for valid coupon codes and update grand total accordingly
    if (couponCode === 'new15') {
        grandTotal = totalAmount * 0.85; // 15% discount
    } else if (couponCode === 'couple20') {
        grandTotal = totalAmount * 0.8; // 20% discount
    } else {
        grandTotal = totalAmount; // No discount for invalid codes
    }

    // Display the updated grand total
    grandTotalElement.textContent = grandTotal;
});