import axios from "axios";
import moment from "moment";
import _ from "lodash";
import Swal from "sweetalert2";
import io from "socket.io-client";

import { Redirect, useHistory, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const loginApi = "https://ess.aapico.com/auth/local";
const bookingApi = "https://ess.aapico.com/bookings";
const carApi = "https://ess.aapico.com/cars";
const driverApi = "https://ess.aapico.com/vehicles";
const tripApi = "https://ess.aapico.com/requests";
const employeeApi = "https://ess.aapico.com/users";
const subscribersApi = "https://ess.aapico.com/subscribers";
const socket = io("https://ess.aapico.com");
export const loginCheck = async (identifier, password) => {
  // console.log(identifier, password)
  return await axios
    .post(`${loginApi}`, {
      identifier: identifier.toUpperCase(),
      password,
    })
    .then((res) => {
      // console.log(res)
      return res;
    })
    .catch((err) => {
      return { err: err };
    });
};
export const handleHrApprove = async (id, status) => {
  // console.log(id, status);
  if (status == false) {
    return await axios
      .put(`${bookingApi}/${id}`, {
        hrApprove: false,
      })
      .then((res) => res);
  } else {
    return await axios
      .put(`${bookingApi}/${id}`, {
        hrApprove: true,
      })
      .then((res) => res);
  }
};
export const checkBookingById = async (id) => {
  return await axios.get(`${bookingApi}?id=${id}`).then((res) => {
    //   console.log(res);
    return res;
  });
};
export const updateManangerStatus = async (id) => {
  return await axios
    .put(`${bookingApi}/${id}`, {
      managerApprove: true,
    })
    .then((res) => {
      //   console.log(res);
      return res;
    })
    .catch((err) => err);
};
export const rejectManangerStatus = async (id) => {
  return await axios
    .put(`${bookingApi}/${id}`, {
      managerApprove: false,
    })
    .then((res) => {
      //   console.log(res);
      return res;
    })
    .catch((err) => err);
};

export const saveBooking = async (formData) => {
  // console.log((formData));
  const loginData = JSON.parse(sessionStorage.getItem("user"));

  await axios
    .post(`${bookingApi}`, {
      emp_id: formData.emp_id,
      user: loginData.username,
      name: formData.fullname,
      department: formData.department,
      company: formData.company,
      mobile: formData.mobile_phone,
      tel: formData.company_phone,
      date: moment(formData.date).format("YYYYMMDD"),
      startTime: moment(formData.time[0]).format("HH:mm"),
      endTime: moment(formData.time[1]).format("HH:mm"),
      carType: formData.car_type,
      totalPassenger: formData.amout,
      destination: formData.place,
      destProvince: formData.province,
      needDriver: formData.driver,
      reason: formData.purpos,
      managerEmail: formData.manager_email,
      comment: formData.comment || null,
      uuid: uuidv4(),
    })
    .then(async (res) => {
      await sendEmail(res);
    });
};
export const editTrips = async (d, Mileage) => {
  // console.log(d.id, Mileage);
  if (d.status == "free") {
    return await axios
      .put(`${tripApi}/${d.id}`, {
        startMileage: Mileage,
        status: "trip",
      })
      .then(async () => {
        return await getAllTrips();
      });
  } else {
    return await axios
      .put(`${tripApi}/${d.id}`, {
        stopMileage: Mileage,
        status: "finish",
      })
      .then(async () => {
        return await axios
          .put(`${carApi}/${d.car.id}`, {
            mileage: Mileage,
          })
          .then(async () => {
            return await getAllTrips();
          });
      });
  }
};
export const getTrips = async () => {
  return await axios
    .get(`${tripApi}?status_ne=finish&status_ne=off`)
    .then((res) => {
      // console.log(res);
      return _.sortBy(res.data, [
        function (o) {
          return o.id;
        },
      ]);
    });
};
export const getTripsSinceDate = async (date) => {
  return await axios
    .get(`${tripApi}?date=${date}&status_ne=off`)
    // .get(`${tripApi}?date_gte=${date}&status_ne=off`)
    .then((res) => {
      return _.sortBy(res.data, [
        function (o) {
          return o.id;
        },
      ]);
    });
};
export const getTripsBybooking = async (bookingId) => {
  return await axios
    .get(`${tripApi}?bookings=${bookingId}&status_ne=off`)
    .then((res) => {
      console.log(res);
      return _.sortBy(res.data, [
        function (o) {
          return o.id;
        },
      ]);
    });
};
export const getAllTrips = async () => {
  return await axios.get(`${tripApi}?status_ne=off`).then((res) => {
    // console.log(res);
    return _.sortBy(res.data, [
      function (o) {
        return o.date;
      },
    ]);
  });
};
export const checkTrips = async (date, carId) => {
  return await axios
    .get(`${tripApi}?date=${date}&car=${carId}&status_ne=finish&status_ne=off`)
    .then((res) => {
      return res.data;
    });
};
export const checkDriver = async (date, driverId) => {
  return await axios
    .get(
      `${tripApi}?date=${date}&driver=${driverId}&status_ne=finish&status_ne=off`
    )
    .then((res) => {
      return res.data;
    });
};

export const addOldTrip = async (bookingId, tripData, bookId) => {
  await getTripsBybooking(bookId).then(async (res) => {
    console.log(res);
    let newBookId = [];
    if (res[0]) {
      for (const d of res[0].bookings) {
        if (bookId != d.id) {
          console.log(d);
          newBookId.push(d.id);
        }
      }
      console.log(res[0].status);
      if (!newBookId[0]) {
        await axios.put(`${tripApi}/${res[0].id}`, {
          bookings: newBookId,
          status: "off",
        });
      } else {
        await axios.put(`${tripApi}/${res[0].id}`, { bookings: newBookId });
        // await axios.put(`${tripApi}/${res[0].id}`, { bookings: newBookId, status: res[0].status })
      }
    } // update source trup
    await axios
      .put(`${tripApi}/${tripData.id}`, {
        bookings: bookingId,
      })
      .then(async () => {
        console.log(bookId, tripData);

        await axios.put(`${bookingApi}/${bookId}`, {
          dispatch: true,
          car: tripData.car.id,
          status: tripData.status || "free",
        });
        socket.emit("dispatch", tripData);
        await sendFirebaseNotification(tripData.driver.emp_id);
      });
  });
};
export const editBookingStatus = async (d, status, tripId) => {
  return await axios
    .put(`${bookingApi}/${d.id}`, { status: status })
    .then((r) => {
      return [r.data];
    });
  // console.log(d);
};
export const addNewTrip = async (insertData, bookingData) => {
  console.log(insertData, bookingData);
  await axios
    .post(`${tripApi}`, {
      user: insertData.user,
      status: "free",
      car: insertData.car,
      driver: insertData.driver,
      date: insertData.date,
      bookings: insertData.bookings,
    })
    .catch((err) => console.log(err));
  await axios.put(`${bookingApi}/${insertData.bookings}`, {
    dispatch: true,
    car: insertData.car,
  });
  if (insertData.driver) {
    await getDriversByid(insertData.driver).then(async (res) => {
      const tripData = await getTripsBybooking(insertData.bookings);
      socket.emit("dispatch", tripData[0]);
      await sendFirebaseNotification(res.data.emp_id);
    });
  }

  return await axios
    .get(`${tripApi}?status_ne=finish&status_ne=off`)
    .then((res) => {
      // console.log(res);

      return _.sortBy(res.data, [
        function (o) {
          return o.id;
        },
      ]);
    });
};
export const addTrips = async (data, bookingId) => {
  // console.log(data, bookingId);
  await axios.post(`${tripApi}`, {
    status: "free",
    car: data.car,
    driver: data.driver,
    date: data.date,
    bookings: bookingId,
  });
  for (const id of bookingId) {
    console.log(id);
    await axios
      .put(`${bookingApi}/${id}`, { dispatch: true })
      .then(async () => {
        if (data.driver) {
          await getDriversByid(data.driver).then(async (res) => {
            const tripData = await getTripsBybooking(id);
            socket.emit("dispatch", tripData[0]);
            await sendFirebaseNotification(res.data.emp_id);
          });
        }
      });
  }

  return await axios
    .get(`${tripApi}?status_ne=finish&status_ne=off`)
    .then((res) => {
      // console.log(res);

      return _.sortBy(res.data, [
        function (o) {
          return o.id;
        },
      ]);
    });
};
export const getBooking = async () => {
  return await axios.get(`${bookingApi}`).then((res) => {
    return res.data;
  });
};
export const getBookingHr = async () => {
  return await axios
    .get(`${bookingApi}?hrApprove_null=true&managerApprove=true`)
    .then((res) => {
      return res.data;
    });
};
export const getCars = async () => {
  return await axios.get(`${carApi}?active=true`).then((res) => {
    // console.log(res);
    return _.sortBy(res.data, [
      function (o) {
        return o.id;
      },
    ]);
  });
};
export const getCarbyPlate = async (plate) => {
  return await axios.get(`${carApi}?plateNo=${plate}`).then((res) => {
    console.log(res.data[0]);
    return res.data[0];
  });
};
export const addCars = async (carData) => {
  // console.log(carData);
  return await getCarbyPlate(carData.plateNo).then(async (res) => {
    let newCarsImg = new File([carData.imgname], "Cars", {
      type: carData.imgname.type,
      lastModified: carData.imgname.lastModified,
    });

    if (res) {
      let formdata = new FormData();
      formdata.append("files.picture", newCarsImg);
      formdata.append(
        "data",
        JSON.stringify({
          active: true,
          province: carData.province,
          model: carData.model,
          type: carData.type,
          mileage: carData.mileage,
          status: "free",
        })
      );
      await axios.put(`${carApi}/${res.id}`, formdata);
    } else {
      let formdata = new FormData();
      formdata.append("files.picture", newCarsImg);
      formdata.append(
        "data",
        JSON.stringify({
          plateNo: carData.plateNo,
          province: carData.province,
          model: carData.model,
          type: carData.type,
          mileage: carData.mileage,
          status: "free",
        })
      );
      await axios.post(`${carApi}`, formdata);
    }
    return await getCars().then((data) => {
      return data;
    });
  });
};
export const editCars = async (carData) => {
  console.log(carData);
  let formdata = new FormData();

  if (carData.imgname) {
    let newCarsImg = new File([carData.imgname], "Cars", {
      type: carData.imgname.type,
      lastModified: carData.imgname.lastModified,
    });
    formdata.append("files.picture", newCarsImg);
  }

  formdata.append(
    "data",
    JSON.stringify({
      plateNo: carData.plateNo,
      province: carData.province,
      model: carData.model,
      type: carData.type,
      mileage: carData.mileage,
      // status: 'free'
    })
  );
  return await axios
    .put(`${carApi}/${carData.id}`, formdata)
    .then(async (res) => {
      return await getCars().then((data) => {
        return data;
      });
    });
};
export const removeCars = async (carData) => {
  let formdata = new FormData();
  // formdata.append("files.picture", carData.imgname)
  formdata.append(
    "data",
    JSON.stringify({
      // plateNo: carData.plateNo,
      // province: carData.province,
      // model: carData.model,
      // type: carData.type,
      // mileage: carData.mileage,
      // status: 'free'
      active: false,
    })
  );
  return await axios
    .put(`${carApi}/${carData.id}`, formdata)
    .then(async (res) => {
      return await getCars().then((data) => {
        return data;
      });
    });
};
export const getDrivers = async () => {
  return await axios.get(`${driverApi}?active=true`).then((res) => {
    // console.log(res);
    return _.sortBy(res.data, [
      function (o) {
        return o.id;
      },
    ]);
  });
};
export const getDriversByid = async (id) => {
  return await axios.get(`${driverApi}/${id}`).then((res) => {
    return res;
  });
};

export const editDriver = async (d) => {
  console.log(d);
  let newDriverImg;
  let formdata = new FormData();

  if (d.imgname) {
    newDriverImg = new File([d.imgname], "Cars", {
      type: d.imgname.type,
      lastModified: d.imgname.lastModified,
    });
    formdata.append("files.picture", newDriverImg);
  }

  // formdata.append("files.picture", newDriverImg)
  formdata.append(
    "data",
    JSON.stringify({
      name: d.name,
      lastname: d.lastname,
      emp_id: d.emp_id,
      tel: d.tel,
    })
  );
  return await axios.put(`${driverApi}/${d.id}`, formdata).then(async (res) => {
    return await getDrivers().then((data) => data);
  });
};
export const removeDriver = async (d) => {
  let formdata = new FormData();
  // formdata.append("files.picture", d.imgname)
  formdata.append(
    "data",
    JSON.stringify({
      // name: d.name,
      // lastname: d.lastname,
      // emp_id: d.emp_id,
      // tel: d.tel,
      active: false,
    })
  );
  return await axios.put(`${driverApi}/${d.id}`, formdata).then(async (res) => {
    return await getDrivers().then((data) => data);
  });
};
export const getEmployeeById = async (id) => {
  return await axios
    .get(`https://ess.aapico.com/employees?emp_id=${id}`)
    .then(async (res) => {
      return res.data[0];
    })
    .catch((err) => err);
};
export const addDrivers = async (d) => {
  // console.log(d);
  let newDriverImg = new File([d.imgname], "Drivers", {
    type: d.imgname.type,
    lastModified: d.imgname.lastModified,
  });
  let formdata = new FormData();
  formdata.append("files.picture", newDriverImg);

  // console.log(d.emp_id);
  let idEmployee = null,
    oldRole;
  await axios.get(`${employeeApi}?empID=${d.emp_id}`).then(async (res) => {
    // console.log(res.data);
    if (res.data[0]) {
      idEmployee = res.data[0].id;

      // console.log(data.custom_role);
      oldRole = {
        ...res.data[0].custom_role,
        car_role: "driver",
      };
    }
  });
  // console.log(oldRole);
  if (idEmployee == null) {
    Swal.fire({
      icon: "warning",
      title: "รหัสพนักงานไม่ถูกต้อง",
      showConfirmButton: false,
      timer: 1500,
    });
    let failed = "fail";
    return await getDrivers().then((data) => ({
      driver: data,
      status: failed,
    }));
  }

  await axios.put(`${employeeApi}/${idEmployee}`, {
    custom_role: { ...oldRole },
  });

  // return await axios.post(`${driverApi}`, formdata).then(async res => {
  //     return await getDrivers().then(data => {
  //         Swal.fire({
  //             icon: 'success',
  //             title: 'บันทึกข้อมูลสำเร็จ',
  //             showConfirmButton: false,
  //             timer: 1500
  //         })
  //         return data
  //     })
  // })
  return await getDriverbyempId(d.emp_id).then(async (res) => {
    if (res) {
      formdata.append(
        "data",
        JSON.stringify({
          active: true,
          name: d.name,
          lastname: d.lastname,
          status: "free",
          emp_id: d.emp_id,
          tel: d.tel,
          // username: d.username
        })
      );
      await axios.put(`${driverApi}/${res.id}`, formdata);
    } else {
      formdata.append(
        "data",
        JSON.stringify({
          name: d.name,
          lastname: d.lastname,
          status: "free",
          emp_id: d.emp_id,
          tel: d.tel,

          // username: d.username
        })
      );
      await axios.post(`${driverApi}`, formdata);
    }
    return await getDrivers().then((data) => {
      return data;
    });
  });
};
export const getDriverbyempId = async (id) => {
  return await axios.get(`${driverApi}?emp_id=${id}`).then((res) => {
    // console.log(res.data[0]);
    return res.data[0];
  });
};
export const getBookingDispatch = async () => {
  return await axios
    .get(`${bookingApi}?hrApprove=true&managerApprove=true&dispatch=false`)
    .then((res) => {
      return _.sortBy(res.data, [
        function (o) {
          return o.date;
        },
      ]);
    });
};
export const getBookingDispatched = async () => {
  return await axios
    .get(
      `${bookingApi}?hrApprove=true&managerApprove=true&dispatch=true&status_ne=finish`
    )
    .then((res) => {
      return _.sortBy(res.data, [
        function (o) {
          return o.date;
        },
      ]);
    });
};
export const getBookingAllStatus = async () => {
  return await axios
    .get(`${bookingApi}?hrApprove=true&managerApprove=true&dispatch=true`)
    .then((res) => {
      return _.sortBy(res.data, [
        function (o) {
          return o.date;
        },
      ]);
    });
};
export const getBookingStatus = async (id) => {
  return await axios.get(`${bookingApi}?emp_id=${id}`).then((res) => {
    return res.data;
  });
};
// export const getBookingDispatch = async () => {

//     return await axios.get(`${bookingApi}?hrApprove=true&managerApprove=true`).then(res => {

//         return res.data
//     })
// }

export const getDepartment = (e) => {
  var headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("company", e);
  urlencoded.append("documenttype", "IT-Requisition");

  var requestOptions = {
    method: "POST",
    headers: headers,
    body: urlencoded,
    redirect: "follow",
  };

  return fetch("https://ess.aapico.com/flow/department", requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
};

export const getManagerEmail = (company, department) => {
  // console.log(company, department);
  var headers = new Headers();

  headers.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("company", company);
  urlencoded.append("documenttype", "IT-Requisition");
  urlencoded.append("department", department);

  var requestOptions = {
    method: "POST",
    headers: headers,
    body: urlencoded,
    redirect: "follow",
  };

  return fetch("https://ess.aapico.com/flow/master", requestOptions)
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((result) => {
      // console.log(result);
      return result;
    })
    .catch((error) => console.log("error", error));
};

export const sendEmail = async (booking) => {
  // console.log(booking.data);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  const path = window.location.origin;
  var urlencoded = new URLSearchParams();
  urlencoded.append("form", "CarBookingSystem@aapico.com");
  urlencoded.append("formdetail", "Carbooking System");
  urlencoded.append("to", booking.data.managerEmail);
  urlencoded.append("cc", "");
  urlencoded.append("bcc ", "");
  urlencoded.append("subject", "Carbooking request");
  urlencoded.append(
    "body",
    `<html>
        <link
        href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
        rel="stylesheet">   
      <body >
      <table align="center" border="1" cellpadding="0" cellspacing="0" width="600" style="style='border-collapse: collapse;">
      <tr>
          <td style="   
                     background : #1D366D   ;
                     padding : 40px;
                     font-size : 3em ;
                     text-align :center ;
                     color : #FFF
                     ">
              <p style="font-family : Bai Jamjuree ;margin: 0;">Car Booking System </p>
          </td>
      </tr>
      <tr style='text-align : center ;  '>
          <td style="   
                     background : #FFF   ;
                     padding : 20px;
                     text-align :center ;
                     color : #121212
                     ">
              <p style="font-family: Arial ;margin: 0 0 16 0;font-size : 2em;">ข้อมูลการจองรถ</p>
            <table align="center" border="1" cellpadding="0" cellspacing="0" width="400" style='font-family : Bai Jamjuree ;font-size : 16px ;'> 
              <tr> 
                <td style='padding : 4px 0px ; text-align :center ;'>ชื่อ </td>
                  <td style='padding : 4px 0px ; text-align :center ;'>${
                    booking.data.name
                  } </td>
              </tr>
               <tr> 
                <td style='padding : 4px 0px ; text-align :center ;'>วันที่ </td>
                  <td style='padding : 4px 0px ; text-align :center ;'>${
                    booking.data.date
                  }  ${booking.data.startTime} -
                  ${booking.data.endTime} </td>
              </tr>
               <tr> 
                <td style='padding : 4px 0px ; text-align :center ;'>สถานที่ไป </td>
                  <td style='padding : 4px 0px ;  text-align :center ;'>${
                    JSON.parse(booking.data.destination) + " "
                  } ${JSON.parse(booking.data.destProvince) + " "} </td>
              </tr>
               <tr> 
                <td style='padding : 4px 0px ; text-align :center ;'>เหตุผล </td>
                  <td style='padding : 4px 0px ; text-align :center ;'>${
                    booking.data.reason
                  } </td>
              </tr>
               <tr> 
                <td style='padding : 4px 0px ; text-align :center ;'>รายละเอียดอื่น ๆ </td>
                  <td style='padding : 4px 0px ; text-align :center ;'>${
                    booking.data.comment || "-"
                  } </td>
              </tr>
        </table>
        <br>
        <table align='center' width="100%" border="0" cellspacing="0" cellpadding="0" >
        <tr style='margin-top : 8px ;'>
          <td >
            <table align='center' border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td span='2' align="center" style="border-radius: 8px;" bgcolor="">
            <!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${path}/carbooking/#/approve/${
      booking.data.id
    }/${
      booking.data.uuid
    }/reject" style="height:40px;v-text-anchor:middle;width:100px;" arcsize="10%" strokecolor="#E53E3E" fillcolor="#E53E3E">
      <w:anchorlock/>
      <center style="color:#ffffff;font-family:sans-serif;font-size:13px;font-weight:bold;">Reject</center>
    </v:roundrect>
    <![endif]-->
    <a href="${path}/carbooking/#/approve/${booking.data.id}/${
      booking.data.uuid
    }/reject"  target="_blank"
    style="background-color:#E53E3E;border:1px solid #E53E3E;border-radius:4px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:40px;text-align:center;text-decoration:none;width:100px;-webkit-text-size-adjust:none;mso-hide:all;">Reject</a>
       
             
        
      <!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${path}/carbooking/#/approve/${
      booking.data.id
    }/${
      booking.data.uuid
    }/approve" style="height:40px;v-text-anchor:middle;width:100px;" arcsize="10%" strokecolor="#1D366D" fillcolor="#1D366D">
    <w:anchorlock/>
    <center style="color:#ffffff;font-family:sans-serif;font-size:13px;font-weight:bold;">Approve</center>
    </v:roundrect>
    <![endif]--><a href="${path}/carbooking/#/approve/${booking.data.id}/${
      booking.data.uuid
    }/approve" target="_blank"
    style="background-color:#1D366D;border:1px solid #1D366D;border-radius:4px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:40px;text-align:center;text-decoration:none;width:100px;-webkit-text-size-adjust:none;mso-hide:all;">Approve</a>
    
    
    
     </td>
            </td>
          </table>
          </td>
        </tr>
      </table>
        </td>
        </tr>
     
      <tr>
          <td  style="   
                     background : #1D366D   ;
                     padding : 20px;
                     text-align :center ;
                     color : #FFF
                     ">
              <p style="margin: 0;"> Copyright &copy; AAIPICO HITECH 2021</p>
          </td>
      </tr>
    </table>
 
</body>
  
</html>`
  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch("https://ess.aapico.com/email", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export const sendFirebaseNotification = async (driverId) => {
  await getSubscriberByempId(driverId).then(async (res) => {
    console.log(res[0].token);
    await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      {
        data: {
          notification: {
            title: "Car Booking System",
            body: "คุณมีงานใหม่",
            icon: "/carbooking/logo.png",
          },
        },
        to: res[0].token,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "key=AAAAxjnXApw:APA91bHh9p6rgmWs_g9lXWzgXDYXwNxXYPbj5YBpdkJRXAQ6BfSpMWosnovXEICrb48PKZ3jxH2lqS6PFrSuMZTgl0XucKqCwuWAZqD-mNxVazcHzlg3xVsmnSJpR-hk4rcMS_gT2lEQ ",
        },
      }
    );
  });
};
export const getSubscriberByempId = async (emp_id) => {
  return await axios
    .get(`${subscribersApi}?empID=${emp_id}&app_name=Carbooking`)
    .then((res) => {
      // console.log(res.data);
      return res.data;
    });
};
export const updateSubscriber = async (id, token) => {
  // console.log(emp_id);
  return await axios
    .put(`${subscribersApi}/${id}`, {
      token: token,
    })
    .then((res) => {
      // console.log(res.data);
      return res.data;
    });
};
export const addSubscriber = async (emp_id, token) => {
  // console.log(emp_id);
  return await axios
    .post(`${subscribersApi}`, {
      empID: emp_id,
      token: token,
      app_name: "Carbooking",
    })
    .then((res) => {
      // console.log(res.data);
      return res.data;
    });
};
