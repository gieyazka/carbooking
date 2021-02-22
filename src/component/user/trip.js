import React, { useState, useRef, useReducer, Fragment } from "react";
import { DataContext } from "../store/store";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../form/formrequest.css";
import io from "socket.io-client";

import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  Select,
  InputNumber,
  Button,
  DatePicker,
  Space,
  TimePicker,
  Radio,
  Card,
} from "antd";
import forward from "../asset/forward.png";
import backward from "../asset/backward.png";
import Swal from "sweetalert2";
import user from "../asset/hruser.png";
import calender from "../asset/hrcarender.png";
import location from "../asset/hrlocation.png";
import car from "../asset/carblack.png";
import hrmessage from "../asset/hrmessage.png";
import people from "../asset/people.png";
import statusdriver2 from "../asset/statusdriver2.png";
import noDriver from "../asset/noDriver.png";
import playIcon from "../asset/playIcon.png";
import pause from "../asset/pause.png";
import playIconDisable from "../asset/playIconDisable.png";
import clearIcon from "../asset/clearIcon.png";
import { getTrips } from "../util/index";
import { getAllTrips, editTrips, editBookingStatus } from "../util/index";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import loadingLogin from "../asset/wheel.gif";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "moment/locale/th";
var _ = require("lodash");
const socket = io("https://ess.aapico.com");
const Trips = () => {
  const [loading, setloading] = useState(false);
  const [page, setPage] = useState(1);

  const [date, setDate] = useState(new moment());
  const localizer = momentLocalizer(moment);
  var data = [{}];
  const [tripDetail, setTripDetail] = useState({
    events: [],
  });
  const handleCalendarEvent = (e) => {
    setModalData({ tripData: e, open: true });
  };
  const valueRef = useRef();
  const valueEndRef = useRef();
  const [modalData, setModalData] = useState({ open: false });
  const [tripModal, setTripModal] = useState({ open: false });
  const [dataBooking, setDataBooking] = useState({ open: false });
  const handleCancel = () => {
    setModalData({ ...modalData, open: false });
  };
  const handleTripCancel = () => {
    setTripModal({ ...tripModal, open: false });
  };
  const tripsControl = async (d) => {
    setTripModal({ ...tripModal, updateTrip: d, open: true });
  };
  const viewJob = async (d) => {
    setPage(2);
    setDataBooking({ open: true, bookings: d });
  };
  const loginEmpId = JSON.parse(sessionStorage.getItem("user")).emp_id;
  // console.log(loginEmpId);
  // console.log(JSON.parse(sessionStorage.getItem('user')).emp_id);
  React.useEffect(() => {
    socket.on(loginEmpId, (data) => {
      const oldTrip = tripDetail.allTrips;
      oldTrip.push(data);
      Swal.fire({
        icon: "info",
        title: "คุณมีงานใหม่",
        showConfirmButton: false,
        timer: 1500,
      });
      setTripDetail({ ...tripDetail, allTrips: oldTrip });
    });
    console.log(tripDetail);

    return () => {
      socket.off("connect");
      // socket.off('disconnect');
      socket.off("sendData");
      socket.off(loginEmpId);
    };
  });
  const editBooking = async (d, status, trip) => {
    console.log(trip);
    if (status == "trip") {
      Swal.fire({
        title: `ยืนยันการเริ่มงานของ ${d.name} `,
        text: `วันที่ ${moment(d.date, "YYYYMMDD").format("DD-MM-YYYY")} เวลา ${
          d.startTime
        } - ${d.endTime}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          setloading(true);
          await editBookingStatus(d, status).then(async (res) => {
            // console.log(res[0].id);
            let newTripData = trip.bookings.filter((r) => r.id != res[0].id);
            newTripData.push(res[0]);
            // console.log(newTripData);
            await getAllTrips().then((res) => {
              setTripDetail({ ...tripDetail, allTrips: res });
            });
            newTripData = _.sortBy(newTripData, [
              function (o) {
                return o.status;
              },
            ]);
            setDataBooking({
              open: true,
              bookings: { ...dataBooking.bookings, bookings: newTripData },
            });

            setloading(false);
          });
        }
      });
    } else if (status == "finish") {
      Swal.fire({
        title: `ยืนยันการสิ้นสุดงานของ ${d.name} `,
        text: `วันที่ ${moment(d.date, "YYYYMMDD").format("DD-MM-YYYY")} เวลา ${
          d.startTime
        } - ${d.endTime}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          setloading(true);
          await editBookingStatus(d, status).then(async (res) => {
            // console.log(res[0].id);
            let newBookingData = trip.bookings.filter((r) => r.id != res[0].id);
            newBookingData.push(res[0]);

            // console.log(newTripData);
            await getAllTrips().then((res) => {
              let newTripData = [];
              for (const d of res) {
                const checkStatus = d.bookings.filter(
                  (book) => book.status != "finish"
                );
                // console.log(264, checkStatus);
                if (checkStatus[0]) {
                  newTripData.push(d);
                } else {
                  const test = { ...d, newStatus: "finish" };
                  newTripData.push(test);
                }
              }
              setTripDetail({ ...tripDetail, allTrips: newTripData });
            });

            newBookingData = _.orderBy(newBookingData, [status], ["desc"]);
            setDataBooking({
              open: true,
              bookings: { ...dataBooking.bookings, bookings: newBookingData },
            });
            setloading(false);
          });
        }
      });
    }
    setloading(false);
  };

  const sendStartMile = async (d) => {
    console.log(d);
    if (d.status == "free") {
      if (valueRef.current.state.value == null) {
        Swal.fire({
          icon: "warning",
          title: "กรุณากรอกเลขไมล์",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }
      Swal.fire({
        title: `ยืนยันการเริ่มงานวันที่ `,
        text: `${moment(d.date, "YYYYMMDD").format("DD-MM-YYYY")}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          setloading(true);
          let startMile = valueRef.current.state.inputValue;
          valueRef.current.state.inputValue = null;
          console.log(202);

          await editTrips(d, startMile).then((res) => {
            setTripDetail({ ...tripDetail, allTrips: res });
            setTripModal({ open: false });
            const BookingsTrip = res.filter((data) => d.id == data.id);
            // console.log(BookingsTrip);
            setDataBooking({ open: true, bookings: BookingsTrip[0] });
            setPage(2);
            // console.log(res);
          });
          setloading(false);
        }
      });
    } else if (d.status == "trip") {
      if (valueEndRef.current.state.value == null) {
        Swal.fire({
          icon: "warning",
          title: "กรุณากรอกเลขไมล์",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }
      console.log(
        d,
        parseInt(d.startMileage),
        parseInt(valueEndRef.current.state.value)
      );
      if (
        parseInt(d.startMileage) >= parseInt(valueEndRef.current.state.value)
      ) {
        Swal.fire({
          icon: "warning",
          title: `เลขไมล์น้อยกว่าเลขไมล์เริ่มต้น ${d.startMileage}`,
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }
      let endMile = valueEndRef.current.state.inputValue;
      // console.log(valueEndRef.current.state);
      Swal.fire({
        title: `ยืนยันการสิ้นสุดงาน ${moment(d.date, "YYYYMMDD").format(
          "DD-MM-YYYY"
        )}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          setloading(true);
          await editTrips(d, endMile).then((res) => {
            console.log(res);
            setTripDetail({ ...tripDetail, allTrips: res });
            setTripModal({ open: false });
            // console.log(res);
          });
          setloading(false);
        }
      });
    }

    // console.log(d);
  };

  console.log(dataBooking);
  React.useMemo(async () => {
    await getAllTrips().then(async (res) => {
      let newTripData = [];
      for (const d of res) {
        const checkStatus = d.bookings.filter(
          (book) => book.status != "finish"
        );
        // console.log(264, checkStatus);
        if (checkStatus[0]) {
          newTripData.push(d);
        } else {
          const test = { ...d, newStatus: "finish" };
          newTripData.push(test);
        }
        // console.log(d)
        for (const book of d.bookings) {
          if (
            book.emp_id == JSON.parse(sessionStorage.getItem("user")).emp_id ||
            (d.driver &&
              JSON.parse(sessionStorage.getItem("user")).role == "driver" &&
              // || d.driver
              d.driver.emp_id ==
                JSON.parse(sessionStorage.getItem("user")).emp_id)
          ) {
            data.push({
              id: book.id,
              data: book,
              title: `${JSON.parse(book.destination) + " "} ${
                JSON.parse(book.destProvince) + " "
              }`,
              allDay: false,
              start: moment(book.date, "YYYYMMDD")._d,
              end: moment(book.date, "YYYYMMDD")._d,
            });
          }
        }
      }
      setTripDetail({ allTrips: newTripData, events: data });
    });
  }, []);
  // console.log(tripDetail);
  var i = 0;
  // console.log(JSON.parse(sessionStorage.getItem('user')).emp_id );
  if (page === 1) {
    return (
      <Fragment>
        <div
          style={
            !loading
              ? { display: "none" }
              : {
                  zIndex: 99999,
                  height: "calc(100vh + 64px)",
                  width: "100%",
                  textAlign: "center",
                  position: "fixed",
                  top: "0",
                  display: "block",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }
          }
        >
          <img
            src="/carbooking/static/media/wheel.7bfd793f.gif"
            style={{
              borderRadius: "10px",
              top: "50%",
              left: "50%",
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        <div className="tripCard">
          {tripDetail.allTrips &&
            tripDetail.allTrips.map(
              (r, index) =>
                // r.bookings.map(res => (

                (r.status != "finish" &&
                  r.user ==
                    JSON.parse(sessionStorage.getItem("user")).emp_id) ||
                (r.driver &&
                  r.status != "finish" &&
                  JSON.parse(sessionStorage.getItem("user")).role == "driver" &&
                  r.driver.emp_id ==
                    JSON.parse(sessionStorage.getItem("user")).emp_id) ? (
                  <Card
                    key={r.id}
                    style={
                      r.status == "trip"
                        ? {
                            marginTop: "8px",
                            backgroundColor: "#FEAB20",
                            color: "#FFF",
                            borderRadius: "10px",
                            position: "relative",
                            boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.05)",
                            width: "100%",
                            fontSize: "16px",
                            fontFamily: "Bai Jamjuree",
                          }
                        : {
                            marginTop: "8px",
                            position: "relative",
                            borderRadius: "10px",
                            boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.05)",
                            width: "100%",
                            background: "#FFF",
                            fontSize: "16px",
                            fontFamily: "Bai Jamjuree",
                          }
                    }
                  >
                    {/* {r.driver ? r.driver.emp_id : '-'} <br /> {r.user ? r.user : '-'} */}

                    {/* {r.id} */}
                    <p style={{ fontSize: "24px" }}>
                      {moment(r.date, "YYYYMMDD").format("DD-MM-YYYY")} &nbsp;{" "}
                      {r.startTime}
                    </p>
                    <p style={{ fontSize: "24px" }}>
                      {" "}
                      คุณมี{" "}
                      {
                        r.bookings.filter((d) => d.status != "finish").length
                      }{" "}
                      สถานที่{" "}
                    </p>

                    {i++ == 0 ? (
                      r.status == "free" ? (
                        <a
                          className="button5"
                          onClick={() => tripsControl(r)}
                          style={{
                            backgroundColor: "rgba(47,133,90,1)",
                            position: "absolute",
                            top: "50%",
                            right: "2vw",
                            transform: "translateY(-50%)",
                          }}
                        >
                          เริ่มงาน
                        </a>
                      ) : !r.newStatus ? (
                        <a
                          className="button5"
                          onClick={() => viewJob(r)}
                          style={{
                            backgroundColor: "#FFF",
                            color: "black",
                            position: "absolute",
                            top: "50%",
                            right: "2vw",
                            transform: "translateY(-50%)",
                          }}
                        >
                          รายละเอียดงาน
                        </a>
                      ) : (
                        <a
                          className="button5"
                          onClick={() => tripsControl(r)}
                          style={{
                            backgroundColor: "#FFF",
                            color: "black",
                            position: "absolute",
                            top: "50%",
                            right: "2vw",
                            transform: "translateY(-50%)",
                          }}
                        >
                          สิ้นสุดงาน
                        </a>
                      )
                    ) : // : <img src={r.status == 'free' ? playIconDisable : pause} style={{ position: 'absolute', top: '50%', right: '2vw', transform: 'translateY(-50%)' }} />}
                    null}
                  </Card>
                ) : null
              // ))
            )}
        </div>
        <div className="driverCalendar">
          <h2
            style={{
              position: "relative",
              padding: "12px",
              textAlign: "center",
              color: "#FFF",
            }}
          >
            <img
              src={backward}
              onClick={() => {
                setDate(moment(date).subtract(1, "months"));
              }}
              style={{ cursor: "pointer" }}
            />{" "}
            &nbsp; {date.locale("th").format("MMMM YYYY")} &nbsp;{" "}
            <img
              src={forward}
              onClick={() => {
                setDate(moment(date).add(1, "months"));
              }}
              style={{ cursor: "pointer" }}
            />
          </h2>
          <Calendar
            popup
            culture="ar-AE"
            localizer={localizer}
            events={tripDetail.events}
            startAccessor="start"
            endAccessor="end"
            date={date._d}
            style={{ height: "500px", color: "black" }}
            views={{ month: true }}
            toolbar={false}
            onNavigate={date._d}
            onSelectEvent={(event) => handleCalendarEvent(event.data)}
          />
        </div>

        <Modal visible={tripModal.open} onCancel={handleTripCancel} footer={[]}>
          {tripModal.open && tripModal.updateTrip.status == "free" ? (
            <div style={{ textAlign: "center", margin: "0 12%" }}>
              <h2>Enter mileage before start job</h2>
              <h2>โปรดกรอกเลขไมล์ก่อนเริ่มงาน</h2>
              <InputNumber
                ref={valueRef}
                style={{ marginTop: "8px", width: "100%" }}
                defaultValue={tripModal.updateTrip.car.mileage}
                placeholder="ไมล์เริ่มต้น (Start Mileage)"
              />
              <button
                onClick={() => sendStartMile(tripModal.updateTrip)}
                style={{
                  cursor: "pointer",
                  color: "#FFF",
                  fontFamily: "Bai Jamjuree",
                  marginTop: "24px",
                  padding: "8px 24px",
                  background: "#309E48",
                  borderRadius: "10px",
                  border: 0,
                  fontSize: "1.3em",
                }}
              >
                Start
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center", margin: "0 12%" }}>
              <h2>Enter mileage before end job</h2>
              <h2>โปรดกรอกเลขไมล์ก่อนปิดงาน</h2>
              <h4>
                เลขไมล์เริ่มต้น (Start Mileage) :{" "}
                {tripModal.updateTrip && tripModal.updateTrip.startMileage}{" "}
              </h4>
              <InputNumber
                ref={valueEndRef}
                style={{ marginTop: "8px", width: "100%" }}
                placeholder="ไมล์สิ้นสุด (End Mileage)"
              />
              <button
                onClick={() => sendStartMile(tripModal.updateTrip)}
                style={{
                  cursor: "pointer",
                  color: "#FFF",
                  fontFamily: "Bai Jamjuree",
                  marginTop: "24px",
                  padding: "8px 24px",
                  background: "#FB0000",
                  borderRadius: "10px",
                  border: 0,
                  fontSize: "1.3em",
                }}
              >
                End
              </button>
            </div>
          )}
        </Modal>
        <Modal visible={modalData.open} onCancel={handleCancel} footer={[]}>
          {modalData.open ? (
            <>
              <div
                style={{
                  position: "relative",
                  fontFamily: "Bai Jamjuree",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "16px",
                  lineHeight: "140%",
                }}
              >
                <div>
                  <img src={car} />{" "}
                  <span style={{ position: "relative", paddingLeft: "2%" }}>
                    {" "}
                    {modalData.tripData.driver &&
                      modalData.tripData.driver.name +
                        " " +
                        modalData.tripData.driver.lastname}{" "}
                    &nbsp; {modalData.tripData.carType}{" "}
                  </span>
                </div>
                <div style={{ paddingTop: "4%" }}>
                  {modalData.tripData.needDriver ? (
                    <img style={{}} src={statusdriver2} />
                  ) : (
                    <img src={noDriver} />
                  )}{" "}
                  <span style={{ position: "relative", paddingLeft: "5%" }}>
                    {" "}
                    คนขับรถ{" "}
                  </span>
                </div>

                <div style={{ paddingTop: "4%" }}>
                  <img src={calender} />{" "}
                  <span style={{ position: "relative", paddingLeft: "4%" }}>
                    {" "}
                    {moment(modalData.tripData.date, "YYYYMMDD").format(
                      "DD-MM-YYYY"
                    )}{" "}
                    {modalData.tripData.startTime} -{" "}
                    {modalData.tripData.endTime}
                  </span>
                </div>
                <div style={{ paddingTop: "4%" }}>
                  <img src={location} />{" "}
                  <span style={{ position: "relative", paddingLeft: "4%" }}>
                    {" "}
                    {JSON.parse(modalData.tripData.destination) +
                      " "} &nbsp;{" "}
                    {JSON.parse(modalData.tripData.destProvince) + " "}
                  </span>
                </div>
                <div style={{ paddingTop: "4%" }}>
                  <img src={people} />{" "}
                  <span style={{ position: "relative", paddingLeft: "4%" }}>
                    {" "}
                    จำนวน {modalData.tripData.totalPassenger} คน
                  </span>
                </div>
                <div style={{ paddingTop: "4%" }}>
                  <img src={hrmessage} />{" "}
                  <span style={{ position: "relative", paddingLeft: "4%" }}>
                    {" "}
                    {modalData.tripData.reason}
                  </span>
                </div>

                <div style={{ paddingTop: "4%" }}>
                  <p>รายละเอียดอื่น ๆ : {modalData.tripData.comment || "-"}</p>
                </div>
              </div>
            </>
          ) : null}
        </Modal>
      </Fragment>
      // </div>
    );
  } else if (page === 2) {
    return (
      <React.Fragment>
        <div style={{ margin: "0px 24px", minHeight: "100vh" }}>
          <div
            style={{
              color: "#1d366d",

              marginTop: "24px",
            }}
          >
            <ArrowLeftOutlined
              style={{ cursor: "pointer", fontSize: "24px" }}
              onClick={() => {
                setPage(1);
              }}
            />{" "}
          </div>
          {dataBooking.bookings
            ? dataBooking.bookings.bookings.map((res) => (
                <Card
                  key={res.id}
                  style={
                    res.status == "trip"
                      ? {
                          marginTop: "12px",
                          backgroundColor: "#FEAB20",
                          color: "#FFF",
                          borderRadius: "10px",
                          position: "relative",
                          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.05)",
                          width: "100%",
                          fontSize: "16px",
                          fontFamily: "Bai Jamjuree",
                        }
                      : res.status == "finish"
                      ? {
                          marginTop: "12px",
                          color: "#FFF",
                          position: "relative",
                          borderRadius: "10px",
                          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.05)",
                          width: "100%",
                          background: "#309E48",
                          fontSize: "16px",
                          fontFamily: "Bai Jamjuree",
                        }
                      : {
                          marginTop: "12px",
                          position: "relative",
                          borderRadius: "10px",
                          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.05)",
                          width: "100%",
                          background: "#FFF",
                          fontSize: "16px",
                          fontFamily: "Bai Jamjuree",
                        }
                  }
                >
                  {/* {r.driver ? r.driver.emp_id : '-'} <br /> {r.user ? r.user : '-'} */}
                  <p>
                    {JSON.parse(res.destination) + " "} &nbsp;{" "}
                    {JSON.parse(res.destProvince) + " "}
                  </p>
                  <p>
                    {res.startTime} - {res.endTime}
                  </p>

                  {res.status == "free" ? (
                    <img
                      onClick={() =>
                        editBooking(res, "trip", dataBooking.bookings)
                      }
                      src={playIcon}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        top: "50%",
                        right: "2vw",
                        transform: "translateY(-50%)",
                      }}
                    />
                  ) : res.status == "trip" ? (
                    <img
                      src={pause}
                      onClick={() =>
                        editBooking(res, "finish", dataBooking.bookings)
                      }
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        top: "50%",
                        right: "2vw",
                        transform: "translateY(-50%)",
                      }}
                    />
                  ) : null}
                </Card>
              ))
            : null}
        </div>
      </React.Fragment>
    );
  }
};

export default Trips;
