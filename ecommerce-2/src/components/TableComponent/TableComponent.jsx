import { Divider, Radio, Table, Button } from 'antd';
import React, { useMemo, useState } from 'react';
import { CSVLink } from 'react-csv';
import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
  const { selectionType = 'checkbox', columns = [], data:dataSource = [] } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== 'action')
    return arr
  }, [columns])

  const rowSelection = {
    onChange: (selectedKeys, selectedRows) => {
      setSelectedRowKeys(selectedKeys);
      console.log(`selectedRowKeys: ${selectedKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };

  return (
    <div>
      <div>
      <button onClick={exportExcel}>Export Excel</button>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          {...props}
        />
      </div>
    </div>
  );
};

export default TableComponent;
