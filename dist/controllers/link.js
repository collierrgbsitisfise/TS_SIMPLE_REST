"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const path = require("path");
const link_1 = require("./../models/link");
exports.createEasyLink = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { query, } = url.parse(req.url, true);
        const { link, privateOnly, onceAvailable, } = query;
        // check if this link was't saved in db already
        const findLink = yield link_1.default.findOne({
            link,
            privateOnly,
            onceAvailable,
        });
        if (findLink) {
            res.send(findLink);
            return;
        }
        const shortLink = new link_1.default({
            link,
            privateOnly,
            onceAvailable,
        });
        const result = yield shortLink.save();
        res.send(result);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.getEasyLink = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { query, } = url.parse(req.url, true);
        const { ignorePrivate, } = query;
        const { hash, } = req.params;
        const result = yield link_1.default.findOne({
            shortLinkHash: hash,
        });
        if (!result) {
            res.status(404).send(`invalid hash: ${hash}`);
            return;
        }
        if (result.privateOnly && !ignorePrivate) {
            res.status(404).send('Private Link');
            return;
        }
        if (result.onceAvailable) {
            yield link_1.default.remove({
                /*eslint-disable */
                _id: result._id,
            }).exec();
        }
        res.send(result);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.redirectEasyLinkByHash = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { hash, } = req.params;
        const result = yield link_1.default.findOne({
            shortLinkHash: hash,
        });
        if (!result) {
            res.sendFile(path.join(__dirname, './../templates/invalid-hash.html'));
            return;
        }
        if (result.privateOnly) {
            res.sendFile(path.join(__dirname, './../templates/private-link-redirect.html'));
            return;
        }
        if (result.onceAvailable) {
            yield link_1.default.remove({
                /*eslint-disable */
                _id: result._id,
            }).exec();
        }
        res.redirect(301, result.link);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
//# sourceMappingURL=link.js.map