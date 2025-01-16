"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const express_1 = require("express");
const ImageUploadController_1 = require("../Controllers/ImageUploadController");
exports.uploadRouter = (0, express_1.Router)();
exports.uploadRouter.post("/image", ImageUploadController_1.uploadImage);
