import { addNewOrder } from '../Client';
import { NewOrder, Order, OrderType, orderTypeList } from '../Helper/types';
import { RootState } from '../Store/store';
import { SelectChangeEvent, OutlinedInput } from '@mui/material/';
import { addOrder, filteredOrdersBySearch } from '../Store/Slices/orderSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface CreateOrderModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateOrderModal = ({ open, onClose }: CreateOrderModalProps) => {
  const [formData, setFormData] = useState<NewOrder>({
    createdByUserName: '',
    customerName: '',
    orderType: '',
  });
  const dispatch = useDispatch();
  const { searchInputID, selectedTypes } = useSelector(
    (state: RootState) => state.filter
  );

  const handleOrderValuesChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setFormData({ ...formData, orderType: value });
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name as string]: value as string });
  };

  const handleOrderSubmit = async () => {
    try {
      await addNewOrder(formData).then((data: Order) => {
        // instead of refetching use state
        dispatch(addOrder(data));

        // also update the filtered list if we are currently on that type
        console.log(
          formData.orderType,
          selectedTypes,
          String(formData.orderType) === String(selectedTypes[0])
        );
        if (formData.orderType === data.orderType) {
          dispatch(filteredOrdersBySearch(searchInputID));
        }
      });
      setFormData({
        customerName: '',
        createdByUserName: '',
        orderType: '',
      });
      onClose(); // close the modal on completion
    } catch (err) {
      throw new Error(`Couldnt Add Order: ${err}`);
    }
  };

  return (
    <Modal
      aria-describedby="modal-description"
      aria-labelledby="modal-title"
      onClose={onClose}
      open={open}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          left: '50%',
          p: 4,
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 250,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h3" color={'grey'}>
          Create New Order
        </Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <TextField
            label="Full Name"
            name="customerName"
            onChange={handleTextFieldChange}
            value={formData.customerName}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <TextField
            label="Created By"
            name="createdByUserName"
            onChange={handleTextFieldChange}
            value={formData.createdByUserName}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="order-type-label">Order Type</InputLabel>
          <Select
            input={<OutlinedInput label="Order Type" />}
            labelId="order-type-label"
            name="order-type-select"
            onChange={handleOrderValuesChange}
            value={formData.orderType}
          >
            {orderTypeList.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={handleOrderSubmit}
          sx={{ mt: 2 }}
          variant="contained"
          disabled={
            formData.customerName.trim() === '' ||
            formData.createdByUserName.trim() === '' ||
            formData.orderType.trim() === ''
          }
        >
          Submit Order
        </Button>
        <Button
          color="inherit"
          onClick={() => {
            onClose();
            setFormData({
              customerName: '',
              createdByUserName: '',
              orderType: '',
            });
          }}
          sx={{ position: 'absolute', top: 10, right: 10 }}
        >
          <CloseIcon color="error" />
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateOrderModal;
