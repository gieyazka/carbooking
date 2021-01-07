import React, { createContext, useState, useEffect } from "react";
import _ from 'lodash';
import { getBookingDispatch } from '../util/index'

export const DataContext = createContext([{}, () => { }]);

export default props => {
  const [state, setState] = useState({
    booking: [],
    test2: [4, 5, 6],

  });
  React.useMemo(() => {
    getBookingDispatch().then(res => {
      setState({ ...state, booking: res })
    })


  }, [])

  return (
    <DataContext.Provider value={[state, setState]}>
      {props.children}
    </DataContext.Provider>
  );
};
