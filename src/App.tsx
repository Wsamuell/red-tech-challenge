import { fetchAllOrders } from './Client';
import { SnackbarProvider } from 'notistack';
import { orderTypeList } from './Helper/types';
import { RootState } from './Store/store';
import {
  setError,
  setLoading,
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
  const { error, loading, orders } = useSelector(
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

  return (
    <SnackbarProvider maxSnack={3}>
      <Navbar />
      <FilterBar
        fetchData={fetchData}
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
            onSelectedRowsChange={handleSelectedRowsChange}
            orderTypes={orderTypeList}
          />
        </div>
      )}
    </SnackbarProvider>
  );
};

export default App;
