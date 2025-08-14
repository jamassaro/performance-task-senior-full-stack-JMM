import PropTypes from 'prop-types';
import { Alert } from '@mui/material';

const Error = ({error}) => {
    return(
    <div 
      className="widget-card error"
      role="alert"
      aria-labelledby="error-message"
    >
      <Alert 
        severity="error" 
        id="error-message"
      >
        {error}
      </Alert>
    </div>
    );
}

Error.propTypes = {
  error: PropTypes.string.isRequired
};

export default Error;