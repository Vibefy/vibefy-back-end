"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admUpdate = exports.admCreate = void 0;
const yup = __importStar(require("yup"));
exports.admCreate = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    admHash: yup.string().required(),
    avatar_img: yup.string().notRequired(),
});
exports.admUpdate = yup.object().shape({
    email: yup
        .string()
        .email()
        .when(["name", "password"], {
        is: (name, password) => {
            if (name || password) {
                return true;
            }
            else {
                return false;
            }
        },
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.required(),
    }),
    name: yup.string().when(["email", "password"], {
        is: (email, password) => {
            if (email || password) {
                return true;
            }
            else {
                return false;
            }
        },
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.required(),
    }),
    password: yup.string().when(["email", "name"], {
        is: (email, name) => {
            if (email || name) {
                return true;
            }
            else {
                return false;
            }
        },
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.required(),
    }),
}, [
    ["name", "password"],
    ["email", "password"],
    ["email", "name"],
]);
