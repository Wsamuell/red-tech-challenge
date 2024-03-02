import { useEffect, useState } from 'react';
import FilterBar from './Scene/FilterBar';
import Navbar from './Scene/Navbar';
import { Order, OrderType } from './types';
import { deleteOrder, fetchAllOrders, updateOrder } from './Client';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import DataTable from './Scene/OrderTable';
import { setSelectedTypes, setSearchInputID } from './Store/Slices/filterSlice';
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
  const { searchInputID, selectedTypes } = useSelector(
    (state: RootState) => state.filter
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
    // BKMRK: add the empty array back to only call this on load
  });

  const handleSelectedRowsChange = (newSelectedRows: string[]) => {
    dispatch(setSelectedRows(newSelectedRows));
  };

  const handleOrderDelete = async () => {
    try {
      await deleteOrder(selectedRows);
      setSelectedRows([]);
      // i think this is the best approach in terms of showing updates to deleted data rather than using state in this case, i say so because i could easily remove it from the array of orders but when i go to add a new order the same problem will occur and i wont have the order id to update state
      fetchData(); // Refetch data after deletion
    } catch (err) {
      throw new Error(`Couldnt Delete Order: ${err}`);
    }
  };

  const handleOrderFilterChange = (
    searchInputID: string,
    selectedTypes: OrderType[]
  ) => {
    let filteredOrders: Order[] = [];

    // a little funky but i think this is better than an if-else statement overall although the 'condition' is not very readable.
    // there are 3 things happening
    //  - we check if we are filtering both type and search bar
    //  - or filtering just searchbar
    //  - or filtering by type
    //  - or not filtering at all
    const condition =
      searchInputID.length > 0 && selectedTypes.length > 0
        ? 'both'
        : searchInputID.length > 0
        ? 'searchInput'
        : selectedTypes.length > 0
        ? 'selectedTypes'
        : 'none';

    switch (condition) {
      case 'both':
        // Scenario: Both search input and order types provided
        // First, filter by search input
        // this scenerio  makes sure if you search by input and the type is not the same, nothing shows up
        const filteredBySearch = orders.filter((order) =>
          order.orderId.includes(searchInputID)
        );

        // Then, filter the result by selected types
        filteredOrders = filteredBySearch.filter((order) =>
          selectedTypes.includes(order.orderType)
        );
        break;
      case 'searchInput':
        // Scenario: Only search input provided
        filteredOrders = orders.filter((order) =>
          order.orderId.includes(searchInputID)
        );
        break;
      case 'selectedTypes':
        // Scenario: Only order types selected
        filteredOrders = orders.filter((order) =>
          selectedTypes.includes(order.orderType)
        );
        break;
      case 'none':
        // Scenario: Neither search input nor order types selected
        filteredOrders = orders;
        break;
      default:
        // Default case
        filteredOrders = orders;
        break;
    }

    setFilteredOrders(filteredOrders);
  };
  const handleOrderTypeChange = (selectedTypes: OrderType[]) => {
    dispatch(setSelectedTypes(selectedTypes));
    handleOrderFilterChange(searchInputID, selectedTypes);
  };
  const handleSearchInputChange = (searchInputID: string) => {
    dispatch(setSearchInputID(searchInputID));
    handleOrderFilterChange(searchInputID, selectedTypes);
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
            onOrderTypeChange={handleOrderTypeChange}
            fetchData={fetchData}
            onSearchInputChange={handleSearchInputChange}
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
