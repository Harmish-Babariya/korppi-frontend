import api from "./api";


const API_ENDPOINTS = {
    INDUSTRY: "/industry",
    SERVICE: "/service",
    EMAIL: "/email",
    // Add more endpoints as needed
};

const fetchDataIndustry = async () => {
    try {
        const response = await api.post(API_ENDPOINTS.INDUSTRY);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching industry data");
    }
};

const fetchDataService = async () => {
    try {
        const response = await api.get(API_ENDPOINTS.SERVICE);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching service data");
    }
};

export { fetchDataIndustry, fetchDataService };
