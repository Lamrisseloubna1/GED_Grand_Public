"use client";
import * as React from 'react';
import { useState } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
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

interface Column {
  id: 'bo' | 'date' | 'view' | 'download';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number | Date) => string;
}

const columns: readonly Column[] = [
  { id: 'bo', label: 'Bulletin Officiel', minWidth: 100, align: 'right' },
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
  { id: 'download', label: 'Téléchargement', minWidth: 170, align: 'center' },];

interface Data {
  bo: number;
  date: Date;
  view: string;
  download: string;
}

function createData(bo: number, date: Date,  view: string, download: string): Data {
  return { bo, date, view, download};
}

const rowsInitial = [
  createData(12345, new Date('2023-01-01'), './static/documents/doc.pdf','./static/documents/doc.pdf'),
  // Add more rows as needed
  /* createData(67890, new Date('2023-02-15'), '/path/to/document2.pdf'),
  createData(11121, new Date('2023-03-10'), '/path/to/document3.pdf'),
  createData(31415, new Date('2023-04-22'), '/path/to/document4.pdf'),
  createData(16171, new Date('2023-05-30'), '/path/to/document5.pdf'), */
];

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState(rowsInitial);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bulletins Officiels" />

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
                .map((row,index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.bo}
                    >
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
                            ) : column.format && typeof value === 'number' || value instanceof Date ? (
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
      
    </DefaultLayout>
  );
}
