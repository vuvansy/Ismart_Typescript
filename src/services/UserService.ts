import axios, { AxiosResponse } from "axios";

class UserService {
    private collectionName: string;
    private endPoint: string;

    constructor(endPoint: string) {
        this.collectionName = "users";
        this.endPoint = endPoint;
    }

    findAllUsers = async (): Promise<any[]> => {
        const response: AxiosResponse = await axios.get(
            this.endPoint + this.collectionName
        );
        return response.data;
    };

    insertUser = async (user: any): Promise<any> => {
        try {
            const response: AxiosResponse = await axios.post(
                this.endPoint + this.collectionName + "/register",
                user
            );
            return response.data;
        } catch (error) {
            return error;
        }
    };

    updateUser = async (id: string, updateCategory: any): Promise<any> => {
        try {
            const response: AxiosResponse = await axios.put(
                `${this.endPoint}${this.collectionName}/${id}`,
                updateCategory
            );
            return response.data;
        } catch (error) {
            return error;
        }
    };

    deleteUser = async (id: string): Promise<any> => {
        try {
            const response: AxiosResponse = await axios.delete(
                `${this.endPoint}${this.collectionName}/${id}`
            );
            return response.data;
        } catch (error) {
            return error;
        }
    };

    findCategoryById = async (id: string): Promise<any> => {
        try {
            const response: AxiosResponse = await axios.get(
                `${this.endPoint}${this.collectionName}/${id}`
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

    findUserByUsernameAndPassword = async (
        username: string,
        password: string
    ): Promise<any> => {
        try {
            const response: AxiosResponse = await axios.post(
                `${this.endPoint}${this.collectionName}/login`,
                { username, password } // Gửi thông tin đăng nhập
            );
            const user: any = response.data;
            return user;
        } catch (error) {
            throw error;
        }
    };
}

export default UserService;
