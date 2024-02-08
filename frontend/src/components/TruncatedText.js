import React, { useState } from 'react';

const TruncatedText = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const truncatedText = isExpanded ? text : text.slice(0, maxLength);
  
  const handleExpandClick = () => {
    setIsExpanded(true);
  };

  return (
    <div>
      <p>{truncatedText}</p>
      {!isExpanded && text.length > maxLength && (
        <button type="button" className="btn btn-sm btn-secondary" onClick={handleExpandClick}>
          voir plus
        </button>
      )}
      {isExpanded && (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Text complet</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>{text}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TruncatedText;
