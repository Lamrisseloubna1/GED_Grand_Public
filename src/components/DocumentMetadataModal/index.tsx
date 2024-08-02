// src/components/modal/index.tsx
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Define the type for the metadata object
interface Metadata {
  [key: string]: string | number;
}

// Define the type for the props
interface DocumentMetadataModalProps {
  open: boolean;
  handleClose: () => void;
  metadata: Metadata;
}

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

const DocumentMetadataModal: React.FC<DocumentMetadataModalProps> = ({ open, handleClose, metadata }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="document-metadata-title"
      aria-describedby="document-metadata-description"
    >
      <Box sx={style}>
        <Typography id="document-metadata-title" variant="h6" component="h2">
          Document Metadata
        </Typography>
        <Typography id="document-metadata-description" sx={{ mt: 2 }}>
          {Object.entries(metadata).map(([key, value]) => (
            <div key={key}>
              <strong>{key}: </strong>{value}
            </div>
          ))}
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default DocumentMetadataModal;
