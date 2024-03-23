const mongoose = require("mongoose");
const datascheme =new mongoose.Schema(
    {
        gmail:{
         type :String ,
        },
        password:
        {
            type :String ,
        },
        cat :{
             type :String,
        }
    });
    const Book =mongoose.model("Book",datascheme);
        
const bookSchema = new mongoose.Schema({
    ISBN: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    publication_date: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    image_url_s: {
      type: String,
      required: true
    },
    image_url_m: {
      type: String,
      required: true
    },
    image_url_l: {
      type: String,
      required: true
    },
    frequency: {
      type: Number,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    location_id: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  });
        const Data =mongoose.model("Data",datascheme);
        module.exports= { Data, Book  };