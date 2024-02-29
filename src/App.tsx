import { useEffect, useState } from 'react';
import './App.css';
import FilterBar from './Scene/FilterBar';
import Navbar from './Scene/Navbar';
import { Order, OrderType } from './types';
import { deleteOrder, fetchAllOrders } from './Client';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import DataTable from './Scene/OrderTable';
import { ThemeProvider } from '@mui/material';
import { theme } from './Style/Theme';

function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetchAllOrders();
      setOrders(response);
      setFilteredOrders(response); // Initially, display all orders
    } catch (error) {
      setError('Error fetching orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectedRowsChange = (newSelectedRows: string[]) => {
    setSelectedRows(newSelectedRows);
  };

  const handleOrderDelete = async () => {
    try {
      await deleteOrder(selectedRows);
      setSelectedRows([]);
      // i think this is the best approach in terms of showing updates to deleted data rather than using state in this case, i say so because i could easily remove it from the array of orders but when i go to add a new order the same problem will occur and i wont have the order id to update state
      fetchData(); // Refetch data after deletion
    } catch (err) {
      console.log('Couldnt Delete Order', err);
    }
  };

  const handleOrderTypeChange = (selectedTypes: OrderType[]) => {
    if (selectedTypes.length === 0) {
      console.log(selectedTypes);
      // If no types are selected, display all orders
      setFilteredOrders(orders);
    } else {
      // Filter orders based on selected types
      const filtered = orders.filter((order) =>
        selectedTypes.includes(order.orderType)
      );
      setFilteredOrders(filtered);
    }
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
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
              orderTypes={[
                ...new Set(orders.map((order) => order.orderType as OrderType)),
              ]}
              onCreateOrder={() => console.log('')}
              onDeleteSelected={handleOrderDelete}
              onOrderTypeChange={handleOrderTypeChange}
            />
            <DataTable
              orders={filteredOrders}
              onSelectedRowsChange={handleSelectedRowsChange}
            />
          </div>
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
