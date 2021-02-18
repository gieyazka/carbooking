import React, { useState } from "react";
// import { Page } from "react-pdf";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import UserManual from "../manual/UserManual.pdf";
import HrManual from "../manual/HrManual.pdf";
import DriverManual from "../manual/DriverManual.pdf";
import DispatchManual from "../manual/DispatchManual.pdf";
import styled from "styled-components";

const NextPageBtn = styled.span`
  background: #1d366d;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  margin: 0px 8px;
  :hover {
    cursor: pointer;
  }
`;
function MyApp(props) {
  console.log(props);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const controlPage = (page, type) => {
    if (
      (pageNumber != numPages && type == "next") ||
      (pageNumber - 1 != 0 && type == "last")
    ) {
      setPageNumber(pageNumber + page);
    }
  };
  return (
    <div
      style={{
        color: "black",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span style={{ marginTop: "24px", marginBottom: "24px" }}>
        <NextPageBtn onClick={() => controlPage(-1, "last")}>
          Previous page
        </NextPageBtn>
        Page {pageNumber} of {numPages}
        <NextPageBtn onClick={() => controlPage(1, "next")}>
          Next page
        </NextPageBtn>
      </span>

      <Document
        file={
          props.loginData.role
            ? props.loginData.role == "driver"
              ? DriverManual
              : props.loginData.role == "dispatch"
              ? DispatchManual
              : props.loginData.role == "hr"
              ? HrManual
              : UserManual
            : UserManual
        }
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
}
export default MyApp;
