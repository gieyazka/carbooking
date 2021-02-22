import React, { useState, useEffect, useRef } from "react";

import {
  getTripsSinceDate,
  loginCheck,
  checkBookingById,
  updateManangerStatus,
  rejectManangerStatus,
} from "../util/index.js";
// import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
// import Swal from 'sweetalert2'
import moment from "moment";
import _ from "lodash";
import { Row, Col, Input, Card, Modal, DatePicker } from "antd";
import IconCar from "./iconCarGuard.js";
import aapicoicon from "../asset/AapicoIcon.png";
const Guard = () => {
  const [modal, setModal] = useState({ open: false });
  const [stateTripDatail, setStateTripDetail] = useState();
  const { Meta } = Card;
  const sarchInput = useRef(null);
  const [date, setDate] = useState(moment().format("YYYYMMDD"));
  const getTripipData = async (d) => {
    await getTripsSinceDate(d).then((res) => {
      // console.log(d);
      setStateTripDetail(res);
    });
  };
  const timeout = setTimeout(() => {
    getTripipData(date);
  }, 3000);
  React.useEffect(async () => {
    return () => window.clearTimeout(timeout);
  }, [stateTripDatail]);
  const onChangeDate = async (newDate) => {
    // console.log(newDate);
    setDate(newDate);
  };

  const searchCar = (searchValue) => {
    // console.log(searchValue);
    let carSearch = stateTripDatail.filter(
      (d) =>
        d.car.plateNo == searchValue &&
        d.status != "finish" &&
        d.status != "off"
    );
    carSearch = _.sortBy(carSearch, [
      function (o) {
        return o.date;
      },
    ]);
    if (carSearch[0]) {
      console.log(carSearch[0]);
      setModal({ open: true, tripData: carSearch[0] });
    } else {
      alert("ไม่พบเลขทะเบียนนี้");
    }
  };
  return (
    <React.Fragment>
      <div style={{ margin: "24px 36px" }}>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <p
              style={{
                fontSize: "2em",
                fontFamily: "Bai Jamjuree",
                fontWeight: "700",
                lineHeight: "30px",
                letter: "-2%",
              }}
            >
              {" "}
              <img style={{ marginRight: "20px" }} src={aapicoicon} />{" "}
              Carbooking System{" "}
            </p>
          </Col>
          <Col span={12}>
            <p
              style={{
                position: "absolute",
                right: "12%",
                top: "40%",
                transform: "translateY(-50%)",
                fontWeight: 500,
                fontStyle: "normal",
                lineHeight: "22.4px",
                fontSize: "16px",
              }}
            >
              ค้นหาทะเบียนรถ
              <Input
                ref={sarchInput}
                placeholder="1กก 1234"
                style={{ width: "auto", marginLeft: "8px" }}
              />
              <div
                className="button5"
                onClick={() => {
                  searchCar(sarchInput.current.state.value);
                }}
                style={{
                  cursor: "pointer",
                  marginLeft: "8px",
                  backgroundColor: "#A0AEC0",
                }}
              >
                ค้นหา
              </div>
            </p>
          </Col>
        </Row>
        <Row justify="space-between ">
          <Col span={6}>
            <DatePicker
              onChange={(v) => {
                onChangeDate(moment(v).format("YYYYMMDD"));
              }}
            />
          </Col>
          <Col span={12}>
            <IconCar color="rgba(0,0,0,0.38)" /> &nbsp; &nbsp;ยังไม่ออกจากบริษัท
            &nbsp; &nbsp;
            <IconCar color="#FEAB20" /> &nbsp; &nbsp;กำลังดำเนินการอยู่&nbsp;
            &nbsp;
            <IconCar color="#309E48" /> &nbsp; &nbsp;เสร็จงานแล้ว
          </Col>
          {/* <Col span={4}>col-4</Col>
          <Col span={4}>col-4</Col> */}
        </Row>
        <Row style={{ marginTop: "24px" }} gutter={[8, 8]}>
          {stateTripDatail &&
            stateTripDatail.map((res) => (
              <Col
                xs={{ span: 8 }}
                sm={{ span: 8 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
              >
                <Card
                  hoverable
                  style={{
                    width: "20vw",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
                  }}
                  cover={
                    <img
                      alt="example"
                      src={
                        res.car.picture[res.car.picture.length - 1]
                          ? `https://ess.aapico.com${
                              res.car.picture[res.car.picture.length - 1].url
                            }`
                          : "https://static1.cargurus.com/gfx/reskin/no-image-available.jpg?io=true&format=jpg&auto=webp"
                      }
                    />
                  }
                >
                  <Row gutter={[8, 8]}>
                    <Col span={10}>
                      {" "}
                      <p
                        style={{
                          fontWeight: 400,
                          style: "normal",
                          lineHeight: "140%",
                        }}
                      >
                        ทะเบียน
                      </p>
                    </Col>
                    <Col span={14}>
                      {" "}
                      <p
                        style={{
                          fontWeight: 400,
                          style: "normal",
                          lineHeight: "140%",
                        }}
                      >
                        {res.car.plateNo}{" "}
                      </p>
                    </Col>
                    <Col span={10}> </Col>
                    <Col span={14}>
                      {" "}
                      <p
                        style={{
                          fontWeight: 400,
                          style: "normal",
                          lineHeight: "140%",
                        }}
                      >
                        {res.car.province}
                      </p>
                    </Col>
                    <Col span={10}>
                      {" "}
                      <p
                        style={{
                          fontWeight: 400,
                          style: "normal",
                          lineHeight: "140%",
                        }}
                      >
                        ผู้ขับ
                      </p>
                    </Col>
                    <Col span={14}>
                      {" "}
                      <p
                        style={{
                          fontWeight: 400,
                          style: "normal",
                          lineHeight: "140%",
                        }}
                      >
                        {res.driver ? res.driver.name : res.name}
                      </p>
                    </Col>
                    <Col span={10}>
                      {" "}
                      <p
                        style={{
                          fontWeight: 400,
                          style: "normal",
                          lineHeight: "140%",
                        }}
                      >
                        เลขไมล์ ออก
                      </p>
                    </Col>
                    <Col span={14}>
                      {" "}
                      <p
                        style={{
                          fontWeight: 400,
                          style: "normal",
                          lineHeight: "140%",
                        }}
                      >
                        {res.car.mileage}{" "}
                      </p>
                    </Col>
                    <Col span={10}>
                      {" "}
                      <p
                        style={{
                          fontWeight: 400,
                          style: "normal",
                          lineHeight: "140%",
                        }}
                      >
                        เลขไมล์ เข้า
                      </p>
                    </Col>
                    <Col span={14}>
                      {" "}
                      <p
                        style={{
                          fontWeight: 400,
                          style: "normal",
                          lineHeight: "140%",
                        }}
                      >
                        {res.stopMileage || "-"}
                      </p>
                    </Col>
                    <div
                      style={{ position: "absolute", bottom: 52, right: 20 }}
                    >
                      <IconCar
                        color={
                          res.status == "trip"
                            ? "#FEAB20"
                            : res.status == "finish"
                            ? "#309E48"
                            : "rgba(0,0,0,0.38)"
                        }
                      />
                    </div>
                  </Row>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
      {modal && modal.tripData ? (
        <Modal
          width="70vw"
          visible={modal.open}
          // onOk={handleOk}
          onCancel={() => {
            setModal({ open: false });
          }}
          footer={[]}
        >
          <div
            style={{
              margin: "24px 24px",
              position: "relative",
              fontFamily: "Bai Jamjuree",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "16px",
              lineHeight: "140%",
            }}
          >
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Card
                  hoverable
                  style={{
                    width: "auto",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={
                      modal.tripData.car.picture[
                        modal.tripData.car.picture.length - 1
                      ]
                        ? `https://ess.aapico.com${
                            modal.tripData.car.picture[
                              modal.tripData.car.picture.length - 1
                            ].url
                          }`
                        : "https://static1.cargurus.com/gfx/reskin/no-image-available.jpg?io=true&format=jpg&auto=webp"
                    }
                  />
                  <h2
                    style={{
                      marginTop: "8px",
                      textAlign: "center",
                      fontWeight: 400,
                      style: "normal",
                      lineHeight: "140%",
                    }}
                  >
                    {modal.tripData.car.plateNo} {modal.tripData.car.province}
                  </h2>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  hoverable
                  style={{
                    width: "auto",
                    position: "relative",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <h1>ผู้ขับ</h1>
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={
                      modal.tripData.driver
                        ? modal.tripData.driver.picture[
                            modal.tripData.driver.picture.length - 1
                          ]
                          ? `https://ess.aapico.com${
                              modal.tripData.driver.picture[
                                modal.tripData.driver.picture.length - 1
                              ].url
                            }`
                          : "https://static1.cargurus.com/gfx/reskin/no-image-available.jpg?io=true&format=jpg&auto=webp"
                        : "https://static1.cargurus.com/gfx/reskin/no-image-available.jpg?io=true&format=jpg&auto=webp"
                    }
                  />
                  <h2
                    style={{
                      marginTop: "8px",
                      textAlign: "center",
                      fontWeight: 400,
                      style: "normal",
                      lineHeight: "140%",
                    }}
                  >
                    {modal.tripData.driver ? modal.tripData.driver.name : "-"}{" "}
                    {modal.tripData.driver
                      ? modal.tripData.driver.lastname
                      : "-"}
                  </h2>
                </Card>
              </Col>

              <Col span={12}>
                <Card
                  hoverable
                  style={{
                    width: "auto",
                    position: "relative",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <h2
                    style={{
                      marginTop: "8px",
                      fontWeight: 400,
                      style: "normal",
                      lineHeight: "140%",
                    }}
                  >
                    วันที่ :{" "}
                    {moment(modal.tripData.date, "YYYYMMDD").format(
                      "DD-MM-YYYY"
                    )}
                  </h2>

                  <h2
                    style={{
                      marginTop: "8px",
                      fontWeight: 400,
                      style: "normal",
                      lineHeight: "140%",
                    }}
                  >
                    เลขไมล์ออก
                  </h2>
                  <h2
                    style={{
                      marginTop: "8px",
                      fontWeight: 400,
                      style: "normal",
                      lineHeight: "140%",
                    }}
                  >
                    {modal.tripData.startMileage || "-"}
                  </h2>
                  <h2
                    style={{
                      marginTop: "8px",
                      fontWeight: 400,
                      style: "normal",
                      lineHeight: "140%",
                    }}
                  >
                    เลขไมล์เข้า
                  </h2>
                  <h2
                    style={{
                      marginTop: "8px",
                      fontWeight: 400,
                      style: "normal",
                      lineHeight: "140%",
                    }}
                  >
                    {modal.tripData.stopMileage || "-"}
                  </h2>
                  <div style={{ textAlign: "center" }}>
                    <IconCar
                      color={
                        modal.tripData.status == "trip"
                          ? "#FEAB20"
                          : modal.tripData.status == "finish"
                          ? "#309E48"
                          : "rgba(0,0,0,0.38)"
                      }
                    />
                  </div>
                </Card>
              </Col>

              <Col span={12}>
                <Card
                  hoverable
                  style={{
                    width: "auto",
                    position: "relative",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <Row>
                    <Col span={12}>
                      <h2
                        style={{
                          marginTop: "8px",
                          fontWeight: 400,
                          style: "normal",
                          lineHeight: "140%",
                        }}
                      >
                        สถานที่
                      </h2>
                      {modal.tripData.bookings.map((res) => (
                        <h2
                          style={{
                            marginTop: "8px",
                            fontWeight: 400,
                            style: "normal",
                            lineHeight: "140%",
                          }}
                        >
                          {JSON.parse(res.destination) + " " || "-"}
                        </h2>
                      ))}
                    </Col>
                    <Col span={12}>
                      <h2
                        style={{
                          marginTop: "8px",
                          fontWeight: 400,
                          style: "normal",
                          lineHeight: "140%",
                        }}
                      >
                        จังหวัด
                      </h2>
                      {modal.tripData.bookings.map((r) => (
                        <h2
                          style={{
                            marginTop: "8px",
                            fontWeight: 400,
                            style: "normal",
                            lineHeight: "140%",
                          }}
                        >
                          {JSON.parse(r.destProvince) + " " || "-"}
                        </h2>
                      ))}{" "}
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "24px" }}>
                    <Col>
                      <h2
                        style={{
                          marginTop: "8px",
                          fontWeight: 400,
                          style: "normal",
                          lineHeight: "140%",
                        }}
                      >
                        เหตุผลที่ใช้รถ
                      </h2>

                      {modal.tripData.bookings.map((r) => (
                        <h2
                          style={{
                            marginTop: "8px",
                            fontWeight: 400,
                            style: "normal",
                            lineHeight: "140%",
                          }}
                        >
                          {r.reason || "-"}
                        </h2>
                      ))}
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </Modal>
      ) : null}
    </React.Fragment>
  );
};

export default Guard;
