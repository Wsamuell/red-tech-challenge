import { ChangeEvent } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateOrderModal from '../Components/CreateOrderModal';
import { OrderType } from '../Helper/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedTypes,
  setSearchInputID,
  setOpenCreateModal,
} from '../Store/Slices/filterSlice';
import { RootState } from '../Store/store';

interface FilterBarProps {
  fetchData: () => Promise<void>;
  onDeleteSelected: () => void;
  onOrderTypeChange: (type: OrderType[]) => void;
  onSearchInputChange: (orderId: string) => void;
  ordersId: string[];
  orderTypes: OrderType[];
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
  onOrderTypeChange,
  onSearchInputChange,
  ordersId,
  orderTypes,
}: FilterBarProps) => {
  const dispatch = useDispatch();
  const { openCreateModal, selectedTypes } = useSelector(
    (state: RootState) => state.filter
  );
  const { selectedRows } = useSelector((state: RootState) => state.orders);
  const handleOrderTypeChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    dispatch(setSelectedTypes(value as OrderType[]));
    onOrderTypeChange(value as OrderType[]);
  };

  // im a little conflicted here, if a user searches for an order we should clear the orderType input to make sure they can find that order,

  // this might not be what we always want since there might be a case where the user actually wants to filter the searches
  // so im not going to clear it is the verdict
  const handleSearchChange = (event: ChangeEvent<{}>, value: string | null) => {
    dispatch(setSearchInputID(value || ''));
    onSearchInputChange(value || '');
  };
  const handleCreateOrder = () => {
    dispatch(setOpenCreateModal(true));
  };

  const handleCloseCreateModal = () => {
    dispatch(setOpenCreateModal(false));
  };

  return (
    <Box
      sx={{
        paddingLeft: 1,
        paddingRight: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 1,
      }}
    >
      <Autocomplete
        disablePortal
        id="order-search-by-id"
        options={ordersId}
        sx={{ width: 200, height: 'auto', margin: 1 }}
        noOptionsText="No Order to match ID"
        onChange={handleSearchChange}
        renderInput={(params) => (
          <TextField {...params} label="Customer Search" size="small" />
        )}
      />
      <CreateOrderModal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        fetchData={fetchData}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateOrder}
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
        variant="contained"
        color="error"
        onClick={onDeleteSelected}
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
          labelId="order-type-label"
          id="order-type-checkbox"
          multiple
          size="small"
          value={selectedTypes}
          onChange={handleOrderTypeChange}
          input={<OutlinedInput label="Order Type" />}
          renderValue={(selected) =>
            Array.isArray(selected) ? selected.join(', ') : selected
          }
          MenuProps={MenuProps}
        >
          {orderTypes.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={selectedTypes.indexOf(type) > -1} />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBar;
