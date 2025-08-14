import { CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <div 
      className="widget-card loading"
      role="status"
      aria-labelledby="loading-message"
    >
      <CircularProgress />
      <p id="loading-message">Loading...</p>
    </div>
  );
};

export default Loading;
