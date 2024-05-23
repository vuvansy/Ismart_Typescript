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
class CartService {
    constructor(endPoint) {
        this.findAllCart = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(this.endPoint + this.collectionName);
            return response.data;
        });
        this.insertCart = (cart) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(this.endPoint + this.collectionName, cart);
                return response.data;
            }
            catch (error) {
                return error;
            }
        });
        this.updateCart = (id, updateCart) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.put(this.endPoint + this.collectionName + "/" + id, updateCart);
                return response.data;
            }
            catch (error) {
                return error;
            }
        });
        this.deleteCart = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.delete(this.endPoint + this.collectionName + "/" + id);
                return response.data;
            }
            catch (error) {
                return error;
            }
        });
        this.findCartByIdUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.endPoint}${this.collectionName}?userId=${userId}`);
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
        this.findCartByIdOrder = (idOrder) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${this.endPoint}${this.collectionName}?id=${idOrder}`);
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
        this.updateOrderStatus = (orderId, newStatus) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.patch(`${this.endPoint}${this.collectionName}/${orderId}`, { status: newStatus });
                return response.data;
            }
            catch (error) {
                console.error(error);
                throw new Error("Cập nhật trạng thái đơn hàng thất bại");
            }
        });
        this.collectionName = "orders";
        this.endPoint = endPoint;
    }
}
exports.default = CartService;
