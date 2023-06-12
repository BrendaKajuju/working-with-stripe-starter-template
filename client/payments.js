document.addEventListener('DOMContentLoaded', async () => {
    // first, fetch the publishable key from the server

    const {publishableKey} = await fetch('/config').then(r => r.json())
    const stripe = Stripe(publishableKey)

    // second, create the payment intent on the server 
    const {clientSecret} = await fetch ("/create-payment-intent", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json())

    // third, rendering the payment elements
    const elements = stripe.elements ({ clientSecret })
    const paymentElement = elements.create('payment')
    paymentElement.mount('#payment-element')
})