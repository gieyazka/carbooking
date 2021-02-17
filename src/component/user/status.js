import React, { useState, useRef, useReducer, Fragment } from "react";
import { DataContext } from "../store/store";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../form/formrequest.css";
import IconCar from "./iconCarGuard.js";
import {
  Modal,
  Steps,
  Spin,
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

import calender from "../asset/hrcarender.png";
import location from "../asset/hrlocation.png";
import car from "../asset/carblack.png";
import hrmessage from "../asset/hrmessage.png";
import people from "../asset/people.png";
import statusdriver2 from "../asset/statusdriver2.png";
import noDriver from "../asset/noDriver.png";
import { getAllTrips, editTrips, getBookingStatus } from "../util/index";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { set } from "lodash";
import "moment/locale/th";
var _ = require("lodash");

const Trips = () => {
  const { Step } = Steps;
  // console.log(moment());
  const [date, setDate] = useState(new moment());
  const localizer = momentLocalizer(moment);
  var data = [];
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
  const handleCancel = () => {
    setModalData({ ...modalData, open: false });
  };
  const handleTripCancel = () => {
    setTripModal({ ...tripModal, open: false });
  };
  const tripsControl = async (d) => {
    setTripModal({ ...tripModal, updateTrip: d, open: true });
  };
  const loginEmpId = JSON.parse(sessionStorage.getItem("user")).emp_id;

  React.useMemo(async () => {
    await getBookingStatus(loginEmpId).then((res) => {
      // console.log(res);
      for (const d of res) {
        // console.log(d.date);
        // console.log(moment('03-02-2021', 'DD-MM-YYYY')._d);
        data.push({
          id: d.id,
          data: d,
          title: `${JSON.parse(d.destination) + " "} ${
            JSON.parse(d.destProvince) + " "
          }`,
          allDay: false,
          start: moment(d.date, "YYYYMMDD")._d,
          end: moment(d.date, "YYYYMMDD")._d,
        });
      }
      // console.log(data)
      setTripDetail({ ...tripDetail, allTrips: res, events: data });
    });
  }, []);
  // console.log(modalData);
  var i = 0;

  return (
    <Fragment>
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
          // culture='ar-AE'
          localizer={localizer}
          events={tripDetail.events}
          startAccessor="start"
          endAccessor="end"
          date={date._d}
          style={{ height: "80vh", color: "black" }}
          views={{ month: true }}
          toolbar={false}
          onNavigate={date._d}
          onSelectEvent={(event) => handleCalendarEvent(event.data)}
        />
      </div>

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
                <img src={calender} />{" "}
                <span style={{ position: "relative", paddingLeft: "4%" }}>
                  {" "}
                  {modalData.tripData.date} {modalData.tripData.startTime} -{" "}
                  {modalData.tripData.endTime}
                </span>
              </div>
              <div style={{ paddingTop: "4%" }}>
                <img src={location} />{" "}
                <span style={{ position: "relative", paddingLeft: "4%" }}>
                  {" "}
                  {JSON.parse(modalData.tripData.destination) + " "} &nbsp;{" "}
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
              <div
                style={{
                  position: "relative",
                  paddingTop: "4%",
                  textAlign: "center",
                }}
              >
                <h3>Status</h3>
                <Row
                  align="center"
                  //   style={{ marginLeft: "53%", transform: "translateX(-50%)" }}
                  //   style={{ display: "flex", justifyContent: "center" }}
                >
                  <Col justify={24}>
                    <Steps
                      current={
                        modalData.tripData.dispatch === false
                          ? modalData.tripData.managerApprove === null
                            ? 0
                            : modalData.tripData.hrApprove === null ||
                              modalData.tripData.hrApprove === false
                            ? 1
                            : 2
                          : 3
                      }
                      direction="vertical"
                    >
                      <Step
                        title={
                          modalData.tripData.managerApprove === null
                            ? "รอการอนุมัติจาก Manager"
                            : modalData.tripData.managerApprove === true
                            ? "Manager อนุมัติแล้ว"
                            : "Hr ไม่อนุมัติ"
                        }
                        icon={
                          modalData.tripData.managerApprove !== null ? (
                            modalData.tripData.managerApprove === true ? (
                              <CheckCircleOutlined />
                            ) : (
                              <CloseCircleOutlined />
                            )
                          ) : (
                            <LoadingOutlined />
                          )
                        }
                      />
                      <Step
                        title={
                          modalData.tripData.managerApprove === null
                            ? "รอการอนุมัติจาก Manager"
                            : modalData.tripData.managerApprove === true
                            ? modalData.tripData.hrApprove === null
                              ? "รอการอนุมัติจาก Hr"
                              : modalData.tripData.hrApprove === true
                              ? "Hr อนุมัติแล้ว"
                              : "Hr ไม่อนุมัติ"
                            : "Manager ไม่อนุมัตื"
                        }
                        icon={
                          modalData.tripData.hrApprove !== null ? (
                            modalData.tripData.hrApprove === true ? (
                              <CheckCircleOutlined />
                            ) : (
                              <CloseCircleOutlined />
                            )
                          ) : (
                            <LoadingOutlined />
                          )
                        }
                      />
                      <Step
                        title={
                          modalData.tripData.hrApprove === null
                            ? "รอการอนุมัติจาก Hr"
                            : modalData.tripData.hrApprove === true
                            ? modalData.tripData.dispatch
                              ? "จับคู่รถแล้ว"
                              : "รอจับคู่รถ"
                            : "Hr ไม่อนุมัตื"
                        }
                        icon={
                          modalData.tripData.dispatch ? (
                            modalData.tripData.dispatch === true ? (
                              <CheckCircleOutlined />
                            ) : (
                              <LoadingOutlined />
                            )
                          ) : (
                            <LoadingOutlined />
                          )
                        }
                      />
                      <Step
                        title={
                          modalData.tripData.status == "trip"
                            ? "งานกำลังดำเนินอยู่"
                            : modalData.tripData.status == "finish"
                            ? "งานเสร็จสิ้นแล้ว"
                            : modalData.tripData.dispatch === true
                            ? "รอคนขับรถเริ่มงาน"
                            : "Waiting"
                        }
                        icon={
                          <IconCar
                            color={
                              modalData.tripData.status == "trip"
                                ? "#FEAB20"
                                : modalData.tripData.status == "finish"
                                ? "#309E48"
                                : "rgba(0,0,0,0.38)"
                            }
                          />
                        }
                      />
                    </Steps>
                  </Col>
                </Row>
              </div>
            </div>
          </>
        ) : null}
      </Modal>
    </Fragment>
    // </div>
  );
};

export default Trips;
