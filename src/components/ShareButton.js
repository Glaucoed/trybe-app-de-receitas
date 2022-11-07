import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ URL, dataId }) {
  const [isCopy, setIsCopy] = useState(false);

  const handleClick = () => {
    copy(`http://localhost:3000${URL}`);
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, '1500');
  };

  return (
    <span>
      {
        isCopy
          ? <span>Link copied!</span>
          : (
            <Button
              variant="warning"
              type="button"
              data-testid={ dataId }
              onClick={ handleClick }
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="imagem para compartilhamento de receita" />
            </Button>
          )

      }
    </span>
  );
}

ShareButton.propTypes = {
  dataId: PropTypes.string,
  URL: PropTypes.string,
};

ShareButton.defaultProps = {
  dataId: '',
  URL: '',
};

export default ShareButton;
