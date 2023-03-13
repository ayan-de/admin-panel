let mongoose = require("mongoose");
let pageSchema = mongoose.Schema({
//   PageNo: Number,
  pageUrl: String,
  pageNavText: String,
  pageTitle: String,
  pageMetaDescrition: String,
  pageMetaKeyword: String,
  pageHeading: String,
  pagePhoto: String,
  pageDetails: String
});

let pageModel = mongoose.model("table", pageSchema);

module.exports = pageModel;
