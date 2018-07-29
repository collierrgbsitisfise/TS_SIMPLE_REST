import * as mongoose from "mongoose";
const linkRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

const LinkSchema = new mongoose.Schema({
  link: {
    type: String,
    validate: {
      validator: (value: string) => linkRegExp.test(value),
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

LinkSchema.pre("save", function preSave(this: any, next: any) {
  this.link = this.link.indexOf("//") === -1 ? `http://${this.link}` : this.link;
  this.shortLinkHash = this._id;
  next(null);
});

const Link = mongoose.model("Link", LinkSchema);

export default Link;
