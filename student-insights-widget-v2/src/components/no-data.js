import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const EmptyData = () => {
  return (
    <div 
      className="widget-card empty-data"
      aria-labelledby="empty-message"
    >
      <SentimentVeryDissatisfiedIcon style={{ fontSize: 60 }} />
      <p id="empty-message">No student information available</p>
    </div>
  );
};

export default EmptyData;
