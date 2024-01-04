import axios from "axios";
import config from "../config/config";

// endpoint list
const list = async()=>{
    try {
        const result = await axios.get(`${config.smartdrive}/master/category`);
        return result.data;
    } catch (error) {
        return await error.message;
    }
}

const createRow = async(payload)=>{
    try {
        const result = await axios.post(`${config.smartdrive}/master/category`,payload);
        return result;    
    } catch (error) {
        return error;
    }
}

const findRow = async(id)=>{
    try {
        const result = await axios.get(`${config.smartdrive}/master/category/${id}`);
        return  result.data;
    } catch (error) {
        return error;
        
    }
}

const updateRow = async(data, id)=>{
    try {
        const result = await axios.put(`${config.smartdrive}/master/category/${id}`, data);
        return  result;
    } catch (error) {
        return error;
        
    }
}

const deleteRow = async(id)=>{
    try {
        const result = await axios.delete(`${config.smartdrive}/master/category/${id}`);
        return  result;
    } catch (error) {
        return error;
        
    }
}

export default {
    list,
    createRow,
    findRow,
    updateRow,
    deleteRow
}