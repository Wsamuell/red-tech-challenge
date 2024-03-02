import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent, OutlinedInput } from '@mui/material/';
import { NewOrder, OrderType } from '../types';
import CloseIcon from '@mui/icons-material/Close';
import { addNewOrder } from '../Client';

interface CreateOrderModalProps {
  open: boolean;
  onClose: () => void;
  fetchData: () => Promise<void>;
}

const CreateOrderModal = ({
  open,
  onClose,
  fetchData,
}: CreateOrderModalProps) => {
  const [formData, setFormData] = useState<NewOrder>({
    createdByUserName: '',
    customerName: '',
    orderType: '',
  });

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
      await addNewOrder(formData);
      setFormData({
        customerName: '',
        createdByUserName: '',
        orderType: '',
      });
      fetchData(); // Refetch data after adding a new order
      onClose(); // close the modal on completion
    } catch (err) {
      throw new Error(`Couldnt Add Order: ${err}`);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 250,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 1,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h3" color={'grey'}>
          Create New Order
        </Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <TextField
            label="Full Name"
            name="customerName"
            value={formData.customerName}
            onChange={handleTextFieldChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <TextField
            label="Created By"
            name="createdByUserName"
            value={formData.createdByUserName}
            onChange={handleTextFieldChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="order-type-label">Order Type</InputLabel>
          <Select
            labelId="order-type-label"
            name="order-type-select"
            value={formData.orderType}
            onChange={handleOrderValuesChange}
            input={<OutlinedInput label="Order Type" />}
          >
            <MenuItem value={OrderType.PurchaseOrder}>
              {OrderType.PurchaseOrder}
            </MenuItem>
            <MenuItem value={OrderType.ReturnOrder}>
              {OrderType.ReturnOrder}
            </MenuItem>
            <MenuItem value={OrderType.SaleOrder}>
              {OrderType.SaleOrder}
            </MenuItem>
            <MenuItem value={OrderType.Standard}>{OrderType.Standard}</MenuItem>
            <MenuItem value={OrderType.TransferOrder}>
              {OrderType.TransferOrder}
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="success"
          onClick={handleOrderSubmit}
          sx={{ mt: 2 }}
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
