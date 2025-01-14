const axios = require('axios');

const sendInvoice = async (invoiceJob) => {
    try {

        const invoiceResponse = await axios.post(`${process.env.INVOICE_SERVICE_URL}/invoices/`, {
            order_id: invoiceJob.order_id
        });

        return invoiceResponse;

    } catch (err) {
        console.error('Invoice error:', err.response ? err.response.data : err.message);
        return { success: false, message: 'Invoice creation failed', error: err.message };
    }
};

module.exports = {
    sendInvoice,
};
