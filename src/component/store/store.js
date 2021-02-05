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


  return (
    <DataContext.Provider value={[state, setState]}>
      {props.children}
    </DataContext.Provider>
  );
};
