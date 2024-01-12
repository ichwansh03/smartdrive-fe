import axios from "axios";
// endpoint list
const list = async()=>{
    try {
        const result = await axios.get(`http://localhost:8080/user`);
        return result.data;
    } catch (error) {
        return await error.message;
    }
}

const createRow = async(payload)=>{
    try {
        const result = await axios.post(`http://localhost:8080/user`,payload);
        return result;    
    } catch (error) {
        return error;
    }
}

const findRow = async(id)=>{
    try {
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        return  result.data;
    } catch (error) {
        return error;
        
    }
}

const updateRow = async(data, id)=>{
    try {
        const result = await axios.put(`http://localhost:8080/user/${id}`, data);
        return  result;
    } catch (error) {
        return error;
        
    }
}

const deleteRow = async(id)=>{
    try {
        const result = await axios.delete(`http://localhost:8080/user/${id}`);
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