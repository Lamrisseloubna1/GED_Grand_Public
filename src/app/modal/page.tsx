"use client";
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DocumentMetadataModal from '@/components/DocumentMetadataModal';

const Home: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<Record<string, string | number>>({
    title: "Sample Document",
    author: "John Doe",
    createdDate: "2024-08-01",
    lastModified: "2024-08-01",
    // Add more metadata as needed
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Show Document Metadata
      </Button>
      <DocumentMetadataModal open={open} handleClose={handleClose} metadata={metadata} />
    </div>
  );
};

export default Home;
