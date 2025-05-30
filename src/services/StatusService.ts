import { CustomError } from "../middlewares/CustomError";

export const getServerStatus = () => {
    if (Math.random() < 0.5) {
        throw new CustomError('Random error occured!', 500);
    }

    return {
        status: 'OK',
        uptime: process.uptime(),
    };
};