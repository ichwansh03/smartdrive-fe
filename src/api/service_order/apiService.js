import axios from "axios";
import config from "../../config/config";

const taskList = async()=>{
    try {
        const result = await axios.get(`${config.smartdrive}/service/search?seroId=FS0001-20231219`);
        return result.data;
    } catch (error) {
        return await error.message;
    }
}

export default {
    taskList
}