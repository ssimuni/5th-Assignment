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
const couponhide = document.getElementById('couponhide');

let selectedSeats = 0;
let totalAmount = 0;
let grandTotal = 0;


seat1RowElement.style.display = 'none';
seat2RowElement.style.display = 'none';
seat3RowElement.style.display = 'none';
seat4RowElement.style.display = 'none';

seatButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        
        if (!button.classList.contains('selected') && selectedSeats < 4) {
           
            selectedSeats++;
            seatIncElement.textContent = selectedSeats;
           
            const availableSeats = parseInt(seatDecElement.textContent, 10);
            seatDecElement.textContent = availableSeats - 1;

            
            if (selectedSeats === 1) {
                seat1RowElement.style.display = 'table-row';
            } else if (selectedSeats === 2) {
                seat2RowElement.style.display = 'table-row';
            } else if (selectedSeats === 3) {
                seat3RowElement.style.display = 'table-row';
            } else if (selectedSeats === 4) {
                seat4RowElement.style.display = 'table-row';
            }

           
            const seatElement = document.getElementById(`seat${selectedSeats}`);
            seatElement.textContent = button.textContent;

          
            totalAmount += 550;
            totalPriceElement.textContent = totalAmount;

           
            button.classList.add('selected');
            button.style.backgroundColor = '#1DD100'; // Set your desired green color

        } else if (button.classList.contains('selected')) {
           
            selectedSeats--;
            seatIncElement.textContent = selectedSeats;
            seatDecElement.textContent = 40 - selectedSeats; // Update the seat-dec element

         
            if (selectedSeats === 0) {
                seat1RowElement.style.display = 'none';
            } else if (selectedSeats === 1) {
                seat2RowElement.style.display = 'none';
            } else if (selectedSeats === 2) {
                seat3RowElement.style.display = 'none';
            } else if (selectedSeats === 3) {
                seat4RowElement.style.display = 'none';
            }

            
            const seatElement = document.getElementById(`seat${selectedSeats + 1}`);
            seatElement.textContent = '';

       
            totalAmount -= 550;
            totalPriceElement.textContent = totalAmount;

            
            button.classList.remove('selected');
            button.style.backgroundColor = '#F7F8F8'; 
        }
    });
});

applyButton.addEventListener('click', () => {
    const couponCode = couponCodeInput.value.trim();

    
    if (couponCode === 'New15') {
        grandTotal = totalAmount * 0.85; 
    } else if (couponCode === 'Couple 20') {
        grandTotal = totalAmount * 0.8;
    } else {
        grandTotal = totalAmount; 
    }

    couponhide.style.display = 'none';


    grandTotalElement.textContent = grandTotal;
});