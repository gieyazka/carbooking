import React, { createContext, useState, useEffect } from "react";
import _ from 'lodash';
import { getBookingDispatch, getCars, getDrivers, getTrips } from '../util/index'
import { Layout, Menu, Select } from 'antd';
import { getTimeProps } from "antd/lib/date-picker/generatePicker";
export const DataContext = createContext([{}, () => { }]);

export default props => {
  const { Option } = Select;

  const [state, setState] = useState({
    booking: [],
    cars: [],
    drivers: [],
    trips: []
  });
  React.useMemo(async () => {
    let booking, cars, drivers, trips
    await getBookingDispatch().then(res => {
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
      driverArr.push(<Option key={i} value={drivers[data].name}>{drivers[data].name}</Option>);
      i++
    }
    setState({ ...state, cars: cars, booking: booking, drivers: driverArr, trips: trips })
  }, [])

  return (
    <DataContext.Provider value={[state, setState]}>
      {props.children}
    </DataContext.Provider>
  );
};
