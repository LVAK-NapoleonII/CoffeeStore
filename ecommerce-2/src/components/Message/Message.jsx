import { message } from "antd";

const success = (mes='Thành công') =>{
    message.success(mes);
}

const error = (mes='Thất bại rồi T.T') =>{
    message.error(mes);
}

const warning = (mes='Cảnh báo nha má!!!') =>{
    message.warning (mes);
}
export {success, error, warning}