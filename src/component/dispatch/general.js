import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { DataContext } from "../store/store";
import SelectCar from "./selectCar.js";
import moment from "moment";
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  Button,
  DatePicker,
  Space,
  TimePicker,
  Radio,
  Card,
  Modal,
} from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import iconCar from "../asset/iconcar.png";
import Statusdriver from "../asset/statusdriver.png";
import user from "../asset/user.png";
import calender from "../asset/calender.png";
import location from "../asset/location.png";
import location1 from "../asset/hrlocation.png";
import message from "../asset/message.png";
import detail from "../asset/detail.png";
import mockCar from "../asset/mockCar.png";
import dragicon from "../asset/dragicon.png";
import dragicon1 from "../asset/dragicon1.png";
import cleardata from "../asset/cleardata.png";
import countRequest from "../asset/countRequest.png";
import senddatabtn from "../asset/senddatabtn.png";
import filer from "../asset/filer.png";
import noDriver1 from "../asset/noDriver1.png";
import noDriver from "../asset/noDriver.png";
import loadingLogin from "../asset/wheel.gif";

import GifLoader from "react-gif-loader";
import car from "../asset/carblack.png";
import hrmessage from "../asset/hrmessage.png";
import people from "../asset/people.png";
import statusdriver2 from "../asset/statusdriver2.png";
import user1 from "../asset/hruser.png";
import calender1 from "../asset/hrcarender.png";
import clearIcon from "../asset/clearIcon.png";
import {
  getBookingDispatched,
  addTrips,
  checkDriver,
  addOldTrip,
  addNewTrip,
  checkTrips,
  checkOldTrips,
  setTripOff,
  getBooking,
  updateOldTrip,
  getBookingDispatch,
  sendEmail,
  getCars,
  getDrivers,
  getTrips,
} from "../util/index";
import { remove } from "lodash";

