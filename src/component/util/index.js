import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import Swal from 'sweetalert2';

const loginApi = 'http://10.10.10.227:1337/auth/local';
const bookingApi = 'http://10.10.10.227:1337/bookings';
const carApi = 'http://10.10.10.227:1337/cars'
const driverApi = 'http://10.10.10.227:1337/vehicles'
const tripApi = 'http://10.10.10.227:1337/requests'
const employeeApi = 'http://10.10.10.227:1337/users'

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
export const getTrips = async () => {
    return await axios.get(`${tripApi}?status_ne=finish`).then(res => {
        // console.log(res);
        return _.sortBy(res.data, [function (o) { return o.id; }]);
    })
}
export const addTrips = async (data, bookingId) => {
    console.log(data, bookingId);
    return await axios.post(`${tripApi}`, data).then(async res => {
        await axios.put(`${bookingApi}/${bookingId}`, { dispatch: true })

        return await axios.get(`${tripApi}?status_ne=finish`).then(res => {
            // console.log(res);

            return _.sortBy(res.data, [function (o) { return o.id; }]);
        })

    })
}
export const getBooking = async () => {
    return await axios.get(`${bookingApi}`).then(res => {
        return res.data
    })
}
export const getCars = async () => {
    return await axios.get(`${carApi}?active=true`).then(res => {
        // console.log(res);
        return _.sortBy(res.data, [function (o) { return o.id; }]);
    })
}
export const addCars = async (carData) => {
    // console.log(carData);
    const bodyFormData = new FormData();
    let formdata = new FormData()
    formdata.append("files.picture", carData.imgname)
    formdata.append("data", JSON.stringify({
        plateNo: carData.plateNo,
        province: carData.province,
        model: carData.model,
        type: carData.type,
        mileage: carData.mileage,
        status: 'free'
    }))
    return await axios.post(`${carApi}`, formdata).then(async res => {
        return await getCars().then(data => {
            return data
        })
    })
}
export const editCars = async (carData) => {
    // console.log(carData.id);

    let formdata = new FormData()
    formdata.append("files.picture", carData.imgname)
    formdata.append("data", JSON.stringify({
        plateNo: carData.plateNo,
        province: carData.province,
        model: carData.model,
        type: carData.type,
        mileage: carData.mileage,
        // status: 'free'
    }))
    return await axios.put(`${carApi}/${carData.id}`, formdata).then(async res => {
        return await getCars().then(data => {
            return data
        })

    })
}
export const removeCars = async (carData) => {


    let formdata = new FormData()
    // formdata.append("files.picture", carData.imgname)
    formdata.append("data", JSON.stringify({
        // plateNo: carData.plateNo,
        // province: carData.province,
        // model: carData.model,
        // type: carData.type,
        // mileage: carData.mileage,
        // status: 'free'
        active: false
    }))
    return await axios.put(`${carApi}/${carData.id}`, formdata).then(async res => {
        return await getCars().then(data => {
            return data
        })

    })
}
export const getDrivers = async () => {
    return await axios.get(`${driverApi}?active=true`).then(res => {
        // console.log(res);
        return _.sortBy(res.data, [function (o) { return o.id; }]);
    })
}

export const editDriver = async (d) => {
    let formdata = new FormData()
    formdata.append("files.picture", d.imgname)
    formdata.append("data", JSON.stringify({
        name: d.name,
        lastname: d.lastname,
        emp_id: d.emp_id,
        tel: d.tel,
    }))
    return await axios.put(`${driverApi}/${d.id}`, formdata).then(async res => {
        return await getDrivers().then(data => data)

    })
}
export const removeDriver = async (d) => {
    let formdata = new FormData()
    // formdata.append("files.picture", d.imgname)
    formdata.append("data", JSON.stringify({
        // name: d.name,
        // lastname: d.lastname,
        // emp_id: d.emp_id,
        // tel: d.tel,
        active: false
    }))
    return await axios.put(`${driverApi}/${d.id}`, formdata).then(async res => {
        return await getDrivers().then(data => data)

    })
}

export const addDrivers = async (d) => {
    // console.log(d);
    let formdata = new FormData()
    formdata.append("files.picture", d.imgname)
    formdata.append("data", JSON.stringify({
        name: d.name,
        lastname: d.lastname,
        status: 'free',
        emp_id: d.emp_id,
        tel: d.tel,

        // username: d.username
    }))
    // console.log(d.emp_id);
    let idEmployee = null, oldRole
    await axios.get(`${employeeApi}?_limit=-1`).then(async res => {
        // console.log(res.data);

        for (const data of res.data) {
            // console.log(data.emp_id);
            if (d.emp_id == data.empID) {
                // console.log(data);
                idEmployee = data.id

                // console.log(data.custom_role);
                oldRole = {
                    ...data.custom_role,
                    car_role: 'driver'
                }
                break;
            }
        }


    })
    if (idEmployee == null) {
        Swal.fire({

            icon: 'warning',
            title: 'รหัสพนักงานไม่ถูกต้อง',
            showConfirmButton: false,
            timer: 1500
        })
        let failed = 'fail'
        return await getDrivers().then(data => ({ driver: data, status: failed }))
    }

    await axios.put(`${employeeApi}/${idEmployee}`, {
        custom_role: { ...oldRole }
    })
    return await axios.post(`${driverApi}`, formdata).then(async res => {
        return await getDrivers().then(data => {
            Swal.fire({
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ',
                showConfirmButton: false,
                timer: 1500
            })
            return data
        })
    })
}

export const getBookingDispatch = async () => {
    return await axios.get(`${bookingApi}?hrApprove=true&managerApprove=true&dispatch=false`).then(res => {

        return res.data
    })
}
// export const getBookingDispatch = async () => {

//     return await axios.get(`${bookingApi}?hrApprove=true&managerApprove=true`).then(res => {

//         return res.data
//     })
// }

export const sendEmail = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("form", "pokkate.e@aapico.com");
    urlencoded.append("formdetail", "Please approve car bookoing request");
    urlencoded.append("to", "pokkate.e@aapico.com");
    urlencoded.append("cc", "");
    urlencoded.append("bcc", "");
    urlencoded.append("subject", "Carbooking request ทดสอบ");
    urlencoded.append("body", "<html><body><b style='color:#00004d;font-size:22px;'>This is an automatic e-mail that you have informed to Nissan e-Photo System</b><br><br></body></html>");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    axios({ method: 'post', url: "http://ahappl04.aapico.com/Api/email", data: urlencoded, headers: myHeaders })
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
}