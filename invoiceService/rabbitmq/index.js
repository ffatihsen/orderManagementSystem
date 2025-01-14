const { connectRabbitMQ } = require('./connection');
const { addTask } = require('./taskManager');

(async () => {
    try {
        await connectRabbitMQ();
    } catch (error) {
        console.error('Error while starting RabbitMQ:', error.message);
    }
})();

module.exports = {
    addTask,
};
