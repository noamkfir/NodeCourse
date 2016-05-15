var pm2 = require('pm2');


pm2.connect(function(err) {

    pm2.start('../../Mod04/Express/app/server.js', function(err, proc) {
        if (err) throw new Error(err);

        pm2.list(function(err, list) {
            console.log(list);
            pm2.disconnect(function() {
                process.exit(0)
            });
        });


    });


});