const testVaraint = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    // transition: { duration: 1 }
  },
  exit: {
    opacity: 1,
    transition: { ease: "easeInOut" },
  },
};
const RequestCar = ({ filerBooking }) => {
  // console.log(filerBooking);
  const [state, setState] = React.useContext(DataContext);
  // console.log(state);
  const [modal, setModal] = useState(false);
  const [bookingData, setbookingData] = useState({});
  const { innerHeight, innerWidth } = window;
  // console.log(innerHeight,innerWidth);
  if (innerWidth <= 575) {
    var device = "horizontal";
  } else {
    var device = "vertical";
  }
  const showData = (d) => {
    if (d.booking) {
      const data = {
        ...d.d.booking,
        destination: JSON.parse(d.booking.destination) + " ",
        destProvince: JSON.parse(d.booking.destProvince) + " ",
      };
      setbookingData(data);
    } else {
      const data = {
        ...d,
        destination: JSON.parse(d.destination) + " ",
        destProvince: JSON.parse(d.destProvince) + " ",
      };
      setbookingData(data);
    }
    setModal(true);
  };
  // console.log(state.booking)
  // sendEmail()z
  return (
    <div>
      <div className="horizonScroll">
        <div className="ScrollCar">
          {state.booking[0] ? (
            <div className="cardBooking">
              <Droppable droppableId="droppable1" direction={`${device}`}>
                {(provided, snapshot) => (
                  <div
                    className="dragRequest"
                    ref={provided.innerRef}
                    // style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {state.booking &&
                      state.booking.map((res, index) =>
                        (res && res.company == filerBooking.company) ||
                        res.department == filerBooking.department ||
                        res.reason == filerBooking.reason ||
                        res.date == filerBooking.date ||
                        res.destProvince == filerBooking.province ? (
                          <Draggable
                            key={res.id}
                            draggableId={`${res.id}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                // style={{ width: '100%' }}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <Card className="cardMobile">
                                  <div
                                    style={{
                                      position: "relative",
                                      width: "auto",
                                    }}
                                  >
                                    <img src={iconCar} />{" "}
                                    <span
                                      className="font"
                                      style={{ paddingLeft: "4%" }}
                                    >
                                      {" "}
                                      {res.carType || res.booking.carType}{" "}
                                      <img
                                        src={dragicon1}
                                        style={{
                                          paddingLeft: "2%",
                                          position: "absolute",
                                          left: "90%",
                                          //   transform: "translateX(-60%)",
                                        }}
                                        {...provided.dragHandleProps}
                                      />
                                    </span>
                                    {/* <img src={Statusdriver} style={{ paddingLeft: '20%' }} /> <span className='font' style={{ position: 'relative', paddingLeft: '2%' }} > คนขับรถ </span> */}
                                  </div>
                                  <div
                                    style={{
                                      paddingTop: "4%",
                                    }}
                                  >
                                    {res.needDriver ||
                                    (res.booking && res.booking.needDriver) ? (
                                      <img style={{}} src={Statusdriver} />
                                    ) : (
                                      <img style={{}} src={noDriver1} />
                                    )}
                                    <span
                                      className="font"
                                      style={{
                                        paddingLeft: "6%",
                                      }}
                                    >
                                      {res.needDriver
                                        ? "ต้องการคนขับรถ"
                                        : "ไม่ต้องการคนขับรถ"}{" "}
                                    </span>
                                  </div>
                                  <div style={{ paddingTop: "4%" }}>
                                    <img src={user} />{" "}
                                    <span
                                      className="font"
                                      style={{
                                        position: "relative",
                                        paddingLeft: "4%",
                                      }}
                                    >
                                      {" "}
                                      {res.name
                                        ? res.name
                                        : res.bookings.name}{" "}
                                      (
                                      {res.company
                                        ? res.company
                                        : res.bookings.company}
                                      ){" "}
                                    </span>
                                  </div>
                                  <div style={{ paddingTop: "4%" }}>
                                    <img src={calender} />{" "}
                                    <span
                                      className="font"
                                      style={{
                                        position: "relative",
                                        paddingLeft: "4%",
                                      }}
                                    >
                                      {" "}
                                      {res.date
                                        ? moment(res.date, "YYYYMMDD").format(
                                            "DD-MM-YYYY"
                                          )
                                        : moment(
                                            res.bookings.date,
                                            "YYYYMMDD"
                                          ).format("DD-MM-YYYY")}{" "}
                                      &nbsp;{" "}
                                      {res.bookings
                                        ? res.bookings.startTime
                                        : res.startTime}{" "}
                                      -{" "}
                                      {res.bookings
                                        ? res.bookings.endTime
                                        : res.endTime}{" "}
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      paddingTop: "4%",
                                      paddingLeft: "1.5%",
                                    }}
                                  >
                                    <img src={location} />{" "}
                                    <span
                                      className="font"
                                      style={{
                                        position: "relative",
                                        paddingLeft: "4.5%",
                                      }}
                                    >
                                      {" "}
                                      {res.bookings
                                        ? JSON.parse(res.bookings.destination) +
                                          " "
                                        : JSON.parse(res.destination) +
                                          " "}{" "}
                                      {res.bookings
                                        ? JSON.parse(
                                            res.bookings.destProvince
                                          ) + " "
                                        : JSON.parse(res.destProvince) +
                                          " "}{" "}
                                    </span>
                                  </div>
                                  <div style={{ paddingTop: "4%" }}>
                                    <img src={message} />{" "}
                                    <span
                                      className="font"
                                      style={{
                                        position: "relative",
                                        paddingLeft: "4%",
                                      }}
                                    >
                                      {" "}
                                      {res.bookings
                                        ? res.bookings.reason
                                        : res.reason}{" "}
                                    </span>
                                  </div>
                                  <div
                                    onClick={() => showData(res)}
                                    style={{
                                      cursor: "pointer",
                                      paddingTop: "4%",
                                    }}
                                  >
                                    <img src={detail} />{" "}
                                    <span
                                      className="font"
                                      style={{
                                        color: "#47F044",
                                        position: "relative",
                                        paddingLeft: "4%",
                                      }}
                                    >
                                      {" "}
                                      ดูรายละเอียดเพิ่มเติม{" "}
                                    </span>
                                  </div>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ) : filerBooking.search == false ? (
                          <Draggable
                            key={res.id}
                            draggableId={`${res.id}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                // style={{ width: '100%' }}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <Card className="cardMobile">
                                  <div
                                    style={{
                                      position: "relative",
                                      width: "auto",
                                    }}
                                  >
                                    <img src={iconCar} />{" "}
                                    <span
                                      className="font"
                                      style={{ paddingLeft: "4%" }}
                                    >
                                      {" "}
                                      {res.carType || res.booking.carType}{" "}
                                      <img
                                        src={dragicon1}
                                        style={{
                                          paddingLeft: "2%",
                                          position: "absolute",
                                          left: "90%",
                                          //   transform: "translateX(-60%)",
                                        }}
                                        {...provided.dragHandleProps}
                                      />
                                    </span>
                                    {/* <img src={Statusdriver} style={{ paddingLeft: '20%' }} /> <span className='font' style={{ position: 'relative', paddingLeft: '2%' }} > คนขับรถ </span> */}
                                  </div>
                                  <div
                                    style={{
                                      paddingTop: "4%",
                                    }}
                                  >
                                    {res.needDriver ||
                                    (res.booking && res.booking.needDriver) ? (
                                      <img style={{}} src={Statusdriver} />
                                    ) : (
                                      <img style={{}} src={noDriver1} />
                                    )}
                                    <span
                                      className="font"
                                      style={{
                                        paddingLeft: "6%",
                                      }}
                                    >
                                      {res.needDriver
                                        ? "ต้องการคนขับรถ"
                                        : "ไม่ต้องการคนขับรถ"}{" "}
                                    </span>
                                  </div>
                                  <div style={{ paddingTop: "4%" }}>
                                    <img src={user} />{" "}
                                    <span
                                      className="font"
                                      style={{
                                        position: "relative",
                                        paddingLeft: "4%",
                                      }}
                                    >
                                      {" "}
                                      {res.name ? res.name : res.booking.name} (
                                      {res.company
                                        ? res.company
                                        : res.booking.company}
                                      ){" "}
                                    </span>
                                  </div>
                                  <div style={{ paddingTop: "4%" }}>
                                    <img src={calender} />{" "}
                                    <span
                                      className="font"
                                      style={{
                                        position: "relative",
                                        paddingLeft: "4%",
                                      }}
                                    >
                                      {" "}
                                      {res.date
                                        ? moment(res.date, "YYYYMMDD").format(
                                            "DD-MM-YYYY"
                                          )
                                        : moment(
                                            res.booking.date,
                                            "YYYYMMDD"
                                          ).format("DD-MM-YYYY")}{" "}
                                      &nbsp;{" "}
                                      {res.booking
                                        ? res.booking.startTime
                                        : res.startTime}{" "}
                                      -{" "}
                                      {res.booking
                                        ? res.booking.endTime
                                        : res.endTime}{" "}
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      paddingTop: "4%",
                                      paddingLeft: "1.5%",
                                    }}
                                  >
                                    <img src={location} />{" "}
                                    <span
                                      className="font"
                                      style={{
                                        position: "relative",
                                        paddingLeft: "4.5%",
                                      }}
                                    >
                                      {" "}
                                      {res.booking
                                        ? JSON.parse(res.booking.destination) +
                                          " "
                                        : JSON.parse(res.destination) +
                                          " "}{" "}
                                      {res.booking
                                        ? JSON.parse(res.booking.destProvince) +
                                          " "
                                        : JSON.parse(res.destProvince) +
                                          " "}{" "}
                                    </span>
                                  </div>
                                  <div style={{ paddingTop: "4%" }}>
                                    <img src={message} />{" "}
                                    <span
                                      className="font"
                                      style={{
                                        position: "relative",
                                        paddingLeft: "4%",
                                      }}
                                    >
                                      {" "}
                                      {res.booking
                                        ? res.booking.reason
                                        : res.reason}{" "}
                                    </span>
                                  </div>
                                  <div
                                    onClick={() => showData(res)}
                                    style={{
                                      cursor: "pointer",
                                      paddingTop: "4%",
                                    }}
                                  >
                                    <img src={detail} />{" "}
                                    <span
                                      className="font"
                                      style={{
                                        color: "#47F044",
                                        position: "relative",
                                        paddingLeft: "4%",
                                      }}
                                    >
                                      {" "}
                                      ดูรายละเอียดเพิ่มเติม{" "}
                                    </span>
                                  </div>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ) : (filerBooking.company == "Other" &&
                            res.company != "AH" &&
                            res.company != "AHP" &&
                            res.company != "AHT" &&
                            res.company != "AITS" &&
                            res.company != "ASICO") ||
                          (filerBooking.department == "Other" &&
                            res.department != "Production" &&
                            res.department != "production" &&
                            res.department != "Marketing" &&
                            res.department != "marketing" &&
                            res.department != "QA & QC" &&
                            res.department != "Personnel" &&
                            res.department != "personnel" &&
                            res.department != "IT" &&
                            res.department != "it" &&
                            res.department != "Business Deverlopment" &&
                            res.department != "business deverlopment" &&
                            res.department != "Purchasing" &&
                            res.department != "purchasing" &&
                            res.department != "Safety" &&
                            res.department != "Safety") ||
                          (filerBooking.reason == "Other" &&
                            res.reason !=
                              "ส่งเอกสาร เก็บเช็ค วางบิล ติดต่อธนาคาร" &&
                            res.reason != "ส่งของ" &&
                            res.reason != "รับ - ส่งแขก" &&
                            res.reason != "ติดต่อลูกค้า") ? (
                          <Draggable
                            key={res.id}
                            draggableId={`${res.id}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                // style={{ width: '100%' }}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <Card className="cardMobile">
                                  <div
                                    style={{
                                      position: "relative",
                                      width: "auto",
                                    }}
                                  >
                                    <img src={iconCar} />{" "}
                                    <span
                                      className="font"
                                      style={{ paddingLeft: "4%" }}
                                    >
                                      {" "}
                                      {res.carType || res.booking.carType}{" "}
                                      <img
                                        src={dragicon1}
                                        style={{
                                          paddingLeft: "2%",
                                          position: "absolute",
                                          left: "90%",
                                          //   transform: "translateX(-60%)",
                                        }}
                                        {...provided.dragHandleProps}
                                      />
                                    </span>
                                    {/* <img src={Statusdriver} style={{ paddingLeft: '20%' }} /> <span className='font' style={{ position: 'relative', paddingLeft: '2%' }} > คนขับรถ </span> */}
                                  </div>
                                  <div
                                    style={{
                                      paddingTop: "4%",
                                    }}
                                  >
                                    {res.needDriver ||
                                    (res.booking && res.booking.needDriver) ? (
                                      <img style={{}} src={Statusdriver} />
                                    ) : (
                                      <img style={{}} src={noDriver1} />
                                    )}
                                    <span
                                      className="font"
                                      style={{
                                        paddingLeft: "6%",
                                      }}
                                    >
                                      {res.needDriver
                                        ? "ต้องการคนขับรถ"
                                        : "ไม่ต้องการคนขับรถ"}{" "}
                                    </span>
                                  </div>
                                  <div style={{ paddingTop: "4%" }}>
                                    <img src={user} />{" "}
                                    <span
                                      className="font"
                                      style={{
                                        position: "relative",
                                        paddingLeft: "4%",
                                      }}
                                    >
                                      {" "}
                                      {res.name ? res.name : res.booking.name} (
                                      {res.company
                                        ? res.company
                                        : res.booking.company}
                                      ){" "}
                                    </span>
                                  </div>
                                  <div style={{ paddingTop: "4%" }}>
                                    <img src={calender} />{" "}
                                    <span
                                      className="font"
                                      style={{
                                        position: "relative",
                                        paddingLeft: "4%",
                                      }}
                                    >
                                      {" "}
                                      {res.date
                                        ? moment(res.date, "YYYYMMDD").format(
                                            "DD-MM-YYYY"
                                          )
                                        : moment(
                                            res.booking.date,
                                            "YYYYMMDD"
                                          ).format("DD-MM-YYYY")}{" "}
                                      &nbsp;{" "}
                                      {res.booking
                                        ? res.booking.startTime
                                        : res.startTime}{" "}
                                      -{" "}
                                      {res.booking
                                        ? res.booking.endTime
                                        : res.endTime}{" "}
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      paddingTop: "4%",
                                      paddingLeft: "1.5%",
                                    }}
                                  >
                                    <img src={location} />{" "}
                                    <span
                                      className="font"
                                      style={{
                                        position: "relative",
                                        paddingLeft: "4.5%",
                                      }}
                                    >
                                      {" "}
                                      {res.booking
                                        ? JSON.parse(res.booking.destination) +
                                          " "
                                        : JSON.parse(res.destination) +
                                          " "}{" "}
                                      {res.booking
                                        ? JSON.parse(res.booking.destProvince) +
                                          " "
                                        : JSON.parse(res.destProvince) +
                                          " "}{" "}
                                    </span>
                                  </div>
                                  <div style={{ paddingTop: "4%" }}>
                                    <img src={message} />{" "}
                                    <span
                                      className="font"
                                      style={{
                                        position: "relative",
                                        paddingLeft: "4%",
                                      }}
                                    >
                                      {" "}
                                      {res.booking
                                        ? res.booking.reason
                                        : res.reason}{" "}
                                    </span>
                                  </div>
                                  <div
                                    onClick={() => showData(res)}
                                    style={{
                                      cursor: "pointer",
                                      paddingTop: "4%",
                                    }}
                                  >
                                    <img src={detail} />{" "}
                                    <span
                                      className="font"
                                      style={{
                                        color: "#47F044",
                                        position: "relative",
                                        paddingLeft: "4%",
                                      }}
                                    >
                                      {" "}
                                      ดูรายละเอียดเพิ่มเติม{" "}
                                    </span>
                                  </div>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ) : null
                      )}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ) : null}
        </div>
      </div>

      <Modal
        visible={modal}
        // onOk={handleOk}
        onCancel={() => {
          setModal(false);
        }}
        footer={[]}
      >
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
          <span style={{ position: "absolute", right: "10%" }}>
            {" "}
            {bookingData.needDriver ? (
              <img src={statusdriver2} />
            ) : (
              <img src={noDriver} />
            )}{" "}
            &nbsp; คนขับรถ{" "}
          </span>
          <img src={car} />{" "}
          <span style={{ paddingLeft: "4%" }}> {bookingData.carType} </span>
        </div>
        <div style={{ paddingTop: "4%" }}>
          <img src={user1} />{" "}
          <span style={{ position: "relative", paddingLeft: "4%" }}>
            {" "}
            {bookingData.name} ({bookingData.company}){" "}
          </span>
        </div>

        <div style={{ paddingTop: "4%" }}>
          <img src={calender1} />{" "}
          <span style={{ position: "relative", paddingLeft: "4%" }}>
            {" "}
            {bookingData.date &&
              bookingData.date.replaceAll("-", "/")} &nbsp;{" "}
            {bookingData.startTime} - {bookingData.endTime}
          </span>
        </div>
        <div style={{ paddingTop: "4%" }}>
          <img src={location1} />{" "}
          <span style={{ position: "relative", paddingLeft: "4%" }}>
            {" "}
            {bookingData.destination} {bookingData.destProvince}{" "}
          </span>
        </div>
        <div style={{ paddingTop: "4%" }}>
          <img src={hrmessage} />{" "}
          <span style={{ position: "relative", paddingLeft: "4%" }}>
            {" "}
            {bookingData.reason}
          </span>
        </div>
        <div style={{ paddingTop: "4%" }}>
          <img src={people} />{" "}
          <span style={{ position: "relative", paddingLeft: "4%" }}>
            {" "}
            จำนวน {bookingData.totalPassenger} คน
          </span>
        </div>
        <div style={{ paddingTop: "4%" }}>
          <p>เหตุผลที่ต้องการใช้รถ : {bookingData.reason}</p>
        </div>
        <div>
          <p>รายละเอียดอื่น ๆ : {bookingData.comment || "-"}</p>
        </div>
      </Modal>
    </div>
  );
};

const Car = () => {
  const { Option } = Select;

  const [state, setState] = React.useContext(DataContext);
  // console.log(state);
  // console.log(state)

  const { innerHeight, innerWidth } = window;
  const [pastTest, setpastTest] = useState({ ...state });
  const getListStyle = (isDraggingOver) => ({
    height: isDraggingOver ? "auto" : "100%",
  });
  const clearData = (data, id) => {
    // console.log(data, id);
    let clearTrips = state.booking;
    let dispatched = state.bookingDispatched;
    let trips = data;

    // console.log(dispatched);
    data.map((d, index) => {
      if (id == d.destCarId && d.car) {
        // console.log(d.dispatch);
        // console.log(dispatched.findIndex(data => data.id == d.id))

        if (d.dispatch === false) {
          let [removed] = dispatched.splice(
            dispatched.findIndex((data) => data.id == d.id),
            1
          );
          delete d.destCarId;
          // console.log(d);
          clearTrips.push(d);
        } else {
          let [removed] = dispatched.splice(
            dispatched.findIndex((data) => data.id == d.id),
            1
          );
          delete d.destCarId;
          d.car = removed.carId;
          // console.log(oldCar);
          dispatched.push(d);
        }
      } else if (id == d.destCarId) {
        let [removed] = dispatched.splice(
          dispatched.findIndex((data) => data.id == d.id),
          1
        );
        delete d.destCarId;
        // console.log(d);
        clearTrips.push(d);
      }
    });
    // console.log(dispatched);
    const filter = data.filter((res) => res.destCarId != id);
    setState({
      ...state,
      bookingDispatched: dispatched,
      booking: clearTrips,
      trips: filter,
    });
  };
  const changeDriver = (value, carId) => {
    // console.log(value, carId);
    let arr = state.selectCar || [];
    arr.push({ value, carId });
    setState({ ...state, selectCar: arr });
  };
  // console.log(state);
  const [loading, setloading] = useState(false);
  // console.log(state);
  const saveDispatch = async (data, carData) => {
    let editable = false;

    setloading(true);
    var driverName = null;
    let insertData = {};
    let bookingId = [];
    let status = true;
    let carId = null;
    let date = null;
    let oldData = [];
    let i = 0;
    for (const d of data) {
      // return;
      if (d.destCarId == carData.id) {
        // select Car
        if (d.needDriver == true) {
          if (state.selectCar) {
            for (const nameDriver of state.selectCar) {
              if (nameDriver.carId == d.destCarId) {
                driverName = nameDriver.value;
                // const driverCheck = await checkDriver(d.date, driverName).then(res => res[0])
                // if (driverCheck) {
                //     Swal.fire({
                //         icon: 'warning',
                //         title: `วันที่ ${moment(d.date, 'YYYYMMDD').format('DD-MM-YYYY')}  ${driverCheck.driver.name} มีงานแล้ว`,
                //         showConfirmButton: false,
                //         timer: 1500
                //     })
                //     setloading(false)
                //     return
                // }
              }
            }
          }
        }
        await checkTrips(d.date, carData.id).then(async (res) => {
          if (res[0] == null) {
            if (d.needDriver == true) {
              if (driverName == null) {
                Swal.fire({
                  icon: "warning",
                  title: `กรุณาเลือกคนขับรถ`,
                  showConfirmButton: false,
                  timer: 1500,
                });
                setloading(false);
                status = false;
                return;
              }
              const newData = {
                status: "free",
                driver: driverName,
                car: parseInt(d.destCarId),
                bookings: d.id,
                date: d.date,
              };
              await addNewTrip(newData, d).then(async (r) => {
                // console.log(r);
                if (d.carId) {
                  //movetrip
                  await checkOldTrips(d.date, d.carId.id, d.id).then(
                    async (oldTripData) => {
                      let newOldTrip = Array.from(oldTripData);
                      let oldTrip = oldTripData[0].bookings.filter(
                        (r) => r.id != d.id
                      );

                      if (!oldTrip[0]) {
                        //Delete Trip
                        await setTripOff(oldTripData[0].id);
                      } else {
                        // console.log(917);
                        newOldTrip[0].bookings = oldTrip;
                        console.log(oldTripData, oldTrip);
                        await updateOldTrip(oldTripData[0].id, oldTrip);
                      }
                      // console.log(newOldTrip);
                    }
                  );
                }
                setloading(false);
                Swal.fire({
                  icon: "success",
                  title: "บันทึกข้อมูลสำเร็จ",
                  showConfirmButton: false,
                  timer: 1500,
                });
              });
            } else {
              // console.log(900);
              const newData = {
                status: "free",
                user: d.emp_id,
                car: parseInt(d.destCarId),
                bookings: d.id,
                date: d.date,
              };
              // console.log(d);
              await addNewTrip(newData, d).then(async () => {
                if (d.carId) {
                  //movetrip
                  await checkOldTrips(d.date, d.carId.id, d.id).then(
                    async (oldTripData) => {
                      // console.log(oldTripData);
                      let newOldTrip = Array.from(oldTripData);
                      let oldTrip = oldTripData[0].bookings.filter(
                        (r) => r.id != d.id
                      );

                      // console.log(oldTrip);
                      if (!oldTrip[0]) {
                        //Delete Trip
                        await setTripOff(oldTripData[0].id);
                      } else {
                        // console.log(959);
                        newOldTrip[0].bookings = oldTrip;
                        console.log(oldTripData, oldTrip);
                        await updateOldTrip(oldTripData[0].id, oldTrip);
                      }
                      // console.log(newOldTrip);
                    }
                  );
                }
                setloading(false);
                Swal.fire({
                  icon: "success",
                  title: "บันทึกข้อมูลสำเร็จ",
                  showConfirmButton: false,
                  timer: 1500,
                });
              });
            }
          } else {
            // edit car
            // console.log(406);
            let typeTrip = "add";
            const filter = res.filter((d) => !d.user);
            const filter2 = filter.filter((d) => !d.status != "off");
            const filter1 = filter2.filter((d) => d.status != "finish");
            // console.log(filter1);
            // console.log(d.needDriver);
            if (filter1[0] && d.needDriver == true) {
              typeTrip = "edit";
            }

            if (typeTrip == "edit") {
              // console.log(941);
              for (const bookingTrip of res[0].bookings) {
                bookingId.push(bookingTrip.id);
              }
              bookingId.push(d.id);

              await addOldTrip(bookingId, res[0], d.id).then(() => {
                Swal.fire({
                  icon: "success",
                  title: "แก้ไขข้อมูลสำเร็จ",
                  showConfirmButton: false,
                  timer: 1500,
                });
              });
            } else {
              // console.log(429);
              if (d.needDriver == true) {
                if (driverName == null) {
                  setloading(false);
                  Swal.fire({
                    icon: "warning",
                    title: `กรุณาเลือกคนขับรถ`,
                    showConfirmButton: false,
                    timer: 1500,
                  });

                  status = false;
                  return;
                }
                const newData = {
                  status: "free",
                  driver: driverName,
                  car: parseInt(d.destCarId),
                  bookings: d.id,
                  date: d.date,
                };
                await addNewTrip(newData, d).then(async () => {
                  if (d.carId) {
                    //movetrip
                    await checkOldTrips(d.date, d.carId.id, d.id).then(
                      async (oldTripData) => {
                        // console.log(oldTripData);
                        let newOldTrip = Array.from(oldTripData);
                        let oldTrip = oldTripData[0].bookings.filter(
                          (r) => r.id != d.id
                        );

                        // console.log(oldTrip);
                        if (!oldTrip[0]) {
                          //Delete Trip
                          await setTripOff(oldTripData[0].id);
                        } else {
                          // console.log(959);
                          newOldTrip[0].bookings = oldTrip;
                          // console.log(oldTripData, oldTrip);
                          await updateOldTrip(oldTripData[0].id, oldTrip);
                        }
                        // console.log(newOldTrip);
                      }
                    );
                  }
                  setloading(false);
                  Swal.fire({
                    icon: "success",
                    title: "บันทึกข้อมูลสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                });
              } else {
                const newData = {
                  status: "free",
                  user: d.emp_id,
                  car: parseInt(d.destCarId),
                  bookings: d.id,
                  date: d.date,
                };
                await addNewTrip(newData, d).then(async () => {
                  if (d.carId) {
                    //movetrip
                    await checkOldTrips(d.date, d.carId.id, d.id).then(
                      async (oldTripData) => {
                        // console.log(oldTripData);
                        let newOldTrip = Array.from(oldTripData);
                        let oldTrip = oldTripData[0].bookings.filter(
                          (r) => r.id != d.id
                        );

                        // console.log(oldTrip);
                        if (!oldTrip[0]) {
                          //Delete Trip
                          await setTripOff(oldTripData[0].id);
                        } else {
                          console.log(959);
                          newOldTrip[0].bookings = oldTrip;
                          console.log(oldTripData, oldTrip);
                          await updateOldTrip(oldTripData[0].id, oldTrip);
                        }
                        // console.log(newOldTrip);
                      }
                    );
                  }
                  setloading(false);
                  Swal.fire({
                    icon: "success",
                    title: "บันทึกข้อมูลสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                });
              }
            }
          }
        });
      } else {
        if (d.destCarId) {
          oldData.push(d);
        }
      }
    }
    if (status == true) {
      let bookingDispatched,
        booking,
        countData = 0;
      await getBookingDispatch().then((res) => {
        res.map((data) => {
          countData += 1;
        });
        booking = res;
      });
      await getBookingDispatched().then((res) => {
        bookingDispatched = res;
      });
      oldData.map((r) => {
        bookingDispatched.splice(
          bookingDispatched.findIndex((d) => d.id == r.id),
          1
        );
        bookingDispatched.push(r);
      });

      setState({
        ...state,
        bookingDispatched: bookingDispatched,
        count: countData,
        selectCar: null,
      });
      setloading(false);
    }
  };
  if (innerWidth <= 575) {
    var device = "horizontal";
  } else {
    var device = "vertical";
  }
  const [filterCar, setFilterCar] = useState(null);
  const handleChangeSelect = (value) => {
    if (!value[0]) {
      setFilterCar(null);
    } else {
      setFilterCar(value);
    }
  };

  return (
    <>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "4px",
          marginBottom: 8,
          width: "50%",
        }}
      >
        <SelectCar parentCallback={handleChangeSelect} car={state.cars} />
      </div>
      <div className="horizonScroll">
        <div className="ScrollCar">
          <div
            style={
              !loading
                ? { display: "none" }
                : {
                    zIndex: 99999,
                    height: "calc(100vh + 64px)",
                    width: "100%",
                    left: 0,
                    textAlign: "center",
                    position: "fixed",
                    top: "0",
                    display: "block",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }
            }
          >
            <img
              src="static/media/wheel.7bfd793f.gif"
              style={{
                borderRadius: "10px",
                top: "50%",
                left: "50%",
                position: "absolute",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
          {state.cars.map((res, index) =>
            filterCar === null ? (
              <Droppable key={index} droppableId={`${res.id}`}>
                {(provided, snapshot) => (
                  <div
                    className="dragRequest"
                    ref={provided.innerRef}

                    // style={getListStyle(snapshot.isDraggingOver)}
                  >
                    <Card
                      className="cardMobile"
                      style={{
                        backgroundColor: snapshot.isDraggingOver
                          ? "lightblue"
                          : "#FFF",
                        borderColor: "#000000",
                        borderRadius: "20px",
                        border: "1px solid rgba(255, 255, 255, 0)",
                      }}
                    >
                      <Row gutter={{ xs: 16, sm: 16 }}>
                        <Col xs={{ span: 24 }} sm={{ span: 8 }} align="center">
                          <div className="carPos">
                            <img
                              src={
                                res.picture[res.picture.length - 1]
                                  ? `https://ess.aapico.com${
                                      res.picture[res.picture.length - 1].url
                                    }`
                                  : "https://static1.cargurus.com/gfx/reskin/no-image-available.jpg?io=true&format=jpg&auto=webp"
                              }
                              className="imgCar"
                            />
                            <p
                              className="carfont"
                              style={{ paddingTop: "2px", height: "100%" }}
                            >
                              {" "}
                              {res.plateNo} {res.province}
                            </p>
                          </div>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 5 }} aling="left">
                          <div
                            className="centerDriver"
                            style={{ position: "relative" }}
                          >
                            <p className="carfont text"> คนขับรถ </p>
                            <span className="carfont">
                              <Select
                                key={res.id}
                                size="large"
                                style={{
                                  fontFamily: "Bai Jamjuree",
                                  width: "100%",
                                }}
                                className="selectWidth"
                                onChange={(e) => {
                                  changeDriver(e, res.id, res);
                                }}
                                showSearch
                                placeholder="เลือกคนขับรถ"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                  option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                }
                              >
                                {state.drivers}
                              </Select>
                            </span>
                          </div>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 6 }}>
                          {/* <div className='Scroll' style={{overflowY : 'scroll' ,height : '300px'}}> */}
                          <div className="Scroll">
                            {/* <div> */}
                            {state.bookingDispatched &&
                              state.bookingDispatched.map((d, i) =>
                                (d.car && !d.destCarId && d.car.id == res.id) ||
                                (d.destCarId &&
                                  !d.bookings &&
                                  res.id == d.destCarId) ? (
                                  <Draggable
                                    key={d.id}
                                    draggableId={`trip${d.id}`}
                                    index={i}
                                    // isDragDisabled={!d.destCarId}
                                  >
                                    {(provided) => (
                                      <div
                                        // style={{ width: '100%' }}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                      >
                                        <div
                                          className="font"
                                          style={
                                            d.status == null ||
                                            (d.status != "trip" &&
                                              d.dispatch == true)
                                              ? {
                                                  position: "relative",
                                                  width: "100%",
                                                  background: "#5A67D8",
                                                  borderRadius: "10px",
                                                  zIndex: "2",
                                                  width: "100%",
                                                  paddingTop: "8%",
                                                  paddingLeft: "8%",
                                                  paddingBottom: "2%",
                                                  marginTop: "4%",
                                                }
                                              : d.status == "trip"
                                              ? {
                                                  position: "relative",
                                                  width: "100%",
                                                  background: "#FEAB20",
                                                  borderRadius: "10px",
                                                  zIndex: "2",
                                                  width: "100%",
                                                  paddingTop: "8%",
                                                  paddingLeft: "8%",
                                                  paddingBottom: "2%",
                                                  marginTop: "4%",
                                                }
                                              : {
                                                  position: "relative",
                                                  width: "100%",
                                                  background: "#1D366D",
                                                  borderRadius: "10px",
                                                  zIndex: "2",
                                                  width: "100%",
                                                  paddingTop: "8%",
                                                  paddingLeft: "8%",
                                                  paddingBottom: "2%",
                                                  marginTop: "4%",
                                                }
                                          }
                                        >
                                          <img
                                            src={dragicon}
                                            {...provided.dragHandleProps}
                                            style={{
                                              color: "red",
                                              position: "absolute",
                                              top: "50%",
                                              right: "0%",
                                              transform: "translate(-50%,-50%)",
                                            }}
                                          />
                                          {/* {d.needDriver ? 1 : 0} */}
                                          <p>
                                            {(d &&
                                              JSON.parse(d.destination) +
                                                " ") ||
                                              JSON.parse(d.destination) +
                                                " "}{" "}
                                            {(d &&
                                              JSON.parse(d.destProvince) +
                                                " ") ||
                                              JSON.parse(d.destProvince) + " "}
                                          </p>
                                          <p>
                                            {d &&
                                              moment(d.date, "YYYYMMDD").format(
                                                "DD-MM-YYYY"
                                              )}{" "}
                                          </p>
                                          <p>
                                            {(d && d.startTime) || d.startTime}{" "}
                                            - {(d && d.endTime) || d.endTime}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ) : null
                              )}
                          </div>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 5 }}>
                          <div className="posGeneralBtn">
                            <Button
                              className="fontGeneralBtn"
                              onClick={() => {
                                saveDispatch(state.bookingDispatched, res);
                              }}
                              style={{
                                fontSize: "1em",
                                backgroundColor: "#2CC84D",
                                color: "#FFF",
                              }}
                            >
                              {" "}
                              <img src={senddatabtn} />
                              <span style={{ paddingLeft: "8px" }}>
                                มอบหมายงาน
                              </span>
                            </Button>
                            <Button
                              className="fontGeneralBtn"
                              onClick={(e) =>
                                clearData(state.bookingDispatched, res.id)
                              }
                              style={{
                                fontSize: "1em",
                                backgroundColor: "#40A9FF",
                                color: "#FFF",
                              }}
                            >
                              <img src={cleardata} />
                              <span style={{ paddingLeft: "8px" }}>
                                เคลียค่า
                              </span>
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Card>

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ) : (
              filterCar.map((d) =>
                d === res.plateNo ? (
                  <Droppable key={index} droppableId={`${res.id}`}>
                    {(provided, snapshot) => (
                      <div
                        className="dragRequest"
                        ref={provided.innerRef}

                        // style={getListStyle(snapshot.isDraggingOver)}
                      >
                        <Card
                          className="cardMobile"
                          style={{
                            backgroundColor: snapshot.isDraggingOver
                              ? "lightblue"
                              : "#FFF",
                            borderColor: "#000000",
                            borderRadius: "20px",
                            border: "1px solid rgba(255, 255, 255, 0)",
                          }}
                        >
                          <Row gutter={{ xs: 16, sm: 16 }}>
                            <Col
                              xs={{ span: 24 }}
                              sm={{ span: 8 }}
                              align="center"
                            >
                              <div className="carPos">
                                <img
                                  src={
                                    res.picture[res.picture.length - 1]
                                      ? `https://ess.aapico.com${
                                          res.picture[res.picture.length - 1]
                                            .url
                                        }`
                                      : "https://static1.cargurus.com/gfx/reskin/no-image-available.jpg?io=true&format=jpg&auto=webp"
                                  }
                                  className="imgCar"
                                />
                                <p
                                  className="carfont"
                                  style={{ paddingTop: "2px", height: "100%" }}
                                >
                                  {" "}
                                  {res.plateNo} {res.province}
                                </p>
                              </div>
                            </Col>
                            <Col
                              xs={{ span: 24 }}
                              sm={{ span: 5 }}
                              aling="left"
                            >
                              <div
                                className="centerDriver"
                                style={{ position: "relative" }}
                              >
                                <p className="carfont text"> คนขับรถ </p>
                                <span className="carfont">
                                  <Select
                                    key={res.id}
                                    size="large"
                                    style={{
                                      fontFamily: "Bai Jamjuree",
                                      width: "100%",
                                    }}
                                    className="selectWidth"
                                    onChange={(e) => {
                                      changeDriver(e, res.id, res);
                                    }}
                                    showSearch
                                    placeholder="เลือกคนขับรถ"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                      option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                    }
                                  >
                                    {state.drivers}
                                  </Select>
                                </span>
                              </div>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 6 }}>
                              {/* <div className='Scroll' style={{overflowY : 'scroll' ,height : '300px'}}> */}
                              <div className="Scroll">
                                {/* <div> */}
                                {state.bookingDispatched &&
                                  state.bookingDispatched.map((d, i) =>
                                    (d.car &&
                                      !d.destCarId &&
                                      d.car.id == res.id) ||
                                    (d.destCarId &&
                                      !d.bookings &&
                                      res.id == d.destCarId) ? (
                                      <Draggable
                                        key={d.id}
                                        draggableId={`trip${d.id}`}
                                        index={i}
                                        // isDragDisabled={!d.destCarId}
                                      >
                                        {(provided) => (
                                          <div
                                            // style={{ width: '100%' }}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                          >
                                            <div
                                              className="font"
                                              style={
                                                d.status == null ||
                                                (d.status != "trip" &&
                                                  d.dispatch == true)
                                                  ? {
                                                      position: "relative",
                                                      width: "100%",
                                                      background: "#5A67D8",
                                                      borderRadius: "10px",
                                                      zIndex: "2",
                                                      width: "100%",
                                                      paddingTop: "8%",
                                                      paddingLeft: "8%",
                                                      paddingBottom: "2%",
                                                      marginTop: "4%",
                                                    }
                                                  : d.status == "trip"
                                                  ? {
                                                      position: "relative",
                                                      width: "100%",
                                                      background: "#FEAB20",
                                                      borderRadius: "10px",
                                                      zIndex: "2",
                                                      width: "100%",
                                                      paddingTop: "8%",
                                                      paddingLeft: "8%",
                                                      paddingBottom: "2%",
                                                      marginTop: "4%",
                                                    }
                                                  : {
                                                      position: "relative",
                                                      width: "100%",
                                                      background: "#1D366D",
                                                      borderRadius: "10px",
                                                      zIndex: "2",
                                                      width: "100%",
                                                      paddingTop: "8%",
                                                      paddingLeft: "8%",
                                                      paddingBottom: "2%",
                                                      marginTop: "4%",
                                                    }
                                              }
                                            >
                                              <img
                                                src={dragicon}
                                                {...provided.dragHandleProps}
                                                style={{
                                                  color: "red",
                                                  position: "absolute",
                                                  top: "50%",
                                                  right: "0%",
                                                  transform:
                                                    "translate(-50%,-50%)",
                                                }}
                                              />
                                              {/* {d.needDriver ? 1 : 0} */}
                                              <p>
                                                {(d &&
                                                  JSON.parse(d.destination) +
                                                    " ") ||
                                                  JSON.parse(d.destination) +
                                                    " "}{" "}
                                                {(d &&
                                                  JSON.parse(d.destProvince) +
                                                    " ") ||
                                                  JSON.parse(d.destProvince) +
                                                    " "}
                                              </p>
                                              <p>
                                                {d &&
                                                  moment(
                                                    d.date,
                                                    "YYYYMMDD"
                                                  ).format("DD-MM-YYYY")}{" "}
                                              </p>
                                              <p>
                                                {(d && d.startTime) ||
                                                  d.startTime}{" "}
                                                -{" "}
                                                {(d && d.endTime) || d.endTime}
                                              </p>
                                            </div>
                                          </div>
                                        )}
                                      </Draggable>
                                    ) : null
                                  )}
                              </div>
                            </Col>
                            <Col xs={{ span: 24 }} sm={{ span: 5 }}>
                              <div className="posGeneralBtn">
                                <Button
                                  className="fontGeneralBtn"
                                  onClick={() => {
                                    saveDispatch(state.bookingDispatched, res);
                                  }}
                                  style={{
                                    fontSize: "1em",
                                    backgroundColor: "#2CC84D",
                                    color: "#FFF",
                                  }}
                                >
                                  {" "}
                                  <img src={senddatabtn} />
                                  <span style={{ paddingLeft: "8px" }}>
                                    มอบหมายงาน
                                  </span>
                                </Button>
                                <Button
                                  className="fontGeneralBtn"
                                  onClick={(e) =>
                                    clearData(state.bookingDispatched, res.id)
                                  }
                                  style={{
                                    fontSize: "1em",
                                    backgroundColor: "#40A9FF",
                                    color: "#FFF",
                                  }}
                                >
                                  <img src={cleardata} />
                                  <span style={{ paddingLeft: "8px" }}>
                                    เคลียค่า
                                  </span>
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Card>

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ) : null
              )
            )
          )}
        </div>
      </div>
    </>
  );
};
const General = () => {
  let filterCompany = null;
  let filterType = null;
  const [filerBooking, setFilter] = useState({
    search: false,
    company: null,
    department: null,
    reason: null,
    date: null,
    province: null,
  });
  const [state, setState] = React.useContext(DataContext);
  // console.log(state);
  const [sidebar, setSidebar] = useState(true);
  const wrapperRef = useRef(null);
  React.useMemo(async () => {
    let booking,
      cars,
      drivers,
      trips,
      countData = 0,
      bookingDispatched;
    await getBookingDispatched().then((res) => {
      bookingDispatched = res;
    });
    await getBookingDispatch().then((res) => {
      res.map((data) => {
        countData += 1;
      });
      booking = res;
    });
    await getCars().then((res) => {
      cars = res;
    });
    await getDrivers().then((res) => {
      drivers = res;
    });
    await getTrips().then((res) => {
      trips = res;
    });
    var i = 0;
    let driverArr = [];
    for (const data in drivers) {
      driverArr.push(
        <Option key={i} value={drivers[data].id}>
          {drivers[data].name} {drivers[data].lastname}
        </Option>
      );
      i++;
    }

    setState({
      ...state,
      bookingDispatched: bookingDispatched,
      cars: cars,
      booking: booking,
      drivers: driverArr,
      allTrip: trips,
      trips: trips,
      count: countData,
    });
  }, []);

  const move = (
    source,
    destination,
    droppableSource,
    droppableDestination,
    souceDropId
  ) => {
    // console.log(source, destination, droppableSource, droppableDestination);
    // console.log(source[0].bookings)
    // console.log(souceDropId);
    const sourceClone = Array.from(source);
    const result = {};
    let removed = {};
    const destClone = Array.from(destination);
    let status = [];
    if (droppableDestination.droppableId != "droppable1") {
      // console.log(sourceClone, droppableSource.index);
      [removed] = sourceClone.splice(droppableSource.index, 1);
      // console.log(removed)
      if (!removed.destCarId || removed.car) {
        let carId = droppableDestination.droppableId;
        if (souceDropId == "droppable1") {
          // console.log(777);
          result["droppableId1"] = sourceClone;
          removed = { ...removed, destCarId: droppableDestination.droppableId };
          destClone.splice(droppableDestination.index, 0, removed); // insert to state
          // console.log(destClone);
          result["trips"] = destClone;
        } else {
          // console.log(780);
          result["droppableId1"] = state.booking;
          removed = {
            ...removed,
            car: { id: droppableDestination.droppableId },
            carId: removed.car,
            destCarId: droppableDestination.droppableId,
          };
          sourceClone.splice(droppableDestination.index, 0, removed); // insert to state
          // console.log(sourceClone);
          result["trips"] = sourceClone;
        }
      } else {
        // console.log(885);
        destination.map((res) => {
          if (res.id == removed.id) {
            removed.destCarId = droppableDestination.droppableId;
          }
        });
        result["droppableId1"] = state.booking;
        result["trips"] = destClone;
      }
    } else {
      let [removed] = sourceClone.splice(droppableSource.index, 1);
      if (removed.car) {
        Swal.fire({
          icon: "warning",
          title: `ไม่สามารถลากได้ เนื่องจากงานนี้ถูกเลือกแล้ว`,
          showConfirmButton: false,
          timer: 1500,
        });
        sourceClone.splice(droppableDestination.index, 0, removed);
        // console.log(sourceClone);
        result["trips"] = sourceClone;
        result["droppableId1"] = state.booking;
        return { result, removed };
      }
      delete removed.destCarId;

      destClone.splice(droppableDestination.index, 0, removed);
      result["trips"] = sourceClone;
      result["droppableId1"] = destClone;
    }
    // console.log(result);
    return { result, removed };
    // }
  };
  const getList = (id) => {
    if (id == "droppable1") return state.booking;
    //return state from component
    else return state.bookingDispatched;
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const onDragEnd = (result) => {
    // console.log(result);
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );
      // console.log(items);
      if (source.droppableId === "droppable1") {
        setState({ ...state, booking: items });
      }
    } else {
      const { result, removed } = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination,
        source.droppableId
      );
      // console.log(result);
      setState({
        ...state,
        booking: result["droppableId1"],
        bookingDispatched: result["trips"],
      });
    }
  };
  // console.log(state)
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };
  const closeSidebar = () => {
    // console.log('closesidebar');
    setSidebar(true);
  };
  // console.log(sidebar);
  function useOutsideAlerter(ref) {
    // console.log(ref);
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        // console.log(ref.current.contains(event.target));
        let focusDatePick = document.querySelector(".ant-picker-focused ");
        // console.log(focusDatePick);
        if (focusDatePick) {
          var datePick = document.querySelector(".ant-picker-dropdown ");
          // console.log(datePick);
        }
        let focusProvinceSelect = document.querySelector(
          ".ant-select-focused "
        );
        // console.log(focusProvinceSelect);
        if (focusProvinceSelect) {
          var provincePick = document.querySelector(".ant-select-dropdown ");
          // console.log(datePick);
        }
        // console.log(ref.current);

        if (ref.current && !ref.current.contains(event.target)) {
          // alert('out')
          if (!datePick && !provincePick) {
            // console.log('!datepick');
            if (sidebar == true) {
              closeSidebar();
            }
          }
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);
  const { Option } = Select;
  const filterBooking = (dataFilter, filter) => {
    // console.log(dataFilter, filter);

    if (filter == "Company") {
      setFilter({ ...filerBooking, search: true, company: dataFilter });
    } else if (filter == "Department") {
      setFilter({ ...filerBooking, search: true, department: dataFilter });
    } else if (filter == "Reason") {
      setFilter({ ...filerBooking, search: true, reason: dataFilter });
    } else if (filter == "Date") {
      setFilter({ ...filerBooking, search: true, date: dataFilter });
    } else if (filter == "Province") {
      setFilter({ ...filerBooking, search: true, province: dataFilter });
    }
  };
  // console.log(filerBooking);
  useEffect(() => {
    // filter
    let countBooking = 0;

    if (filerBooking.search == true) {
      state.booking.map((res) => {
        // console.log(res.destProvince);
        if (res.company == filerBooking.company) {
          countBooking += 1;
        } else if (res.department == filerBooking.department) {
          countBooking += 1;
        } else if (res.reason == filerBooking.reason) {
          countBooking += 1;
        } else if (res.date == filerBooking.date) {
          // console.log(res.date );
          countBooking += 1;
        } else if (res.destProvince == filerBooking.province) {
          countBooking += 1;
        } else if (
          filerBooking.company == "Other" &&
          res.company != "AH" &&
          res.company != "AHP" &&
          res.company != "AHT" &&
          res.company != "AITS" &&
          res.company != "ASICO"
        ) {
          countBooking += 1;
        } else if (
          filerBooking.department == "Other" &&
          res.hrApprove == null &&
          res.department != "Production" &&
          res.department != "production" &&
          res.department != "Marketing" &&
          res.department != "marketing" &&
          res.department != "QA & QC" &&
          res.department != "Personnel" &&
          res.department != "personnel" &&
          res.department != "IT" &&
          res.department != "it" &&
          res.department != "Business Deverlopment" &&
          res.department != "business deverlopment" &&
          res.department != "Purchasing" &&
          res.department != "purchasing" &&
          res.department != "Safety" &&
          res.department != "Safety"
        ) {
          countBooking += 1;
        } else if (
          filerBooking.reason == "Other" &&
          res.reason != "ส่งเอกสาร เก็บเช็ค วางบิล ติดต่อธนาคาร" &&
          res.reason != "ส่งของ" &&
          res.reason != "รับ - ส่งแขก" &&
          res.reason != "ติดต่อลูกค้า"
        ) {
          countBooking += 1;
        }
      });
      // console.log(countBooking);
      setState({ ...state, count: countBooking });
    }
  }, [filerBooking]);
  const clearBtn = () => {
    setFilter({
      search: false,
      company: null,
      department: null,
      reason: null,
      date: null,
      province: null,
    });
    let countData = 0;
    state.booking.map((data) => {
      if (data.hrApprove == null) {
        countData += 1;
      }
    });
    setState({ ...state, count: countData });
  };
  // console.log(test);
  return (
    <div>
      <div className={!sidebar == true ? "contentFilter" : "red"}></div>
      <Row style={{ color: "black" }}>
        <Col span={24}>
          <div>
            <div
              className="padDate"
              style={{
                marginBottom: "16px",
                fontFamily: "Bai Jamjuree",
                fontSize: "1.3em",
              }}
            >
              <p style={{ paddingTop: "4px" }}>
                {new moment().format("DD-MM-YYYY")}{" "}
              </p>
              <div style={{ position: "relative" }}>
                <img
                  style={{ height: "16px", width: "16px" }}
                  src={countRequest}
                />{" "}
                {state.count} รายการ
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <div className="margin font">
        <DragDropContext onDragEnd={onDragEnd}>
          <Row gutter={{ xs: 16, sm: 16 }}>
            <Col xs={{ span: 24 }} sm={{ span: 8 }}>
              <div style={{ position: "relative" }}>
                <div style={{ textAlign: "right", marginBottom: "4px" }}>
                  <span
                    style={{
                      cursor: "pointer",
                      padding: "8px",
                      textAlign: "right",
                    }}
                  >
                    <button
                      onClick={() => {
                        toggleSidebar();
                      }}
                      style={{
                        cursor: "pointer",
                        padding: "8px 16px",
                        fontSize: "1.3em",
                        backgroundColor: "#1D366D",
                        color: "#FFFFFF",
                        borderRadius: "20px",
                        border: "0",
                      }}
                    >
                      <img src={filer} />
                      กรอง
                    </button>
                  </span>
                </div>
                <div
                  ref={wrapperRef}
                  className={
                    sidebar == true ? "sideFilter" : "sideFilter isactive"
                  }
                >
                  <div
                    style={{
                      position: "absolute",
                      color: "black",
                      top: "120px",
                      left: "8%",
                      fontFamily: "Bai Jamjuree",
                    }}
                  >
                    <p>บริษัท</p>
                    <Row>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          value="AH"
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "AH"),
                              (filterType = "Company")
                            )
                          }
                        >
                          AH
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          value="AHP"
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "AHP"),
                              (filterType = "Company")
                            )
                          }
                        >
                          AHP
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          value="AHT"
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "AHT"),
                              (filterType = "Company")
                            )
                          }
                        >
                          AHT
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          value="AITS"
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "AITS"),
                              (filterType = "Company")
                            )
                          }
                        >
                          AITS
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          value="ASICO"
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "ASICO"),
                              (filterType = "Company")
                            )
                          }
                        >
                          ASICO
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          value="Other"
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "Other"),
                              (filterType = "Company")
                            )
                          }
                        >
                          อื่น ๆ
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={1}></Col>
                      <Col span={22}>
                        <hr />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <p>แผนก</p>
                    <Row>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "Production"),
                              (filterType = "Department")
                            )
                          }
                        >
                          Production
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "Marketing"),
                              (filterType = "Department")
                            )
                          }
                        >
                          Marketing
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "QA & QC"),
                              (filterType = "Department")
                            )
                          }
                        >
                          QA & QC
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "Personnel"),
                              (filterType = "Department")
                            )
                          }
                        >
                          Personnel
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "IT"),
                              (filterType = "Department")
                            )
                          }
                        >
                          IT
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "Business Deverlopment"),
                              (filterType = "Department")
                            )
                          }
                        >
                          Business Deverlopment
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "Purchasing"),
                              (filterType = "Department")
                            )
                          }
                        >
                          Purchasing
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "Safety"),
                              (filterType = "Department")
                            )
                          }
                        >
                          Safety
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "Other"),
                              (filterType = "Department")
                            )
                          }
                        >
                          อื่น ๆ
                        </Button>
                      </Col>
                    </Row>

                    <hr style={{ marginRight: "20px" }} />

                    <p>เหตุผลที่ต้องการใช้รถ</p>
                    <Row>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany =
                                "ส่งเอกสาร เก็บเช็ค วางบิล ติดต่อธนาคาร"),
                              (filterType = "Reason")
                            )
                          }
                        >
                          ส่งเอกสาร เก็บเช็ค วางบิล ติดต่อธนาคาร
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "ส่งของ"),
                              (filterType = "Reason")
                            )
                          }
                        >
                          ส่งของ
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "รับ - ส่งแขก"),
                              (filterType = "Reason")
                            )
                          }
                        >
                          รับ - ส่งแขก
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "ติดต่อลูกค้า"),
                              (filterType = "Reason")
                            )
                          }
                        >
                          ติดต่อลูกค้า
                        </Button>
                      </Col>
                      <Col
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Button
                          className="filterbgColor"
                          onClick={(e) =>
                            filterBooking(
                              (filterCompany = "Other"),
                              (filterType = "Reason")
                            )
                          }
                        >
                          อื่น ๆ
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={1}></Col>
                      <Col span={22}>
                        <hr />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <p>วันที่</p>
                    <Row>
                      <Col
                        sm={{ span: 22 }}
                        xs={{ span: 22 }}
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <DatePicker
                          onChange={(e) =>
                            filterBooking(
                              (filterCompany = moment(e).format("DD-MM-YYYY")),
                              (filterType = "Date")
                            )
                          }
                          ref={wrapperRef}
                          style={{ width: "100%" }}
                        />
                      </Col>
                    </Row>
                    <p style={{ paddingTop: "8px" }}>จังหวัด</p>
                    <Row>
                      <Col
                        sm={{ span: 22 }}
                        xs={{ span: 22 }}
                        style={{
                          paddingLeft: "4px",
                          paddingRight: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        <Select
                          onChange={(e) =>
                            filterBooking(
                              (filterCompany = e),
                              (filterType = "Province")
                            )
                          }
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="Select province"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {state.province}
                        </Select>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col span={24} style={{ textAlign: "center" }}>
                        <button
                          onClick={() => clearBtn()}
                          style={{
                            border: " 1px solid #D9D9D9",
                            boxSizing: "border-box",
                            borderRadius: "24px",
                            padding: "8px 16px",
                            fontFamily: "Bai Jamjuree",
                            cursor: "pointer",
                          }}
                        >
                          <img src={clearIcon} />
                          Clear
                        </button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>

              <RequestCar filerBooking={filerBooking} />
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 16 }}>
              <Car testt={state.test2} />
            </Col>
          </Row>
        </DragDropContext>
      </div>
    </div>
  );
};

export default General;
