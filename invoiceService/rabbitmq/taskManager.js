const { addEmailToQueue } = require('./emailTask');


async function addTask(queueName, taskData) {
    switch (queueName) {
        case 'emailQueue':
            await addEmailToQueue(taskData);
            break;

        default:
            console.error('An undefined queue:', queueName);
    }
}

module.exports = {
    addTask,
};
