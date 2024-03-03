import { deleteOrder, fetchAllOrders, updateOrder } from './Client';
import { Order, orderTypeList } from './Helper/types';
import { RootState } from './Store/store';
import { setOrders, setFilteredOrders } from './Store/Slices/orderSlice';
import { setSelectedRows } from './Store/Slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import DataTable from './Scene/OrderTable';
import FilterBar from './Scene/FilterBar';
import Navbar from './Scene/Navbar';

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { orders, filteredOrders, selectedRows } = useSelector(
    (state: RootState) => state.orders
  );

  const fetchData = async () => {
    try {
      const response = await fetchAllOrders();
      dispatch(setOrders(response));
      dispatch(setFilteredOrders(response)); // Initially, display all orders
    } catch (error) {
      setError('Error fetching orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectedRowsChange = (newSelectedRows: string[]) => {
    dispatch(setSelectedRows(newSelectedRows));
  };

  const handleOrderDelete = async () => {
    try {
      await deleteOrder(selectedRows);
      dispatch(
        setOrders(
          orders.filter((order) => !selectedRows.includes(order.orderId))
        )
      );
      dispatch(
        setFilteredOrders(
          filteredOrders.filter(
            (order) => !selectedRows.includes(order.orderId)
          )
        )
      );

      dispatch(setSelectedRows([]));
    } catch (err) {
      throw new Error(`Couldnt Delete Order: ${err}`);
    }
  };

  const handleSaveChanges = async (updatedRow: Order) => {
    try {
      await updateOrder(updatedRow);
    } catch (err) {
      setError(`Could not save changes: ${err}`);
    }
  };

  return (
    <div className="App">
      <Navbar />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert
          color="error"
          severity="error"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          Error Loading Dashboard, Please contact Engineering!
        </Alert>
      ) : (
        <div>
          <FilterBar
            onDeleteSelected={handleOrderDelete}
            ordersId={orders.map((order) => order.orderId)}
          />
          <DataTable
            onSaveChanges={handleSaveChanges}
            onSelectedRowsChange={handleSelectedRowsChange}
            orderTypes={orderTypeList}
          />
        </div>
      )}
    </div>
  );
};

export default App;
