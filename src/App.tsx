import { useEffect, useState } from 'react';
import './App.css';
import FilterBar from './Scene/FilterBar';
import Navbar from './Scene/Navbar';
import { Order, OrderType } from './types';
import { fetchAllOrders } from './Api-Data';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllOrders();
        setOrders(response);
      } catch (error) {
        setError('Error fetching orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              // there is a strong posibility we can have multiple people with the same name so there is going to be a displayed search for multiple users with the same name, this is going to get confusing so we should order Id instead
              ordersId={orders.map((order) => order.orderId)}
              orderTypes={[
                ...new Set(orders.map((order) => order.orderType as OrderType)),
              ]}
              onCreateOrder={() => console.log('')}
              onDeleteSelected={() => console.log('')}
              onOrderTypeChange={() => console.log('')}
            />
            <DataTable orders={orders} />
          </div>
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
