import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Order } from '../types';

const columns: GridColDef[] = [
  {
    disableColumnMenu: true,
    field: 'orderId',
    headerName: 'Order ID',
    width: 300,
  },
  {
    disableColumnMenu: true,
    field: 'createdDate',
    headerName: 'Creation Date',
    width: 200,
  },
  {
    disableColumnMenu: true,
    field: 'createdByUserName',
    headerName: 'Created By',
    width: 150,
  },
  {
    disableColumnMenu: true,
    field: 'orderType',
    headerName: 'Order Type',
    width: 150,
  },
  {
    disableColumnMenu: true,
    field: 'customerName',
    headerName: 'Customer',
    width: 160,
  },
];

interface DataTableProps {
  orders: Order[];
}
const DataTable = ({ orders }: DataTableProps) => {
  const getRowId = (row: Order) => row.orderId;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={getRowId} // Provide a function to extract the id from each row
        rows={orders}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
