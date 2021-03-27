import ReactDOM from "react-dom";
import React from "react";
import { Select } from "antd";

const { Option } = Select;

const SelectCar = ({ car, parentCallback }) => {
  function handleChange(value) {
    // console.log(value);
    // console.log(props);
    parentCallback(value);
    // console.log(props.car);
  }
  return (
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      placeholder="เลือกทะเบียนรถ"
      onChange={handleChange}
      optionLabelProp="label"
    >
      {car.map((d) => (
        <Option key={d.id} value={d.plateNo} label={d.plateNo}>
          <div className="demo-option-label-item">
            <span role="img" aria-label={d.plateNo}>
              {d.plateNo}
            </span>
            &nbsp;{d.province}
          </div>
        </Option>
      ))}
    </Select>
  );
};

export default SelectCar;
