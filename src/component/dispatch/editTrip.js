import React, { forwardRef, useState } from 'react'
import MaterialTable, { MTableBodyRow } from 'material-table'
import { getTrips, getDrivers, getCars } from '../util/index'
import { AddBox, ArrowDownward, Clear, Check, ChevronLeft, ChevronRight, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@material-ui/icons'
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const EditTrips = () => {
    const [data, setData] = useState();
    const [driver, setDriver] = useState([]);
    const [car, setCar] = useState([]);
    React.useMemo(async () => {
        const countTrip = async () => {
            await getDrivers().then(res => {
                let driverData = {}
                res.map(d => {
                    const { id, name } = d
                    driverData[id] = name
                })
                // console.log(driverData);
                setDriver(driverData)
            })
            await getCars().then(res => {
                let carData = {}

                res.map(d => {
                    const { id, plateNo } = d
                    carData[id] = plateNo
                })
                setCar(carData)
            })
            const test = await getTrips().then(res => {
                setData(res)
                // setCount(res.length)
                // setState({ ...state, trips: res })
            })

            // setCount(countData)
            // console.log(res);
        }
        await countTrip()
    }, [])

    console.log({ ...driver });
    return (
        <React.Fragment>
            {/* {data ? */}
            <MaterialTable
                style={{ marginLeft: '24px', marginRight: '24px', marginTop: '24px' }}
                icons={tableIcons}
                // title="Disable Field Editable Preview"
                columns={[
                    { title: 'ชื่อ', field: 'booking.name', editable: 'never' },
                    { title: 'สถานที่', render: (rowData) => JSON.parse(rowData.booking.destination) + " ", editable: 'never' },
                    { title: 'จังหวัด', render: (rowData) => JSON.parse(rowData.booking.destProvince) + " ", editable: 'never' },
                    { title: 'เวลา', render: (rowData) => rowData.booking.startTime + " - " + rowData.booking.endTime, type: 'numeric' },
                    { title: 'ทะเบียนรถ', field: 'car.id', editable: 'onUpdate', lookup: { ...car } },
                    { title: 'คนขับรถ', field: 'driver.id', editable: 'onUpdate', lookup: { ...driver } },
                ]}
                data={data}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);

                                resolve();
                            }, 1000)
                        }),

                }}
                options={{
                    actionsColumnIndex: -1,
                    search: false,
                    sorting: true,

                }}
            />
            {/* : null} */}
        </React.Fragment>
    )
}

export default EditTrips