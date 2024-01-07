import axios from "axios";
import config from "../../config/config";

const generateService = async(creq)=>{
    try {
        const result = await axios.post(`${config.smartdrive}/service`, creq);
        return result;
    } catch (error) {
        return await error;
    }
}

const taskList = async(id)=>{
    try {
        const result = await axios.get(`${config.smartdrive}/service/search?seroId=${id}`);
        return result.data;
    } catch (error) {
        return await error.message;
    }
}

const workorderList = async(id)=>{
    try {
        const result = await axios.get(`${config.smartdrive}/service/workorder/task?seotId=${id}`);
        return result.data;
    } catch (error) {
        return await error.message;
    }
}

const findTask = async(id) => {
    try {
        const result = await axios.get(`${config.smartdrive}/service/task/${id}`);
        return result.data;
    } catch (error) {
        return error;
    }
}

const findWorkorder = async(id) => {
    try {
        const result = await axios.get(`${config.smartdrive}/service/workorder/${id}`);
        return result.data;
    } catch (error) {
        return error;
    }
}

const taskUpdate = async(status, id) => {
    try {
        const result = await axios.put(`${config.smartdrive}/service/task/${id}`, status);
        return result;
    } catch (error) {
        return error;
    }
}

const workorderUpdate = async(status, id) => {
    try {
        const result = await axios.put(`${config.smartdrive}/service/workorder/update/${id}`, status);
        return result;
    } catch (error) {
        return error;
    }
}

export default {
    generateService,
    taskList,
    workorderList,
    findTask,
    findWorkorder,
    taskUpdate,
    workorderUpdate
}