const mongoose = require("mongoose");
const schema = mongoose.Schema;
const articalSchema = new schema({
  title: String,
  body: String,
  numberOfLikes: Number,
});
const Artical = mongoose.model("Article", articalSchema);
module.exports = Artical;
