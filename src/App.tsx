import { deleteOrder, fetchAllOrders, updateOrder } from './Client';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Order, orderTypeList } from './Helper/types';
import { RootState } from './Store/store';
import {
  setError,
  setLoading,
  setDeleteOrders,
  setDeleteFilteredOrders,
  setOrders,
  setFilteredOrders,
} from './Store/Slices/orderSlice';
import { setSelectedRows } from './Store/Slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import DataTable from './Scene/OrderTable';
import FilterBar from './Scene/FilterBar';
import Navbar from './Scene/Navbar';

const App = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { error, loading, orders, selectedRows } = useSelector(
    (state: RootState) => state.orders
  );

  const fetchData = async () => {
    try {
      const response = await fetchAllOrders();
      dispatch(setOrders(response));
      dispatch(setFilteredOrders(response)); // Initially, display all orders
    } catch (error) {
      dispatch(setError('Error fetching orders. Please try again later.'));
    } finally {
      dispatch(setLoading(false));
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
      // Delete in both the orders array and filteredArray
      dispatch(setDeleteOrders(selectedRows));
      dispatch(setDeleteFilteredOrders(selectedRows));
      dispatch(setSelectedRows([]));
    } catch (err) {
      enqueueSnackbar('Error Deleting Order!', { variant: 'error' });
    } finally {
      enqueueSnackbar('Order Deleted!', {
        variant: 'info',
      });
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
    <SnackbarProvider maxSnack={3}>
      <Navbar />
      <FilterBar
        fetchData={fetchData}
        onDeleteSelected={handleOrderDelete}
        ordersId={orders.map((order) => order.orderId)}
      />
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
          <DataTable
            onSaveChanges={handleSaveChanges}
            onSelectedRowsChange={handleSelectedRowsChange}
            orderTypes={orderTypeList}
          />
        </div>
      )}
    </SnackbarProvider>
  );
};

export default App;
