const User = require("../model/user.js");
const http = require("http");
const bcrypt = require('bcryptjs');
module.exports = {
  // GET ALL ARTICLES
  async postUser_aleena(req, res, next) {
          // Our register logic starts here
      try {
        // Get user input
        const { full_name, email,mobile_number, password } = req.body;  
      
        if (!(email && password)) {
          return res.status(400).json({message:"All input is required"});
        } 
       
        const oldUser = await User.user.findOne({ email }); 
       
        if (oldUser) {
          return res.status(409).json({message:"User Already Exist. Please Login"});
        }
        
        encryptedPassword = await bcrypt.hash(password, 10);  
        // Create user in our database
        const user = await User.user.create({
          full_name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          mobile_number:mobile_number,
          password: encryptedPassword,
          user_role:'2',
          profile_status:true
        });
       
        var data={
          '_id':user._id,
          'full_name':user.full_name,
          'email':user.email,        
          'customer_id':user.customer_id,
          'mobile_number':user.mobile_number,
          'user_role':user.user_role,
          'profile_status':user.profile_status
      }
       return res.status(200).json(data);
      } catch (err) {
        return res.status(400).json({error:err})
      }    
    },
  async postLogin_aleena(req, res, next){
    try {
        // Get user input
        const { email, password } = req.body;
        
        // Validate user input
        if (!(email && password)) {
          return res.status(400).json({message:"All input is required"});
        }
        // Validate if user exist in our database
        const user = await User.user.findOne({ email });
        //console.log(user);
        if (user && (await bcrypt.compare(password, user.password))) {
         
          var data={
            '_id':user._id,
            'full_name':user.full_name,
            'email':user.email,     
            'mobile_number':user.mobile_number,
            'usertype':user.usertype,
            'user_role':user.user_role,
            'profile_status':user.profile_status
          }        
          return res.status(201).json(data)
        }
        return res.status(400).json({message:"Invalid Credentials"});
        
      } catch (err) {
        return res.status(400).json({error:err})
      }
  },
  async add_event_aleena(req, res, next){
    try {
        // Get user input
        const { event_name_aleena, event_date_aleena,event_location_aleena,event_contact_aleena } = req.body;
    
        // Validate user input
        if (!(event_name_aleena && event_date_aleena)) {
          return res.status(400).json({message:"All input is required"});
        }
        // Validate if user exist in our database
        //console.log(user);
        const event = await User.event.create({
            event_name_aleena:event_name_aleena,
            event_date_aleena: event_date_aleena, // sanitize: convert email to lowercase
            event_location_aleena:event_location_aleena,
            event_contact_aleena: event_contact_aleena
          });
         
         return res.status(200).json({message:"Event Succesfully added...",event});
        
      } catch (err) {
        return res.status(400).json({error:err})
      }
  },
  async event_book_aleena(req, res, next){

    try {
        // Get user input
        const { event_id, user_id,school_name,teach_name,teach_email,number_student,age_group } = req.body;
    
        
        // Validate if user exist in our database
        //console.log(user);
        const event_book = await User.event_book.create({
            event_id:event_id,
            user_id: user_id,
            school_name:school_name,
            teach_name:teach_name,
            teach_email:teach_email,
            number_student:number_student,
            age_group:age_group
          });
         
         return res.status(200).json({message:'Event successfully booked...',event_book});
        
      } catch (err) {
        return res.status(400).json({error:err})
      }

  },
  async event_get_aleena(req, res, next){

    try {
        // Get user input
        const { user_id } = req.body;
    
        const allevent = await User.event.find({});
         
         return res.status(200).json(allevent);
        
      } catch (err) {
        return res.status(400).json({error:err})
      }

  },
  async user_get_aleena(req, res, next){

    try {
        // Get user input
        const { user_id } = req.body;
    
        const alluser = await User.user.find({});
         
         return res.status(200).json(alluser);
        
      } catch (err) {
        return res.status(400).json({error:err})
      }

  },
  async mybooking_aleena(req, res, next){

    try {
        // Get user input
        const { user_id,user_role } = req.body; 
        // Validate if user exist in our database
        
        let uid;
        if(user_role=='1'){
          console.log(user_role);
           uid=''
        }else{
          uid=user_id;
        }
        let user_detail
        if(uid==''){

           user_detail = await User.event_book.aggregate([  { "$lookup": {
            "from": "events",
            "localField": "event_id",
            "foreignField": "_id",
            "as": "events_detail"
          }},
        
          // $unwind the array to denormalize
          { "$unwind": "$events_detail" } ]);   
          
        }else{
       
         user_detail = await  User.event_book.aggregate(
          [
            // Filter conditions from the source collection
            { "$match": { "user_id": { "$eq": uid } }},        
            // Do the first join
            { "$lookup": {
              "from": "events",
              "localField": "event_id",
              "foreignField": "_id",
              "as": "events_detail"
            }},
          
            // $unwind the array to denormalize
            { "$unwind": "$events_detail" } 
                  
          
          ]
        );
        }
        // console.log(user_detail);
         return res.status(200).json(user_detail);        
      } catch (err) {
        return res.status(400).json({error:err})
      }

  },
  async approve_decline_aleena(req, res, next){

    try {
        // Get user input
        const { event_status,booking_id } = req.body; 
        // Validate if user exist in our database
        await User.event_book.updateOne({_id:booking_id},{
          event_status:event_status
        });
        // console.log(user_detail);
         return res.status(200).json({message:'Event Updated...'});        
      } catch (err) {
        return res.status(400).json({error:err})
      }

  },
  async delete_user_aleena(req, res, next){

    try {
        // Get user input
        const { event_status,user_id } = req.body; 
        // Validate if user exist in our database
        await User.user.deleteOne({_id:user_id},{
          event_status:event_status
        });
        // console.log(user_detail);
         return res.status(200).json({message:'User deleted...'});        
      } catch (err) {
        return res.status(400).json({error:err})
      }

  }
};