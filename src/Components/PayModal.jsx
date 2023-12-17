import React from 'react';
import ReactModal from 'react-modal'; 
import './PayModal.css'; 
import { useSaleContext } from '../Context/SaleContext';
import axios from 'axios';

ReactModal.setAppElement('#root'); 

function PaymentMethodModal({ isOpen, onRequestClose, onSelectPaymentMethod, id }) {
  const { paySale } = useSaleContext();

  const handlePayment = (paymentMethod) => {
    paySale(id, paymentMethod);
    onRequestClose();
  };

  return (
    <ReactModal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="payment-modal"
      overlayClassName="payment-modal-overlay"
    >
      <h2>Selecciona el método de pago</h2> 
      <div className="payment-options">
        <button onClick={() => handlePayment("QR")}>QR</button>
        <button onClick={() => handlePayment("Tarjeta")}>Tarjeta</button>
        <button onClick={() => handlePayment("Efectivo")}>Efectivo</button>
      </div>
    </ReactModal>
  );
}

export default PaymentMethodModal;
