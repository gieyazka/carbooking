import React, { createContext, useState, useEffect } from "react";
import _ from 'lodash';


export const DataContext = createContext([{}, () => {}]);

export default props => {
  const [state, setState] = useState({
      test : [0, 1, 2,3],
      test2 : [4,5,6],
    
  });

  return (
    <DataContext.Provider value={[state, setState]}>
      {props.children}
    </DataContext.Provider>
  );
};
