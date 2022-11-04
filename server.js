// sk_test_51LCUgmDYfpInpYc8yFs61u2u9HHZwk3WJP64mOYQ33jKJdT0PHHPXqLAquLSr04UxLKdOVI2Z9K1H6Tb7KXMRorQ005obTwtwx
// coffee:price_1M0WzFDYfpInpYc8thky2pOI
//Sunglasses:price_1M0X0fDYfpInpYc8q75n4j6E
//Camera:price_1M0X1KDYfpInpYc82aZoFh5O

const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(
  'sk_test_51LCUgmDYfpInpYc8yFs61u2u9HHZwk3WJP64mOYQ33jKJdT0PHHPXqLAquLSr04UxLKdOVI2Z9K1H6Tb7KXMRorQ005obTwtwx'
)
const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.json())

app.post('/checkout', async (req, res) => {
  const items = req.body.items
  let lineItems = []
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    })
  })

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  })

  res.send(
    JSON.stringify({
      url: session.url,
    })
  )
})

app.listen(4000, () => console.log('Listening on port 4000'))
