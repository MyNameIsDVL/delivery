import React, { useEffect, useState, useContext } from 'react';
import { PStore } from '../../../store/PStore';
import './DeliveryGooglePay.css';
import GooglePayButton from '@google-pay/button-react';

const DeliveryGooglePay = ({ currentUserId }) => {

    const [total, setTotal] = useState(null);

    const { basket_added } = useContext(PStore);

    useEffect(() => {
        let total = 0;
        basket_added.filter(bas => bas.IdUser === currentUserId).forEach(prod => {  
            total = total + Number(prod.ProductPrice);
        });
        setTotal((total).toFixed(2));
    }, [basket_added, currentUserId]);

    return(
        <div className="deliveryGooglePay">
            <GooglePayButton
                nvironment="TEST"
                paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                    {
                        type: 'CARD',
                        parameters: {
                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                        type: 'PAYMENT_GATEWAY',
                        parameters: {
                            gateway: 'example',
                            gatewayMerchantId: 'exampleGatewayMerchantId',
                        },
                        },
                    },
                    ],
                    merchantInfo: {
                    merchantId: '12345678901234567890',
                    merchantName: 'Demo Merchant',
                    },
                    transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: total,
                    currencyCode: 'PLN',
                    countryCode: 'PL',
                    },
                }}
                onLoadPaymentData={paymentRequest => {
                    console.log('load payment data', paymentRequest);
                }}
            />
        </div>
    );
}

export default DeliveryGooglePay;