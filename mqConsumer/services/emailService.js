const axios = require('axios');

const sendMail = async (mailJob) => {
    try {

        const mailResponse = await axios.post(`${process.env.NOTIFICATION_SERVICE_URL}/mail/send`, {
            toMail:mailJob.newInvoice.user_email ,  subject : "System Mail", content : mailJob
        });

        return mailResponse;

    } catch (err) {
        console.error('Mail error:', err.response ? err.response.data : err.message);
        return { success: false, message: 'Mail creation failed', error: err.message };
    }
};

module.exports = {
    sendMail,
};
