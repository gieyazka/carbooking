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
    let brandCar = []
    brandCar.push(<Option key={0} value='Toyota'>Toyota</Option>);
    brandCar.push(<Option key={1} value='Honda'>Honda</Option>);
    brandCar.push(<Option key={2} value='Mazda'>Mazda</Option>);
    brandCar.push(<Option key={3} value='Ford'>Ford</Option>);
    brandCar.push(<Option key={4} value='Isuzu'>Isuzu</Option>);
    brandCar.push(<Option key={5} value='Chevrolet'>Chevrolet</Option>);
    brandCar.push(<Option key={6} value='Nissan'>Nissan</Option>);
    brandCar.push(<Option key={7} value='MG'>MG</Option>);
    brandCar.push(<Option key={8} value='Suzuki'>Suzuki</Option>);
    brandCar.push(<Option key={9} value='BMW'>BMW</Option>);
    brandCar.push(<Option key={10} value='Mitsubishi'>Mitsubishi</Option>);
    brandCar.push(<Option key={12} value='Proton'>Proton</Option>);
    brandCar.push(<Option key={12} value='Jeep'>Jeep</Option>);
    brandCar.push(<Option key={13} value='Mercedes-benz'>Mercedes-benz</Option>);
    brandCar.push(<Option key={14} value='Hyundai'>Hyundai</Option>);
    brandCar.push(<Option key={15} value='Lexus'>Lexus</Option>);
    brandCar.push(<Option key={16} value='Mini'>Mini</Option>);
    brandCar.push(<Option key={17} value='Peugeot'>Peugeot</Option>);
    brandCar.push(<Option key={18} value='TATA'>TATA</Option>);
    brandCar.push(<Option key={19} value='Ferrari'>Ferrari</Option>);
    brandCar.push(<Option key={20} value='KIA'>KIA</Option>);
    brandCar.push(<Option key={21} value='Lotus'>Lotus</Option>);
    brandCar.push(<Option key={22} value='McLaren'>McLaren</Option>);
    brandCar.push(<Option key={23} value='Porsche'>Porsche</Option>);
    brandCar.push(<Option key={24} value='Ssangyong'>Ssangyong</Option>);
    brandCar.push(<Option key={25} value='Thairung'>Thairung</Option>);
    brandCar.push(<Option key={26} value='Aston Martin'>Aston Martin</Option>);
    brandCar.push(<Option key={27} value='Aston Martin'>Aston Martin</Option>);
    brandCar.push(<Option key={28} value='Aston Martin'>Aston Martin</Option>);
    brandCar.push(<Option key={29} value='Lambogrini'>Lambogrini</Option>);
    brandCar.push(<Option key={30} value='Maserati'>Maserati</Option>);
    brandCar.push(<Option key={31} value='Mitsuoka'>Mitsuoka</Option>);
    brandCar.push(<Option key={32} value='Audi'>Audi</Option>);
    brandCar.push(<Option key={33} value='Citroen'>Citroen</Option>);
    brandCar.push(<Option key={34} value='Subaru'>Subaru</Option>);
    brandCar.push(<Option key={35} value='Foton'>Foton</Option>);
    brandCar.push(<Option key={36} value='Jaguar'>Jaguar</Option>);
    brandCar.push(<Option key={37} value='Land Rover'>Land Rover</Option>);
    brandCar.push(<Option key={38} value='Rolls-Royce'>Rolls-Royce</Option>);
    brandCar.push(<Option key={39} value='Flokswagen'>Flokswagen</Option>);
    brandCar.push(<Option key={40} value='Bentley'>Bentley</Option>);
    brandCar.push(<Option key={41} value='DFSK'>DFSK</Option>);
    brandCar.push(<Option key={42} value='Skoda'>Skoda</Option>);

    let typeCar = []
    typeCar.push(<Option key={0} value='Car(เก๋ง)'>Car(เก๋ง)</Option>);
    typeCar.push(<Option key={1} value='Pick up(กระบะ)'>Pick up(กระบะ)</Option>);
    typeCar.push(<Option key={2} value='Bus(ตู้)'>Bus(ตู้)</Option>);
    typeCar.push(<Option key={3} value='PPV'>PPV</Option>);
    typeCar.push(<Option key={4} value='SUV'>SUV</Option>);
    setState({ ...state, province: provinceArray, cars: cars, booking: booking, drivers: driverArr, trips: trips, count: countData,typeCar : typeCar,brandCar : brandCar })
  }, [])

  return (
    <DataContext.Provider value={[state, setState]}>
      {props.children}
    </DataContext.Provider>
  );
};
