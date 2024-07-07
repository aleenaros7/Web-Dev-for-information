const UserController = require('../controllers/UserControllers');
module.exports = app => {
    app.post('/register', UserController.postUser_aleena);
    app.post('/login', UserController.postLogin_aleena);
    app.post('/add_event', UserController.add_event_aleena);
    app.post('/book_event', UserController.event_book_aleena);     
    app.post('/get_event', UserController.event_get_aleena);  
    app.post('/get_myevents', UserController.mybooking_aleena); 
    app.post('/approve_decline', UserController.approve_decline_aleena); 
    app.post('/users',UserController.user_get_aleena);
    app.post('/delete_user',UserController.delete_user_aleena);
  };