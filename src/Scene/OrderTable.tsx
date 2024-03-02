import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridPreProcessEditCellProps,
  GridRenderEditCellParams,
  GridRowId,
  GridRowModes,
  GridEditInputCell,
  GridRowModesModel,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import { Order, OrderType } from '../Helper/types';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Close';
import StyledBox from '../Components/StyledBox';
import { useState } from 'react';
import StyledTooltip from '../Components/StyledTooltip';

interface DataTableProps {
  orders: Order[];
  orderTypes: OrderType[];
  onSelectedRowsChange: (selectedRows: string[]) => void;
  onSaveChanges: (updatedRow: Order) => void;
}

function renderEditError(props: GridRenderEditCellParams) {
  const { error } = props;

  return (
    <StyledTooltip open={!!error} title={'Field Required'}>
      <GridEditInputCell {...props} />
    </StyledTooltip>
  );
}

const DataTable = ({
  orders,
  orderTypes,
  onSelectedRowsChange,
  onSaveChanges,
}: DataTableProps) => {
  const getRowId = (row: Order) => row.orderId;
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [rows, setRows] = useState<Order[]>(orders);

  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    const selectedOrderIds = newSelection.map((rowId) => rowId.toString());
    onSelectedRowsChange(selectedOrderIds);
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View },
    });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const processRowUpdate = async (
    newRow: Order,
    oldRow: Order
  ): Promise<Order> => {
    try {
      const existingRow = rows.find((row) => row.orderId === newRow.orderId);
      if (!existingRow) {
        throw new Error('Row not found');
      }

      const updatedRow: Order = {
        ...existingRow,
        createdByUserName: newRow.createdByUserName,
        orderType: newRow.orderType,
        customerName: newRow.customerName,
      };

      await onSaveChanges(updatedRow);

      setRows(
        rows.map((row) => (row.orderId === newRow.orderId ? updatedRow : row))
      );

      return updatedRow;
    } catch (error) {
      console.error('Error updating row:', error);
      return oldRow;
    }
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const preProcessEditCellProps = (params: GridPreProcessEditCellProps) => {
    const hasError = params.props.value < 1;
    return { ...params.props, error: hasError };
  };
  const columns: GridColDef[] = [
    {
      disableColumnMenu: true,
      field: 'orderId',
      headerName: 'Order ID',
      width: 300,
      editable: false,
    },
    {
      disableColumnMenu: true,
      field: 'createdDate',
      headerName: 'Creation Date',
      width: 200,
      editable: false,
    },
    {
      disableColumnMenu: true,
      field: 'createdByUserName',
      headerName: 'Created By',
      width: 150,
      editable: true,
      type: 'string',
      renderEditCell: renderEditError,
      preProcessEditCellProps,
    },
    {
      disableColumnMenu: true,
      field: 'orderType',
      headerName: 'Order Type',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: orderTypes,
    },
    {
      disableColumnMenu: true,
      field: 'customerName',
      headerName: 'Customer',
      width: 160,
      editable: true,
      type: 'string',
      renderEditCell: renderEditError,
      preProcessEditCellProps,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<CheckIcon />}
              label="Save"
              color="success"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              color="error"
              onClick={handleCancelClick(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary edit-icon"
            sx={{ visibility: 'hidden' }}
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <StyledBox>
      <DataGrid
        sx={{
          '& .MuiCheckbox-colorPrimary.Mui-checked': {
            color: 'error.main',
          },
        }}
        getRowId={getRowId}
        rows={orders}
        columns={columns}
        editMode="row"
        onRowSelectionModelChange={handleSelectionChange}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        checkboxSelection
      />
    </StyledBox>
  );
};

export default DataTable;
