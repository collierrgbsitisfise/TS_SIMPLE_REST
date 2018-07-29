"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uri = "mongodb://admin:vadim1@ds247330.mlab.com:47330/easy-links-db";
const linkRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
mongoose.connect(uri, (err) => {
    if (err) {
        console.log("error conncetion");
        return;
    }
    console.log("success connection to mongodb");
});
const LinkSchema = new mongoose.Schema({
    link: {
        type: String,
        validate: {
            validator: (value) => linkRegExp.test(value),
            message: "Provided link is not valid"
        }
    },
    isExp: {
        type: Boolean,
        default: false
    },
    shortLinkHash: {
        type: String
    },
    privateOnly: {
        type: Boolean,
        default: false
    },
    onceAvailable: {
        type: Boolean,
        default: false
    }
});
LinkSchema.pre("save", function preSave(next) {
    this.link = this.link.indexOf("//") === -1 ? `http://${this.link}` : this.link;
    this.shortLinkHash = this._id;
    next(null);
});
const Link = mongoose.model("Link", LinkSchema);
exports.default = Link;
//# sourceMappingURL=link.js.map