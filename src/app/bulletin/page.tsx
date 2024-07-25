"use client"
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

interface Column {
  id: 'bo' | 'date' | 'download';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number | Date) => string;
}

const columns: readonly Column[] = [
  { id: 'bo', label: 'BO', minWidth: 100, align: 'right' },
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
  { id: 'download', label: 'Téléchargement', minWidth: 170, align: 'center' },
];

interface Data {
  bo: number;
  date: Date;
  download?: string;
}

function createData(bo: number, date: Date): Data {
  return { bo, date };
}

const rows = [
  createData(12345, new Date('2023-01-01')),
  createData(67890, new Date('2023-02-15')),
  createData(11121, new Date('2023-03-10')),
  createData(31415, new Date('2023-04-22')),
  createData(16171, new Date('2023-05-30')),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.bo}>
                    {columns.map((column) => {
                      const value = row[column.id as keyof Data];
                      return (
                        <TableCell key={column.id} align={column.align}>
                         {column.id === 'download' ? (
  <IconButton aria-label="download">
    <GetAppIcon />
  </IconButton>
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
