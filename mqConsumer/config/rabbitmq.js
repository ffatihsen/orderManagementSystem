const amqp = require('amqplib');
require('dotenv').config();

let channel;

async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('RabbitMQ connection successful.');
    } catch (error) {
        console.error('Error during RabbitMQ connection:', error.message);
        throw error;
    }
}


function getChannel() {
    if (!channel) {
        throw new Error('The RabbitMQ connection is not established.');
    }
    return channel;
}

module.exports = {
    connectRabbitMQ,
    getChannel,
};
