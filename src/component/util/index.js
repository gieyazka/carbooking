import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
const loginApi = 'http://10.10.10.227:1337/auth/local';
const bookingApi = 'http://10.10.10.227:1337/bookings';
const carApi = 'http://10.10.10.227:1337/cars'
const driverApi = 'http://10.10.10.227:1337/vehicles'
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
    return await axios.post(`${driverApi}`, formdata).then(async res => {
        return await getDrivers().then(data => {
            return data
        })
    })
}

export const getBookingDispatch = async () => {
    return await axios.get(`${bookingApi}?hrApprove=true&managerApprove=true`).then(res => {

        return res.data
    })
}

export const sendEmail = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("form", "Nissan-e-Photo@aapico.com");
    urlencoded.append("formdetail", "Nissan-e-Photo System Notification");
    urlencoded.append("to", "pokkate.e@aapico.com");
    urlencoded.append("cc", "");
    urlencoded.append("bcc", "");
    urlencoded.append("subject", "Nissan-e-Photo IPO Delivery Order Time");
    urlencoded.append("body", "<html><body>\n<b style='color:#00004d;font-size:22px;'>This is an automatic e-mail that you have informed to Nissan e-Photo System</b><br><br>\n\n\n</body></html>");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://ahappl04.aapico.com/Api/email", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}