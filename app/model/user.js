const mongoose = require("mongoose");
require("../config/database").connect();

const userSchema = new mongoose.Schema({
  full_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },  
  mobile_number: { type: String, default: null },
  t_and_c:{ type: String },
  user_role:{ type: String },
  profile_status:{type:Boolean}
},
{ 
  timestamps: true 
}
);

const eventSchema = new mongoose.Schema({
  event_name_aleena: { type: String, default: null },
  event_date_aleena: { type: String },
  event_location_aleena: { type: String },  
  event_contact_aleena: { type: String, default: null }
},
{ 
  timestamps: true 
}
);

const eventbookSchema = new mongoose.Schema({
  event_id:{type:mongoose.Types.ObjectId,ref:'events'},
  user_id: { type: String },
  school_name:{type:String},
  teach_name:{type:String},
  teach_email:{type:String},
  number_student:{type:String},
  age_group:{type:String},
  event_status:{type:String}
},
{ 
  timestamps: true 
}
);

const user = mongoose.model("user", userSchema,'users');
const event = mongoose.model("events", eventSchema,'events');
const event_book = mongoose.model("event_book", eventbookSchema,'event_book');

module.exports ={
    user,
    event,
    event_book
}