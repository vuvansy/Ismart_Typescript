import axios, { AxiosResponse } from "axios";

class ProductService {
    private collectionName: string;
    private endPoint: string;

    constructor(endPoint: string) {
        this.collectionName = "products";
        this.endPoint = endPoint;
    }

    findAllProduct = async (): Promise<any> => {
        const response: AxiosResponse<any> = await axios.get(
            this.endPoint + this.collectionName
        );
        return response.data;
    };

    insertProduct = async (product: any): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.post(
                this.endPoint + this.collectionName,
                product
            );
            return response.data;
        } catch (error) {
            return error;
        }
    };

    //UPLOADS FILE 1
    insertForm = async (file: any): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.post(
                this.endPoint + this.collectionName + "/upload",
                file
            );
            return response.data;
        } catch (error) {
            return error;
        }
    };

    //UPLOADS FILE ALL
    insertFormAll = async (files: any): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.post(
                this.endPoint + this.collectionName + "/uploadAll",
                files
            );
            return response.data;
        } catch (error) {
            return error;
        }
    };

    updateProduct = async (id: string, updateProduct: any): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.put(
                this.endPoint + this.collectionName + "/" + id,
                updateProduct
            );
            return response.data;
        } catch (error) {
            return error;
        }
    };

    deleteProduct = async (id: string): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.delete(
                this.endPoint + this.collectionName + "/delete" + "/" + id
            );
            return response.data;
        } catch (error) {
            return error;
        }
    };

    findProductById = async (id: string): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                this.endPoint + this.collectionName + "/" + id
            );
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            return error;
        }
    };

    findProductsByCategory = async (
        categoryId = "65ef17cecce6ab14801fd9b7"
    ): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                this.endPoint +
                    this.collectionName +
                    "/categories" +
                    "/" +
                    categoryId
            );
            return response.data;
        } catch (error) {
            return error;
        }
    };
}

export default ProductService;
