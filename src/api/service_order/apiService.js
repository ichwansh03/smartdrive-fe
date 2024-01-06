import axios from "axios";
import config from "../../config/config";

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
        const result = await axios.get(`${config.smartdrive}/service/workorder?seotId=${id}`);
        return result.data;
    } catch (error) {
        return await error.message;
    }
}

export default {
    taskList,
    workorderList
}