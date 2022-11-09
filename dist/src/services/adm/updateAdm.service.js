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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admUpdateService = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const adm_entity_1 = __importDefault(require("../../entities/adm.entity"));
const appError_1 = require("../../error/appError");
const data_source_1 = require("../../data-source");
const admUpdateService = ({ id, name, email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const admRepository = data_source_1.AppDataSource.getRepository(adm_entity_1.default);
    const findAdm = yield admRepository.findOneBy({ id });
    if (name == undefined && email == undefined && password == undefined) {
        throw new appError_1.AppError(400, "Required fields not filled");
    }
    admRepository.update(findAdm, {
        name: name ? name : findAdm.name,
        email: email ? email : findAdm.email,
        password: password ? yield bcrypt.hash(password, 10) : findAdm.password,
    });
    return true;
});
exports.admUpdateService = admUpdateService;
