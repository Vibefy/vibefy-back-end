"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidationMiddleware = void 0;
const yup_1 = require("yup");
function schemaValidationMiddleware(schema) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                yield schema.validate(data, { abortEarly: false, stripUnknown: true });
                next();
            }
            catch (err) {
                if (err instanceof yup_1.ValidationError) {
                    const { errors } = err;
                    return res.status(400).json({ message: errors });
                }
            }
        });
    };
}
exports.schemaValidationMiddleware = schemaValidationMiddleware;
