"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const SchemaM = mongoose.Schema;
const povarenokSchema = new SchemaM({
    sourceVideo: {
        type: String,
    },
    cookName: {
        type: String,
    },
    LinkToPost: {
        type: String,
    },
    time: {
        type: Number,
        default: new Date()
    }
});
const povarenok = mongoose.model('povarenok-cooks', povarenokSchema);
exports.default = povarenok;
//# sourceMappingURL=povarenok.js.map