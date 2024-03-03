import { useEffect, useState } from 'react';
import FilterBar from './Scene/FilterBar';
import Navbar from './Scene/Navbar';
import { Order, OrderType } from './Helper/types';
import { deleteOrder, fetchAllOrders, updateOrder } from './Client';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import DataTable from './Scene/OrderTable';
import { setSelectedRows } from './Store/Slices/orderSlice';
import { setOrders, setFilteredOrders } from './Store/Slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './Store/store';

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
      dispatch(setSelectedRows([]));
      // i think this is the best approach in terms of showing updates to deleted data rather than using state in this case, i say so because i could easily remove it from the array of orders but when i go to add a new order the same problem will occur and i wont have the order id to update state

      fetchData(); // Refetch data after deletion
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
          severity="error"
          color="error"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          Error Loading Dashboard, Please contact Engineering!
        </Alert>
      ) : (
        <div>
          <FilterBar
            ordersId={orders.map((order) => order.orderId)}
            orderTypes={Object.values(OrderType)}
            onDeleteSelected={handleOrderDelete}
          />
          <DataTable
            orders={filteredOrders}
            orderTypes={Object.values(OrderType)}
            onSelectedRowsChange={handleSelectedRowsChange}
            onSaveChanges={handleSaveChanges}
          />
        </div>
      )}
    </div>
  );
};

export default App;
