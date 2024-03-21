import React, { useMemo, useState } from "react";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import {Table } from 'antd';
import { Excel } from "antd-table-saveas-excel";


const TableComponents = ( props) => {
    const {selectionType = 'checkbok', data:dataSource = [], isLoading= false, columns=[], handleDeleteMany} = props;
    const [rowSelectedKey, setRowSelectedKey] = useState([])
    const newColumEport = useMemo(() => {
      const arr = columns?.filter((col) => col.dataIndex !== 'action')
      return arr
    }, [columns])


    
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`);
          setRowSelectedKey(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
      
      };

      const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKey)
       

      }

      const exportExcel = () => {
        const excel = new Excel();
        excel
          .addSheet(`test`)
          .addColumns(newColumEport)
          .addDataSource(dataSource, {
            str2Percent: true
          })
          .saveAs(`Excel.xlsx`);
      };


    return(
        <div>
        <LoadingComponent isLoading={isLoading}>
          {rowSelectedKey.length > 0 && (
             <div style={{
              background: '#ff0000cc',
              color: '#fff',
              width: '11%',
              textAlign: 'center',
              borderRadius: '5px',
              fontWeight: 'bold',
              padding: '10px',
              cursor: "pointer"}}
              onClick={handleDeleteAll}>
               Xóa tất cả
            </div>
          )}
          <div style={{ padding: '15px 0'}}>
          <button onClick={exportExcel} 
          style={{
            width: '156px',
            height: '38px',
            borderRadius: '7px',
            color: 'WHITE',
            fontSize: '15px',
            fontWeight: '600px',
            backgroundColor: '#008000'
          }}>Xuất File Excel</button>
          </div>
         

        <Table
          id='table-xls'
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
          {...props}
        />
        </LoadingComponent>
      </div>
    )
        
}

export default TableComponents;