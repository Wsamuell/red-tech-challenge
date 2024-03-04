import { ChangeEvent } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { Order, OrderType, orderTypeList } from '../Helper/types';
import { RootState } from '../Store/store';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  filteredOrdersBySearch,
  setFilteredOrders,
  setOrders,
} from '../Store/Slices/orderSlice';
import { setSearchInputID } from '../Store/Slices/filterSlice';
import {
  setSelectedTypes,
  setOpenCreateModal,
} from '../Store/Slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import CreateOrderModal from '../Components/CreateOrderModal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { getOrderByType } from '../Client';

interface FilterBarProps {
  fetchData: () => void;
  onDeleteSelected: () => void;
  ordersId: string[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const FilterBar = ({
  fetchData,
  onDeleteSelected,
  ordersId,
}: FilterBarProps) => {
  const dispatch = useDispatch();
  const { openCreateModal, selectedTypes } = useSelector(
    (state: RootState) => state.filter
  );
  const { selectedRows } = useSelector((state: RootState) => state.orders);

  const handleOrderTypeChange = async (event: SelectChangeEvent<string[]>) => {
    try {
      const { value } = event.target;
      dispatch(setSelectedTypes(value as OrderType[]));
      if (value === '') {
        fetchData();
      } else {
        await getOrderByType(value as OrderType).then((data: Order[]) => {
          dispatch(setOrders(data));
          dispatch(setFilteredOrders(data));
        });
      }
    } catch (err) {
      throw new Error(`${err}`);
    }
  };

  const handleSearchChange = (event: ChangeEvent<{}>, value: string | null) => {
    const input = value || '';
    dispatch(setSearchInputID(input));
    dispatch(filteredOrdersBySearch(input));
  };

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 1,
        paddingLeft: 1,
        paddingRight: 1,
      }}
    >
      <Autocomplete
        disablePortal
        id="order-search-by-id"
        noOptionsText="No Order to match ID"
        onChange={handleSearchChange}
        options={ordersId}
        sx={{ width: 200, height: 'auto', margin: 1 }}
        renderInput={(params) => (
          <TextField {...params} label="Customer Search" size="small" />
        )}
      />
      <CreateOrderModal
        onClose={() => dispatch(setOpenCreateModal(false))}
        open={openCreateModal}
      />
      <Button
        color="primary"
        onClick={() => dispatch(setOpenCreateModal(true))}
        variant="contained"
        style={{
          width: 200,
          fontSize: 'small',
          justifyContent: 'space-evenly',
          margin: 10,
        }}
      >
        <AddIcon style={{ padding: 1 }} />
        Create Order
      </Button>
      <Button
        color="error"
        onClick={onDeleteSelected}
        variant="contained"
        style={{
          width: 200,
          fontSize: 'small',
          justifyContent: 'space-evenly',
          margin: 10,
        }}
        disabled={selectedRows.length < 1}
      >
        <DeleteOutlineIcon style={{ padding: 1 }} />
        {`Delete (${selectedRows.length})`}
      </Button>
      <FormControl sx={{ width: 200, height: 'auto', margin: 1 }}>
        <InputLabel id="order-type-label" size="small">
          Order Type
        </InputLabel>

        <Select
          id="order-type-checkbox"
          input={<OutlinedInput label="Order Type" />}
          labelId="order-type-label"
          onChange={handleOrderTypeChange}
          size="small"
          value={selectedTypes}
          renderValue={(selected) =>
            Array.isArray(selected) ? selected.join(', ') : selected
          }
          MenuProps={MenuProps}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {orderTypeList.map((type, index) => (
            <MenuItem key={index} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBar;
