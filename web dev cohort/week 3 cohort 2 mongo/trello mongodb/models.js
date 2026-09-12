const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://deypriyam807_db_user:9797@cluster0.fzqkt7d.mongodb.net/trello");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

const organizationSchema = mongoose.Schema({
    title: String,
    description: String,
    admin: mongoose.Types.ObjectId,
    members: [mongoose.Types.ObjectId]
})

const organizationModel = mongoose.model("organizations", organizationSchema);
const userModel = mongoose.model("users", userSchema);

module.exports = {
    organizationModel,
    userModel
}
