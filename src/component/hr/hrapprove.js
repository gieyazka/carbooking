import React, { useState, useEffect, useRef, forwardRef } from "react";
import MaterialTable, { MTableBodyRow, MTableToolbar } from "material-table";
import { DataContext } from "../store/store";
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
import user from "../asset/hruser.png";
import calender from "../asset/hrcarender.png";
import location from "../asset/hrlocation.png";
import hrmessage from "../asset/hrmessage.png";
import noDriver from "../asset/noDriver.png";
import statusdriver2 from "../asset/statusdriver2.png";
import countRequest from "../asset/countRequest.png";
import clearIcon from "../asset/clearIcon.png";
import car from "../asset/carblack.png";
import people from "../asset/people.png";
import Swal from "sweetalert2";
import filer from "../asset/filer.png";
import "../form/formrequest.css";
import { createMuiTheme } from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { getBookingHr, handleHrApprove } from "../util/index";
import {
  AddBox,
  ArrowDownward,
  Clear,
  Check,
  ChevronLeft,
  ChevronRight,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
const Hrapprove = () => {
  const TestBtn = Button;
  let filterCompany = null;
  let filterType = null;
  // console.log(res);
  const [sidebar, setSidebar] = useState(true);
  const [bookingData, setBookingData] = useState([]);
  const [defaultBooking, setDefaultBooking] = useState([]);
  const wrapperRef = useRef(null);
  const [state, setState] = React.useContext(DataContext);
  const { Option } = Select;
  const [filerBooking, setFilter] = useState({
    search: false,
    company: null,
    department: null,
    reason: null,
    date: null,
    province: null,
  });
  const { innerHeight, innerWidth } = window;
  // console.log(innerHeight,innerWidth);
  if (innerWidth <= 575) {
    var device = "horizontal";
  } else {
    var device = "vertical";
  }
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };
  const closeSidebar = () => {
    // console.log('closesidebar');
    setSidebar(true);
  };
  const [modal, setModal] = useState({
    carType: null,
    comment: null,
    company: null,
    date: null,
    department: null,
    destProvince: null,
    destination: null,
    endTime: null,
    startTime: null,
    name: null,
    driver: null,
    reason: null,
    totalPassenger: null,
    open: false,
  });
  const [screen, setScreen] = useState(null);
  React.useEffect(() => {
    if (window.innerWidth <= 575) {
      setScreen(true);
    } else {
      setScreen(false);
    }
    console.log(window.innerWidth);
  }, [window.innerWidth]);
  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 575) {
        setScreen(true);
      } else {
        setScreen(false);
      }
    }

    window.addEventListener("resize", handleResize);
  });
  const hrCancleClick = (d) => {
    Swal.fire({
      text: `ไม่อนุมัติจำนวน ${d.length} รายการ ?`,
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "gray",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยืนยัน",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setloading(true);
        for (const res of d) {
          const status = false;
          const id = res.id;
          await handleHrApprove(res.id, status);
        }
        await getBookingHr().then(async (data) => {
          setloading(false);

          Swal.fire({
            text: `ไม่อนุมัติคำขอสำเร็จ`,
            // text: "You won't be able to revert this!",
            icon: "info",
            showConfirmButton: false,
            timer: 1500,
          });
          // setDefaultBooking(data)
          setBookingData(data);
          // return res
        });

        setloading(false);
      }
    });
    // console.log(res);
  };
  const [loading, setloading] = useState(false);

  const hrApproveClick = (d) => {
    console.log(d);

    Swal.fire({
      text: `อนุมัติจำนวน ${d.length} รายการ ?`,
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(43, 164, 65)",
      cancelButtonColor: "gray",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยืนยัน",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setloading(true);
        for (const res of d) {
          const status = true;
          const id = res.id;
          await handleHrApprove(res.id, status);
        }
        await getBookingHr()
          .then(async (data) => {
            Swal.fire({
              text: `อนุมัติคำขอสำเร็จ`,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            // setDefaultBooking(data)
            setBookingData(data);
          })
          .catch((err) => {
            console.log(err);
          });
        setloading(false);
      }
    });
  };

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
    if (filerBooking.search == true) {
      let countBooking = 0;
      var test = [];
      defaultBooking.map((res) => {
        console.log(res.company, filerBooking.company);
        if (res.hrApprove == null && res.company == filerBooking.company) {
          countBooking += 1;
          test.push(res);
        } else if (
          res.hrApprove == null &&
          res.department == filerBooking.department
        ) {
          countBooking += 1;
          test.push(res);
        } else if (res.hrApprove == null && res.reason == filerBooking.reason) {
          countBooking += 1;
          test.push(res);
        } else if (res.hrApprove == null && res.date == filerBooking.date) {
          // console.log(res.date );
          countBooking += 1;
          test.push(res);
        } else if (
          res.hrApprove == null &&
          res.destProvince == filerBooking.province
        ) {
          countBooking += 1;
          test.push(res);
        } else if (
          filerBooking.company == "Other" &&
          res.hrApprove == null &&
          res.company != "AH" &&
          res.company != "AHP" &&
          res.company != "AHT" &&
          res.company != "AITS" &&
          res.company != "ASICO"
        ) {
          countBooking += 1;
          test.push(res);
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
          test.push(res);
        } else if (
          res.hrApprove == null &&
          filerBooking.reason == "Other" &&
          res.reason != "ส่งเอกสาร เก็บเช็ค วางบิล ติดต่อธนาคาร" &&
          res.reason != "ส่งของ" &&
          res.reason != "รับ - ส่งแขก" &&
          res.reason != "ติดต่อลูกค้า"
        ) {
          countBooking += 1;
          test.push(res);
        }
        console.log(test);
      });
      setBookingData(test);
      // console.log(countBooking);
      setCount(countBooking);
    }
  }, [filerBooking]);
  // console.log(filerBooking);

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
    defaultBooking.map((data) => {
      if (data.hrApprove == null) {
        countData += 1;
      }
    });
    setBookingData(defaultBooking);
    setCount(countData);
  };
  // console.log(filerBooking);
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
  const showData = ({
    needDriver,
    totalPassenger,
    carType,
    comment,
    company,
    date,
    department,
    destProvince,
    destination,
    endTime,
    startTime,
    name,
    driver,
    reason,
  }) => {
    // console.log(carType, comment, company, reason);
    setModal({
      needDriver,
      totalPassenger,
      carType,
      comment,
      company,
      date,
      department,
      destProvince,
      destination,
      endTime,
      startTime,
      name,
      driver,
      reason,
      open: true,
    });
  };
  useOutsideAlerter(wrapperRef);
  const [count, setCount] = useState(0);
  React.useMemo(async () => {
    const bookingControl = async () => {
      setBookingData(
        await getBookingHr().then(async (res) => {
          console.log(res);
          setDefaultBooking(res);
          let countData = 0;
          res.map((data) => {
            if (data.hrApprove == null) {
              countData += 1;
            }
          });
          setCount(countData);
          return res;
        })
      );
    };
    await bookingControl();
  }, []);
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#1D366D",
      },
      secondary: {
        main: "#1D366D",
      },
    },
  });
  // console.log(bookingData[0] && JSON.parse(bookingData[0].destProvince)[0]);
  if (!screen) {
    return (
      <div>
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
            src="/static/media/wheel.7bfd793f.gif"
            style={{
              borderRadius: "10px",
              top: "50%",
              left: "50%",
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
        <div
          style={{ zIndex: 90 }}
          className={!sidebar == true ? "contentFilter" : "red"}
        ></div>
        <div
          className="padDate"
          style={{
            marginBottom: "16px",
            fontFamily: "Bai Jamjuree",
            fontSize: "1.3em",
          }}
        >
          <p style={{ color: "black", paddingTop: "4px" }}>
            {new moment().format("DD-MM-YYYY")}{" "}
          </p>
          <div style={{ position: "relative" }}>
            <img style={{ height: "16px", width: "16px" }} src={countRequest} />{" "}
            <span style={{ color: "black" }}>{count} รายการ </span>
            <span style={{ padding: "8px" }}>
              <button
                onClick={() => {
                  toggleSidebar();
                }}
                style={{
                  cursor: "pointer",
                  padding: "4px 12px",
                  fontSize: "1em",
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
            <div
              style={{ zIndex: 999 }}
              ref={wrapperRef}
              className={sidebar == true ? "sideFilter" : "sideFilter isactive"}
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
        </div>
        <div className="margin hrfont">
          <Row gutter={{ xs: 24, sm: 24 }}>
            <Col span={24}>
              <MuiThemeProvider theme={theme}>
                <MaterialTable
                  components={{
                    Toolbar: (props) => (
                      <div style={{ backgroundColor: "#1D366D" }}>
                        <MTableToolbar {...props} />
                      </div>
                    ),
                  }}
                  actions={[
                    {
                      icon: () => <VisibilityIcon />,
                      tooltip: "View detail",
                      onClick: (event, rowData) => showData(rowData),
                      position: "row",
                    },

                    {
                      tooltip: "Reject",
                      icon: () => (
                        <ThumbDownAltOutlinedIcon
                          style={{ color: "#1D366D" }}
                        />
                      ),
                      onClick: (evt, data) => hrCancleClick(data),
                    },
                    {
                      tooltip: "Approve",
                      icon: () => (
                        <ThumbUpAltOutlinedIcon style={{ color: "#1D366D" }} />
                      ),
                      onClick: (evt, data) => hrApproveClick(data),
                    },
                  ]}
                  data={bookingData}
                  icons={tableIcons}
                  columns={[
                    { title: "ชื่อ", field: "name" },
                    { title: "แผนก", field: "department" },
                    {
                      title: "สถานที่ไป",
                      render: (rowData) =>
                        JSON.parse(rowData.destination) + " ",
                    },
                    {
                      title: "จังหวัด",
                      render: (rowData) =>
                        JSON.parse(rowData.destProvince) + " ",
                    },
                    { title: "เหตุผล", field: "reason" },
                    {
                      title: "วันที่",
                      render: (rowData) =>
                        moment(rowData.date, "YYYYMMDD").format("DD-MM-YYYY"),
                    },
                    {
                      title: "เวลา",
                      render: (rowData) =>
                        rowData.startTime + " - " + rowData.endTime,
                    },
                  ]}
                  localization={{
                    toolbar: {
                      nRowsSelected: "{0} booking is selected",
                    },
                    header: {
                      actions: "",
                    },
                  }}
                  options={{
                    rowStyle: (rowData) => ({
                      backgroundColor: rowData.tableData.checked
                        ? "#37b15933"
                        : "#FFF",
                    }),
                    searchFieldStyle: { background: "red" },
                    actionsColumnIndex: -1,
                    selection: true,
                    search: false,
                    sorting: true,
                  }}
                  title=""
                />
              </MuiThemeProvider>
            </Col>
          </Row>
        </div>
        <Modal
          visible={modal.open}
          // onOk={handleOk}
          onCancel={() => {
            setModal({ ...modal, open: false });
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
              {modal.needDriver ? (
                <img src={statusdriver2} />
              ) : (
                <img src={noDriver} />
              )}
              &nbsp; <span style={{ marginTop: "8%" }}>คนขับรถ</span>{" "}
            </span>
            <img src={car} />{" "}
            <span style={{ paddingLeft: "4%" }}> {modal.carType} </span>
          </div>
          <div style={{ paddingTop: "4%" }}>
            <img src={user} />{" "}
            <span style={{ position: "relative", paddingLeft: "4%" }}>
              {" "}
              {modal.name} ({modal.company}){" "}
            </span>
          </div>

          <div style={{ paddingTop: "4%" }}>
            <img src={calender} />{" "}
            <span style={{ position: "relative", paddingLeft: "4%" }}>
              {modal.date} &nbsp; &nbsp; {modal.startTime} - {modal.endTime}{" "}
            </span>
          </div>
          <div style={{ paddingTop: "4%" }}>
            <img src={location} />{" "}
            <span style={{ position: "relative", paddingLeft: "4%" }}>
              {" "}
              {JSON.parse(modal.destination) + " "} &nbsp;{" "}
              {JSON.parse(modal.destProvince) + " "}
            </span>
          </div>
          <div style={{ paddingTop: "4%" }}>
            <img src={hrmessage} />{" "}
            <span style={{ position: "relative", paddingLeft: "4%" }}>
              {" "}
              {modal.reason}
            </span>
          </div>
          <div style={{ paddingTop: "4%" }}>
            <img src={people} />{" "}
            <span style={{ position: "relative", paddingLeft: "4%" }}>
              {" "}
              จำนวน {modal.totalPassenger} คน
            </span>
          </div>
          <div style={{ paddingTop: "4%" }}>
            <p>เหตุผลที่ต้องการใช้รถ : {modal.reason}</p>
          </div>
          <div>
            <p>รายละเอียดอื่น ๆ : {modal.comment || " - "}</p>
          </div>
        </Modal>
      </div>
    );
  } else {
    return (
      <React.Fragment>
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
            src="/static/media/wheel.7bfd793f.gif"
            style={{
              borderRadius: "10px",
              top: "50%",
              left: "50%",
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
        <div
          style={{ zIndex: 90 }}
          className={!sidebar == true ? "contentFilter" : "red"}
        ></div>
        <div
          className="padDate"
          style={{
            marginBottom: "16px",
            fontFamily: "Bai Jamjuree",
            fontSize: "1.3em",
          }}
        >
          <p style={{ color: "black", paddingTop: "4px" }}>
            {new moment().format("DD-MM-YYYY")}{" "}
          </p>
          <div style={{ position: "relative" }}>
            <img style={{ height: "16px", width: "16px" }} src={countRequest} />{" "}
            <span style={{ color: "black" }}>{count} รายการ </span>
            <span style={{ padding: "8px" }}>
              <button
                onClick={() => {
                  toggleSidebar();
                }}
                style={{
                  cursor: "pointer",
                  padding: "4px 12px",
                  fontSize: "1em",
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
            <div
              style={{ zIndex: 999 }}
              ref={wrapperRef}
              className={sidebar == true ? "sideFilter" : "sideFilter isactive"}
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
        </div>
        <div className="margin hrfont">
          <Row gutter={{ xs: 24, sm: 24 }}>
            <Col span={24}>
              <MuiThemeProvider theme={theme}>
                <MaterialTable
                  components={{
                    Toolbar: (props) => (
                      <div style={{ backgroundColor: "#1D366D" }}>
                        <MTableToolbar {...props} />
                      </div>
                    ),
                  }}
                  actions={[
                    {
                      icon: () => <VisibilityIcon />,
                      tooltip: "View detail",
                      onClick: (event, rowData) => showData(rowData),
                      position: "row",
                    },

                    {
                      tooltip: "Reject",
                      icon: () => (
                        <ThumbDownAltOutlinedIcon
                          style={{ color: "#1D366D" }}
                        />
                      ),
                      onClick: (evt, data) => hrCancleClick(data),
                    },
                    {
                      tooltip: "Approve",
                      icon: () => (
                        <ThumbUpAltOutlinedIcon style={{ color: "#1D366D" }} />
                      ),
                      onClick: (evt, data) => hrApproveClick(data),
                    },
                  ]}
                  data={bookingData}
                  icons={tableIcons}
                  columns={[
                    { title: "แผนก", field: "department" },
                    {
                      title: "สถานที่ไป",
                      render: (rowData) =>
                        JSON.parse(rowData.destination) + " ",
                    },

                    {
                      title: "วันที่",
                      render: (rowData) =>
                        moment(rowData.date, "YYYYMMDD").format("DD-MM-YYYY"),
                    },
                  ]}
                  localization={{
                    toolbar: {
                      nRowsSelected: "{0} รายการ",
                    },
                    header: {
                      actions: "",
                    },
                  }}
                  options={{
                    rowStyle: (rowData) => ({
                      backgroundColor: rowData.tableData.checked
                        ? "#37b15933"
                        : "#FFF",
                    }),
                    searchFieldStyle: { background: "red" },
                    actionsColumnIndex: -1,
                    selection: true,
                    search: false,
                    sorting: true,
                  }}
                  title=""
                />
              </MuiThemeProvider>
            </Col>
          </Row>
        </div>
        <Modal
          visible={modal.open}
          // onOk={handleOk}
          onCancel={() => {
            setModal({ ...modal, open: false });
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
              {modal.needDriver ? (
                <img src={statusdriver2} />
              ) : (
                <img src={noDriver} />
              )}
              &nbsp; <span style={{ marginTop: "8%" }}>คนขับรถ</span>{" "}
            </span>
            <img src={car} />{" "}
            <span style={{ paddingLeft: "4%" }}> {modal.carType} </span>
          </div>
          <div style={{ paddingTop: "4%" }}>
            <img src={user} />{" "}
            <span style={{ position: "relative", paddingLeft: "4%" }}>
              {" "}
              {modal.name} ({modal.company}){" "}
            </span>
          </div>

          <div style={{ paddingTop: "4%" }}>
            <img src={calender} />{" "}
            <span style={{ position: "relative", paddingLeft: "4%" }}>
              {modal.date} &nbsp; &nbsp; {modal.startTime} - {modal.endTime}{" "}
            </span>
          </div>
          <div style={{ paddingTop: "4%" }}>
            <img src={location} />{" "}
            <span style={{ position: "relative", paddingLeft: "4%" }}>
              {" "}
              {JSON.parse(modal.destination) + " "} &nbsp;{" "}
              {JSON.parse(modal.destProvince) + " "}
            </span>
          </div>
          <div style={{ paddingTop: "4%" }}>
            <img src={hrmessage} />{" "}
            <span style={{ position: "relative", paddingLeft: "4%" }}>
              {" "}
              {modal.reason}
            </span>
          </div>
          <div style={{ paddingTop: "4%" }}>
            <img src={people} />{" "}
            <span style={{ position: "relative", paddingLeft: "4%" }}>
              {" "}
              จำนวน {modal.totalPassenger} คน
            </span>
          </div>
          <div style={{ paddingTop: "4%" }}>
            <p>เหตุผลที่ต้องการใช้รถ : {modal.reason}</p>
          </div>
          <div>
            <p>รายละเอียดอื่น ๆ : {modal.comment || " - "}</p>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
};
export default Hrapprove;
