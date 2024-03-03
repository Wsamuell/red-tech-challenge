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
import { filterOrderedBySearchAndType } from '../Helper/filterFunctionality';
import { OrderType } from '../Helper/types';
import { RootState } from '../Store/store';
import { SelectChangeEvent } from '@mui/material/Select';
import { setFilteredOrders } from '../Store/Slices/orderSlice';
import { setSearchInputID } from '../Store/Slices/filterSlice';
import {
  setSelectedTypes,
  setOpenCreateModal,
} from '../Store/Slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import CreateOrderModal from '../Components/CreateOrderModal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface FilterBarProps {
  onDeleteSelected: () => void;
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
  onDeleteSelected,
  ordersId,
  orderTypes,
}: FilterBarProps) => {
  const dispatch = useDispatch();
  const { openCreateModal, selectedTypes, searchInputID } = useSelector(
    (state: RootState) => state.filter
  );
  const { orders, selectedRows } = useSelector(
    (state: RootState) => state.orders
  );
  const handleOrderTypeChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    dispatch(setSelectedTypes(value as OrderType[]));
    dispatch(
      setFilteredOrders(
        filterOrderedBySearchAndType(
          orders,
          searchInputID,
          value as OrderType[]
        )
      )
    );
  };

  const handleSearchChange = (event: ChangeEvent<{}>, value: string | null) => {
    const input = value || '';
    // In the event we serch for an order by id, i think it makes the most sense to clearout the Ordertype in case something is in there
    dispatch(setSearchInputID(input));
    dispatch(
      setFilteredOrders(
        filterOrderedBySearchAndType(orders, input, selectedTypes)
      )
    );
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
          multiple
          onChange={handleOrderTypeChange}
          size="small"
          value={selectedTypes}
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
