import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const checkoutPrice = price * 100;
    const publishableKey = 'pk_test_51JuNNXKsXu0Kz3lEJYedkTKYt3YhoE7k15I6rkLuQEvX3VYCwQtb17dvBv9ovC1JBHHNS5TSOt1BcjH1sXTNljK600iLs9mgm3';

    const onToken = token => {
        console.log(token)
        alert('Payment Successful')
    }

    return (
        <StripeCheckout
            currency="CAD"
            label='Pay Now'
            name='CROWN Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={checkoutPrice}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton