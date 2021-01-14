import React, { createContext, useState, useEffect } from "react";
import _ from 'lodash';
import { getBookingDispatch, getCars, getDrivers, getTrips } from '../util/index'
import { Layout, Menu, Select } from 'antd';
import { getTimeProps } from "antd/lib/date-picker/generatePicker";
import dataProvince from '../../province.json'
export const DataContext = createContext([{}, () => { }]);

export default props => {
  const { Option } = Select;

  const [state, setState] = useState({
    booking: [],
    cars: [],
    drivers: [],
    trips: [],
    count: 0
  });
  // React.useMemo(() => {

  //   setState({
  //     ...state, province: provinceArray
  //   })
  // }, [])
  React.useMemo(async () => {
    let booking, cars, drivers, trips, countData = 0
    var provinceArray = []

    var i = 0
    for (const data in dataProvince) {
      provinceArray.push(<Option key={i} value={dataProvince[data].name.th}>{dataProvince[data].name.th}</Option>);
      i++
    }
    await getBookingDispatch().then(res => {
      res.map(data => {
        countData += 1
      })
      booking = res
    })
    await getCars().then(res => {
      cars = res
    })
    await getDrivers().then(res => {
      drivers = res
    })
    await getTrips().then(res => {
      trips = res
    })
    var i = 0
    let driverArr = []
    for (const data in drivers) {
      driverArr.push(<Option key={i} value={drivers[data].id}>{drivers[data].name}</Option>);
      i++
    }
    setState({ ...state, province: provinceArray, cars: cars, booking: booking, drivers: driverArr, trips: trips, count: countData })
  }, [])

  return (
    <DataContext.Provider value={[state, setState]}>
      {props.children}
    </DataContext.Provider>
  );
};
