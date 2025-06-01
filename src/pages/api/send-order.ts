// pages/api/send-order.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { phone, address, payment, selectedBooks } = req.body
  console.log(req.body);

  if (!phone || !address || !selectedBooks || selectedBooks.length === 0) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dark7stars@gmail.com',
        pass: 'dark7***'
      }
    })

    const bookList = selectedBooks.map((book: string, i: number) => `${i + 1}. ${book}`).join('\n')
   // console.log(bookList, phone, address, payment);
    await transporter.sendMail({
      from: 'dark7stars@gmail.com',
      to: 'asw527174@gmail.com',
      subject: 'New Book Order',
      text: `New order received:

Phone: ${phone}
Address: ${address}
Payment Method: ${payment}

Selected Books:
${bookList}`
    })

    res.status(200).json({ message: 'Order email sent successfully' })
  } catch (error) {
    console.error('Email sending error:', error)
    res.status(500).json({ message: 'Error sending email' })
  }
}
