import axios, { AxiosResponse } from "axios";

class OrderDetailService {
    private collectionName: string;
    private endPoint: string;

    constructor(endPoint: string) {
        this.collectionName = "orderDetails";
        this.endPoint = endPoint;
    }

    findAllOrderDetail = async (): Promise<any> => {
        const response: AxiosResponse<any> = await axios.get(
            this.endPoint + this.collectionName
        );
        return response.data;
    };

    insertOrderDetail = async (cart: any): Promise<any> => {
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

    updateOrderDetail = async (id: string, updateCart: any): Promise<any> => {
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

    deleteOrderDetail = async (id: string): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.delete(
                this.endPoint + this.collectionName + "/" + id
            );
            return response.data;
        } catch (error: any) {
            return error;
        }
    };

    findOderDetailByIdOrder = async (orderId: string): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                this.endPoint + this.collectionName + "/order" + "/" + orderId
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

    // findCartByIdOrder = async (idOrder: string): Promise<any> => {
    //     try {
    //         const response: AxiosResponse<any> = await axios.get(
    //             `${this.endPoint}${this.collectionName}?id=${idOrder}`
    //         );
    //         if (response.status === 200) {
    //             return response.data;
    //         } else {
    //             return null;
    //         }
    //     } catch (error: any) {
    //         return error;
    //     }
    // };

    // updateOrderStatus = async (
    //     orderId: string,
    //     newStatus: string
    // ): Promise<any> => {
    //     try {
    //         const response: AxiosResponse<any> = await axios.patch(
    //             `${this.endPoint}${this.collectionName}/${orderId}`,
    //             { status: newStatus }
    //         );
    //         return response.data;
    //     } catch (error: any) {
    //         console.error(error);
    //         throw new Error("Cập nhật trạng thái đơn hàng thất bại");
    //     }
    // };
}

export default OrderDetailService;
