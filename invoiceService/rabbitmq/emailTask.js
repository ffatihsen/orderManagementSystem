const { getChannel } = require('./connection');

const QUEUE_NAME = 'emailQueue';

async function addEmailToQueue(emailJob) {
    try {
        const channel = getChannel();

        await channel.assertQueue(QUEUE_NAME, {
            durable: true
        });

        channel.sendToQueue(
            QUEUE_NAME,
            Buffer.from(JSON.stringify(emailJob)), 
            { persistent: true }
        );

        console.log('Email added to queue:', emailJob);
    } catch (error) {
        console.error('Error adding email to queue:', error.message);
        throw error;
    }
}

module.exports = {
    addEmailToQueue,
};
