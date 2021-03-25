import React, { useState, useEffect } from "react";

import {
  loginCheck,
  checkBookingById,
  updateManangerStatus,
  rejectManangerStatus,
} from "../util/index.js";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import loadingLogin from "../asset/wheel.gif";
import GifLoader from "react-gif-loader";
const Approve = () => {
  const [loading, setloading] = useState(true);
  let { id, uuid, type } = useParams();

  React.useEffect(async () => {
    if (type == "approve") {
      await checkBookingById(id).then(async (res) => {
        if (res.data[0].managerApprove !== null) {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: `คำขอของ ${res.data[0].name} ${
              res.data[0].managerApprove === true ? "approve" : "reject"
            } แล้ว`,
            showConfirmButton: false,
            // timer: 1500
          }).then(() => {
            return null;
          });
        } else if (res.data[0].uuid == uuid) {
          await updateManangerStatus(id)
            .then((d) => {
              // console.log(d.data);

              Swal.fire({
                icon: "success",
                title: "Approve success",
                text: `อนุมัติคำขอของ ${d.data.name} สำเร็จ`,
                showConfirmButton: false,
                // timer: 1500
              });
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Approve fail",
                text: "please try again ",
                showConfirmButton: false,
                // timer: 1500
              });
            });
        } else {
          window.open(window.location.origin, "_self");
          // window.close();
        }

        // setBooking(res)
      });
    } else if (type == "reject") {
      await checkBookingById(id).then(async (res) => {
        // console.log(res.data[0], uuid);
        if (res.data[0].managerApprove !== null) {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: `คำขอของ ${res.data[0].name} ${
              res.data[0].managerApprove === true ? "approve" : "reject"
            } แล้ว`,
            showConfirmButton: false,
            // timer: 1500
          }).then(() => {
            return null;
          });
        } else if (res.data[0].uuid == uuid) {
          await rejectManangerStatus(id)
            .then((d) => {
              // console.log(d.data);

              Swal.fire({
                icon: "info",
                title: "Reject success",
                text: `ไม่อนุมัติคำขอของ ${d.data.name} สำเร็จ`,
                showConfirmButton: false,
                // timer: 1500
              });
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Reject fail",
                text: "please try again ",
                showConfirmButton: false,
                // timer: 1500
              });
            });
        } else {
          window.open(window.location.origin, "_self");
          // window.close();
        }

        // setBooking(res)
      });
    }

    setloading(false);
  }, []);

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
    </React.Fragment>
  );
};

export default Approve;
