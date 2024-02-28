import { useState } from 'react';
import {
  Autocomplete,
  TextField,
  Button,
  MenuItem,
  Box,
  ThemeProvider,
} from '@mui/material';
import { OrderType } from '../types';
import { theme } from '../Style/Theme';
// import { Search } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';

interface FilterBarProps {
  orders: string[];
  orderTypes: OrderType[];
  onCreateOrder: () => void;
  onDeleteSelected: () => void;
  onOrderTypeChange: (type: OrderType) => void;
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
  orders,
  orderTypes,
  onCreateOrder,
  onDeleteSelected,
  onOrderTypeChange,
}: FilterBarProps) => {
  const [selectedOrderType, setSelectedOrderType] = useState<OrderType[]>([]);

  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    const { value } = event.target;
    setSelectedOrderType(
      Array.isArray(value)
        ? value.map((type) => type as OrderType)
        : [value as OrderType]
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          paddingLeft: 1,
          paddingRight: 1,
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={orders}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Customer Search"
              // inputProps={{ ...params.InputProps, startAdornment: <Search /> }}
            />
          )}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onCreateOrder}
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
          <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedOrderType}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
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
    </ThemeProvider>
  );
};

export default FilterBar;
