import { styled } from '@mui/material/styles';

const StyledBox = styled('div')(({ theme }) => ({
  height: 600,
  width: '100%',
  '& .MuiDataGrid-cell--editable': {
    '& .MuiInputBase-root': {
      height: '100%',
    },
  },
  '& .Mui-error': {
    backgroundColor: `rgb(126,10,15, ${
      theme.palette.mode === 'dark' ? 0 : 0.1
    })`,
    color: theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f',
  },
  '& .actions': {
    color: 'text.secondary',
  },
  '& .textPrimary': {
    color: 'text.primary',
  },
  '& .MuiDataGrid-row:hover .edit-icon': {
    visibility: 'visible',
  },
}));

export default StyledBox;
