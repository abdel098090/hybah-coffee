import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export const sendOrderConfirmation = async (email, orderDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: `Order Confirmation - Hybah Coffee House #${orderDetails.id}`,
      html: `
        <h2>Thank you for your order!</h2>
        <p>Order #${orderDetails.id}</p>
        <p>Total: $${orderDetails.total}</p>
        <p>Status: ${orderDetails.status}</p>
        <p>Estimated preparation time: ${orderDetails.estimated_time} minutes</p>
      `
    }
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Email send error:', error)
    throw error
  }
}

export const sendReservationConfirmation = async (email, reservationDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: `Reservation Confirmation - Hybah Coffee House`,
      html: `
        <h2>Reservation Confirmed!</h2>
        <p>Date: ${reservationDetails.date}</p>
        <p>Time: ${reservationDetails.time}</p>
        <p>Guests: ${reservationDetails.guests}</p>
        <p>Seating: ${reservationDetails.seating_type}</p>
        <p>Status: ${reservationDetails.status}</p>
      `
    }
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Email send error:', error)
    throw error
  }
}

export default { sendOrderConfirmation, sendReservationConfirmation }

