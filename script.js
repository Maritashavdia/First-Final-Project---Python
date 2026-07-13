let selectedRoom = ''
let selectedPrice = 0

function selectRoom(roomName, roomPrice) {
    selectedRoom = roomName
    selectedPrice = roomPrice

    document.getElementById('selected-room').textContent = roomName
    document.getElementById('room-price').textContent = roomPrice

    calculateDays()

    const bookingStatus =
        document.getElementById('booking-status')

    bookingStatus.textContent =
        'Room selected. Please choose check-in and check-out dates.'

    bookingStatus.className = 'booking-status'

    const bookingSection =
        document.getElementById('booking')

    window.scrollTo({
        top: bookingSection.offsetTop - 100,
        behavior: 'smooth'
    })
}

function calculateDays() {
    const checkInValue =
        document.getElementById('check-in-date').value

    const checkOutValue =
        document.getElementById('check-out-date').value

    const numberOfDaysElement =
        document.getElementById('number-of-days')

    const totalPriceElement =
        document.getElementById('total-price')

    if (checkInValue === '' || checkOutValue === '') {
        numberOfDaysElement.textContent = 0
        totalPriceElement.textContent = 0
        return
    }

    const checkInDate = new Date(checkInValue)
    const checkOutDate = new Date(checkOutValue)

    const differenceInMilliseconds =
        checkOutDate - checkInDate

    const numberOfDays =
        differenceInMilliseconds / (1000 * 60 * 60 * 24)

    if (numberOfDays <= 0) {
        numberOfDaysElement.textContent = 0
        totalPriceElement.textContent = 0

        const bookingStatus =
            document.getElementById('booking-status')

        bookingStatus.textContent =
            'Check-out date must be later than check-in date.'

        bookingStatus.className =
            'booking-status booking-error'

        return
    }

    numberOfDaysElement.textContent = numberOfDays

    const totalPrice =
        selectedPrice * numberOfDays

    totalPriceElement.textContent = totalPrice

    const bookingStatus =
        document.getElementById('booking-status')

    bookingStatus.textContent =
        'Dates selected. You can now complete your booking.'

    bookingStatus.className = 'booking-status'
}

function bookRoom(event) {
    event.preventDefault()

    const bookingStatus =
        document.getElementById('booking-status')

    const checkInValue =
        document.getElementById('check-in-date').value

    const checkOutValue =
        document.getElementById('check-out-date').value

    const numberOfDays =
        Number(
            document.getElementById('number-of-days').textContent
        )

    if (selectedRoom === '') {
        bookingStatus.textContent =
            'Please select a room first.'

        bookingStatus.className =
            'booking-status booking-error'

        return
    }

    if (checkInValue === '' || checkOutValue === '') {
        bookingStatus.textContent =
            'Please select check-in and check-out dates.'

        bookingStatus.className =
            'booking-status booking-error'

        return
    }

    if (numberOfDays < 1) {
        bookingStatus.textContent =
            'Please select valid booking dates.'

        bookingStatus.className =
            'booking-status booking-error'

        return
    }

    const totalPrice =
        selectedPrice * numberOfDays

    const successMessage =
        document.getElementById('success-message')

    successMessage.innerHTML = `
        <strong>Room:</strong> ${selectedRoom}<br><br>
        <strong>Check-in:</strong> ${checkInValue}<br>
        <strong>Check-out:</strong> ${checkOutValue}<br>
        <strong>Days:</strong> ${numberOfDays}<br>
        <strong>Total Price:</strong> ${totalPrice} GEL
    `

    bookingStatus.textContent =
        'Your booking was completed successfully.'

    bookingStatus.className =
        'booking-status booking-success'

    const successModal =
        new bootstrap.Modal(
            document.getElementById('success-modal')
        )

    successModal.show()
}