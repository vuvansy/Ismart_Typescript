import axios, { AxiosResponse } from "axios";

class CartService {
    private collectionName: string;
    private endPoint: string;

    constructor(endPoint: string) {
        this.collectionName = "orders";
        this.endPoint = endPoint;
    }

    findAllCart = async (): Promise<any> => {
        const response: AxiosResponse<any> = await axios.get(
            this.endPoint + this.collectionName
        );
        return response.data;
    };

    insertCart = async (cart: any): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.post(
                this.endPoint + this.collectionName,
                cart
            );
            return response.data;
        } catch (error: any) {
            return error;
        }
    };

    updateCart = async (id: string, updateCart: any): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.put(
                this.endPoint + this.collectionName + "/" + id,
                updateCart
            );
            return response.data;
        } catch (error: any) {
            return error;
        }
    };

    deleteCart = async (id: string): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.delete(
                this.endPoint + this.collectionName + "/" + id
            );
            return response.data;
        } catch (error: any) {
            return error;
        }
    };

    findCartByIdUser = async (userId: string): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                this.endPoint + this.collectionName + "/user" + "/" + userId
            );
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error: any) {
            return error;
        }
    };

    findCartByStatus = async (status: string): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                this.endPoint + this.collectionName + "/status/" + status
            );
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error: any) {
            return error;
        }
    };

    findCartByIdOrder = async (idOrder: string): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                this.endPoint + this.collectionName + "/" + idOrder
            );
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error: any) {
            return error;
        }
    };

    updateOrderStatus = async (
        orderId: string,
        newStatus: string
    ): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.patch(
                `${this.endPoint}${this.collectionName}/${orderId}`,
                { status: newStatus }
            );
            return response.data;
        } catch (error: any) {
            console.error(error);
            throw new Error("Cập nhật trạng thái đơn hàng thất bại");
        }
    };
}

export default CartService;
