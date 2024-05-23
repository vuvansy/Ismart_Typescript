import axios, { AxiosResponse } from "axios";

class CategoryService {
    private collectionName: string;
    private endPoint: string;

    constructor(endPoint: string) {
        this.collectionName = "categories";
        this.endPoint = endPoint;
    }

    findAllCategories = async (): Promise<any> => {
        const response: AxiosResponse<any> = await axios.get(
            this.endPoint + this.collectionName
        );
        return response.data;
    };

    insertCategory = async (category: any): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.post(
                this.endPoint + this.collectionName,
                category
            );
            return response.data;
        } catch (error: any) {
            return error;
        }
    };

    updateCategory = async (id: string, updateCategory: any): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.put(
                this.endPoint + this.collectionName + "/" + id,
                updateCategory
            );
            return response.data;
        } catch (error: any) {
            return error;
        }
    };

    deleteCategory = async (id: string): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.delete(
                this.endPoint + this.collectionName + "/delete" + "/" + id
            );
            return response.data;
        } catch (error: any) {
            return error;
        }
    };

    findCategoryById = async (id: string): Promise<any> => {
        try {
            const response: AxiosResponse<any> = await axios.get(
                this.endPoint + this.collectionName + "/" + id
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
}

export default CategoryService;
