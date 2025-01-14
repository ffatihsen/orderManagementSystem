const { addEmailToQueue } = require('./emailTask');
const { addInvoiceToQueue } = require('./invoiceTask');


async function addTask(queueName, taskData) {
    switch (queueName) {
        case 'emailQueue':
            await addEmailToQueue(taskData);
            break;
        case 'invoiceQueue':
                await addInvoiceToQueue(taskData);
                break;
        default:
            console.error('An undefined queue:', queueName);
    }
}

module.exports = {
    addTask,
};
