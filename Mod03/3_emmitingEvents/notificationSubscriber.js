const { notifier } = require('./notificationPublisher');

notifier.on('now', (now) => console.log(`Now is ${now}`));
