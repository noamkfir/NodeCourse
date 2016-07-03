const express = require('express');

const app = express();

// * respond to a request *
app.get('/', (req, res, next) => res.send('Hello, world!'));

// * use routers and middleware *
// const publicRouter = express.Router();
// const memberRouter = express.Router();
// memberRouter.use(authenticationMiddleware);
// app.use('/', publicRouter);
// app.use('/members', memberRouter);

app.listen(3000);
