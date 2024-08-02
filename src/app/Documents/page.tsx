// src/app/Documents/page.tsx
"use client";

import * as React from 'react';
import { useState } from 'react';
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
import { useRouter } from 'next/navigation';

interface Column {
  id: 'title' | 'date' | 'view' | 'download' | 'favorite';
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

const rowsInitial = [
  createData('Document 1', new Date('2023-01-01'), './static/documents/ged.pdf', './static/documents/ged.pdf'),
  createData('Document 2', new Date('2023-02-15'), './static/documents/ged.pdf', './static/documents/ged.pdf'),
  createData('Document 3', new Date('2023-03-10'), './static/documents/ged.pdf', './static/documents/ged.pdf'),
  createData('Document 4', new Date('2023-04-22'), './static/documents/ged.pdf', './static/documents/ged.pdf'),
  createData('Document 5', new Date('2023-05-30'), './static/documents/ged.pdf', './static/documents/ged.pdf'),
];

export default function DocumentTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState(rowsInitial);
  const router = useRouter();

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
        <button onClick={() => router.push('/favoris')}>View Favorites</button>
      </Paper>
    </DefaultLayout>
  );
}
