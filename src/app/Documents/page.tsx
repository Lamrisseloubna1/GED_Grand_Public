// src/app/Documents/page.tsx
"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import GetAppIcon from '@mui/icons-material/GetApp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import { getAllDocuments } from '@/services/documentService'; // Adjust path as necessary

interface Column {
  id: 'title' | 'date' | 'view' | 'download' | 'favorite' | 'share';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number | Date) => string;
}

const columns: readonly Column[] = [
  { id: 'title', label: 'Titre du Document', minWidth: 170, align: 'right' },
  {
    id: 'date',
    label: 'Date de Publication',
    minWidth: 170,
    align: 'right',
    format: (value: Date | number) => {
      if (value instanceof Date) {
        return value.toLocaleDateString('en-US');
      }
      return value.toString();
    },
  },
  { id: 'view', label: 'Visualiser', minWidth: 170, align: 'center' },
  { id: 'download', label: 'Téléchargement', minWidth: 170, align: 'center' },
  { id: 'favorite', label: 'Ajouter aux Favoris', minWidth: 170, align: 'center' },
  { id: 'share', label: 'Partager', minWidth: 170, align: 'center' },
];

interface Data {
  title: string;
  date: Date;
  view: string;
  download: string;
  favorite: boolean;
}

function createData(title: string, date: Date, view: string, download: string): Data {
  return { title, date, view, download, favorite: false };
}

export default function DocumentTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<Data[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDocuments = async () => {
      const documents = await getAllDocuments();
      const formattedDocuments = documents.map((doc: any) =>
        createData(doc.titre, new Date(doc['dateDepot']), doc.file, doc.file)
      );
      setRows(formattedDocuments);
    };

    fetchDocuments();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFavoriteClick = (index: number) => {
    const newRows = [...rows];
    newRows[index].favorite = !newRows[index].favorite;
    setRows([...newRows]);

    const favorites = newRows.filter(row => row.favorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const handleDownload = (downloadUrl: string) => {
    window.open(downloadUrl, '_blank');
  };

  const handleShareClick = (url: string) => {
    const shareData = {
      title: 'Document',
      text: 'Check out this document:',
      url: url,
    };
    
    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      // Fallback for browsers that do not support the Web Share API
      const shareUrl = `mailto:?subject=${encodeURIComponent('Document')}&body=${encodeURIComponent(`Check out this document: ${url}`)}`;
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <DefaultLayout>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.title}>
                      {columns.map((column) => {
                        const value = row[column.id as keyof Data];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'view' ? (
                              <IconButton aria-label="view" onClick={() => window.open(row.view, '_blank')}>
                                <VisibilityIcon />
                              </IconButton>
                            ) : column.id === 'download' ? (
                              <a href={value as string} download onClick={(e) => e.stopPropagation()}>
                                <IconButton aria-label="download">
                                  <GetAppIcon />
                                </IconButton>
                              </a>
                            ) : column.id === 'favorite' ? (
                              <IconButton aria-label="favorite" onClick={() => handleFavoriteClick(index)}>
                                {row.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                              </IconButton>
                            ) : column.id === 'share' ? (
                              <IconButton aria-label="share" onClick={() => handleShareClick(row.download)}>
                                <ShareIcon />
                              </IconButton>
                            ) : column.format && (typeof value === 'number' || value instanceof Date) ? (
                              column.format(value as number | Date)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div style={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: 'blue', color: 'white' }}
          onClick={() => router.push('/favoris')}
        >
          View Favorites
        </Button>
      </div>
    </DefaultLayout>
  );
}
