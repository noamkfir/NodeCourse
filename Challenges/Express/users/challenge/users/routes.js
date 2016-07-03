const { Router } = require('express');
const router = Router();

//here are your first route to login page, you should fill the rest.
router.get("/login", function(req, res) {
    res.render("login");
});

router.post('/login', (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    userService.authenticate({ email, password }, (authenticated) => {
        if(authenticated) {
            router.redirect('/member');
        }
        else {
            res.status(401).send('Please enter a valid email and password');
        }
    });


});

router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', (req, res, next) => {
    // const email = req.body.email;
    // const password = req.body.password;

    userService.register(req.body, next);
});

module.exports = router;
