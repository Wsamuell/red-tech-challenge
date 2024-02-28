import EditIcon from '@mui/icons-material/Edit';

// this feels redundant to have to create a component for an icon for a hover over display
interface EditCellProps {
  params: any;
  isHovered: boolean;
  setIsHovered: () => void;
}
const EditCell = ({ params, isHovered, setIsHovered }: EditCellProps) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isHovered && <EditIcon onClick={() => console.log('Edit clicked')} />}
    </div>
  );
};

export default EditCell;
