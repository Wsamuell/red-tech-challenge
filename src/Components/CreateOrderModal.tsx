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
import { OrderType } from '../types';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface CreateOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: OrderFormData) => void;
}

interface OrderFormData {
  fullName: string;
  createdBy: string;
  orderType: string;
}

const CreateOrderModal = ({
  open,
  onClose,
  onSubmit,
}: CreateOrderModalProps) => {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    createdBy: '',
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

  const handleOrderSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Create New Order
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleTextFieldChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField
              label="Created By"
              name="createdBy"
              value={formData.createdBy}
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
              <MenuItem value={OrderType.Standard}>
                {OrderType.Standard}
              </MenuItem>
              <MenuItem value={OrderType.TransferOrder}>
                {OrderType.TransferOrder}
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOrderSubmit}
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              onClose();
              setFormData({
                fullName: '',
                createdBy: '',
                orderType: '',
              });
            }}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <CloseIcon />
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateOrderModal;
