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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class ProductService {
    constructor(endPoint) {
        this.findAllProduct = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(this.endPoint + this.collectionName);
            return response.data;
        });
        this.insertProduct = (product) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(this.endPoint + this.collectionName, product);
                return response.data;
            }
            catch (error) {
                return error;
            }
        });
        //UPLOADS FILE 1
        this.insertForm = (file) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(this.endPoint + this.collectionName + "/upload", file);
                return response.data;
            }
            catch (error) {
                return error;
            }
        });
        //UPLOADS FILE ALL
        this.insertFormAll = (files) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(this.endPoint + this.collectionName + "/uploadAll", files);
                return response.data;
            }
            catch (error) {
                return error;
            }
        });
        this.updateProduct = (id, updateProduct) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.put(this.endPoint + this.collectionName + "/" + id, updateProduct);
                return response.data;
            }
            catch (error) {
                return error;
            }
        });
        this.deleteProduct = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.delete(this.endPoint + this.collectionName + "/delete" + "/" + id);
                return response.data;
            }
            catch (error) {
                return error;
            }
        });
        this.findProductById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(this.endPoint + this.collectionName + "/" + id);
                if (response.status === 200) {
                    return response.data;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                return error;
            }
        });
        this.findProductsByCategory = (categoryId = "65ef17cecce6ab14801fd9b7") => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(this.endPoint +
                    this.collectionName +
                    "/categories" +
                    "/" +
                    categoryId);
                return response.data;
            }
            catch (error) {
                return error;
            }
        });
        this.collectionName = "products";
        this.endPoint = endPoint;
    }
}
exports.default = ProductService;
