import { useState } from 'react';
import {
  Autocomplete,
  TextField,
  Button,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  OutlinedInput,
  ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { SelectChangeEvent } from '@mui/material/Select';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateOrderModal from '../Components/CreateOrderModal';
import { OrderType } from '../types';

interface FilterBarProps {
  ordersId: string[];
  orderTypes: OrderType[];
  onDeleteSelected: () => void;
  onOrderTypeChange: (type: OrderType[]) => void;
  fetchData: () => Promise<void>;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FilterBar = ({
  ordersId,
  orderTypes,
  onDeleteSelected,
  onOrderTypeChange,
  fetchData,
}: FilterBarProps) => {
  const [selectedOrderType, setSelectedOrderType] = useState<OrderType[]>([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    // feels a little redundant to do this twice so i'm going to fix this with redux later
    setSelectedOrderType(value as OrderType[]);
    onOrderTypeChange(value as OrderType[]);
  };

  const handleCreateOrder = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  return (
    <Box
      sx={{
        paddingLeft: 1,
        paddingRight: 1,
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        marginBottom: 5,
      }}
    >
      <Autocomplete
        disablePortal
        id="order-search-by-id"
        options={ordersId}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Customer Search" />
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
        style={{ width: 200 }}
      >
        <AddIcon style={{ padding: 5 }} />
        Create Order
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={onDeleteSelected}
        style={{ width: 200 }}
      >
        <DeleteOutlineIcon style={{ padding: 5 }} />
        Delete Selected
      </Button>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="order-type-label">Order Type</InputLabel>
        {/* would be nice to have a clear icon in here so we dont have to uncheck each individual order type */}
        <Select
          labelId="order-type-label"
          id="order-type-checkbox"
          multiple
          value={selectedOrderType}
          onChange={handleChange}
          input={<OutlinedInput label="Order Type" />}
          renderValue={(selected) =>
            Array.isArray(selected) ? selected.join(', ') : selected
          }
          MenuProps={MenuProps}
        >
          {orderTypes.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={selectedOrderType.indexOf(type) > -1} />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBar;
