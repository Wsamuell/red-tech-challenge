import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Order } from '../types';
import EditIcon from '@mui/icons-material/Edit';
// import EditOrderModal from '../Components/EditOrderModal';

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
  {
    field: 'edit',
    headerName: '',
    width: 50,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <EditIcon
        style={{ color: '#444444' }}
        className="edit-icon"
        onClick={() => console.log('click')}
      />
    ),
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
        getRowId={getRowId}
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
