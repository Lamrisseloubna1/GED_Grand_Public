"use client";

import * as React from 'react';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation'; // Import from 'next/navigation'

interface Column {
  id: 'title' | 'date' | 'view' | 'download';
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
      const date = new Date(value);
      return date.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
    },
  },
  { id: 'view', label: 'Visualiser', minWidth: 170, align: 'center' },
  { id: 'download', label: 'Téléchargement', minWidth: 170, align: 'center' },
];

interface Data {
  title: string;
  date: Date;
  view: string;
  download: string;
}

const FavorisPage = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<Data[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      setRows(JSON.parse(favorites));
    }
  }, []);

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
                            ) : column.id === 'date' ? (
                              columns.find(col => col.id === 'date')!.format!(value as Date | number)
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
};

export default FavorisPage;
