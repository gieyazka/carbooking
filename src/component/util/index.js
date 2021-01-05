import axios from 'axios';
import moment from 'moment';

const loginApi = 'http://10.10.10.227:1337/auth/local';
const bookingApi = 'http://10.10.10.227:1337/bookings';
export const loginCheck = async (identifier, password) => {
    // console.log(identifier, password)
    return await axios.post(`${loginApi}`, {
        identifier,
        password
    }).then(res => {
// console.log(res)
        return res;
    }).catch(err => { return { err: err } });
}
export const handleHrApprove = async (id, status) => {
    console.log(id, status);
    if (status == false) {
        return await axios.put(`${bookingApi}/${id}`, {
            hrApprove: false
        })
    } else {
        return await axios.put(`${bookingApi}/${id}`, {
            hrApprove: true
        })
    }

}

export const saveBooking = async (formData) => {
    console.log((formData));
    const loginData = JSON.parse(sessionStorage.getItem('user'));
    return await axios.post(`${bookingApi}`, {
        user: loginData.username,
        name: formData.fullname,
        department: formData.department,
        company: formData.company,
        mobile: formData.mobile_phone,
        tel: formData.company_phone,
        date: moment(formData.date).format('DD-MM-yyyy'),
        startTime: moment(formData.time[0]).format('h:mm'),
        endTime: moment(formData.time[1]).format('h:mm'),
        carType: formData.car_type,
        totalPassenger: formData.amout,
        destination: formData.place,
        destProvince: formData.province,
        needDriver: formData.driver,
        reason: formData.purpos,
        managerEmail: formData.manager_email,
        comment: formData.comment || null


    })
}

export const getBooking = async () => {
    return await axios.get(`${bookingApi}`).then(res => {
        return res.data
    })
}