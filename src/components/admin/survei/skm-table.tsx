"use client"

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Survey {
  _id: string;
  age: string;
  gender: string;
  education: string;
  occupation: string;
  serviceType: string;
  createdAt: string;
  [key: string]: any; 
}

const ITEMS_PER_PAGE = 10;

export default function SkmTable() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch('/api/survei/skm/list');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSurveys(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  const totalPages = Math.ceil(surveys.length / ITEMS_PER_PAGE);
  const paginatedSurveys = surveys.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hasil Survei Kepuasan Masyarakat (SKM)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Jenis Layanan</TableHead>
              <TableHead>Umur</TableHead>
              <TableHead>Jenis Kelamin</TableHead>
              <TableHead>Pendidikan</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSurveys.map((survey) => (
              <TableRow key={survey._id}>
                <TableCell>{new Date(survey.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{survey.serviceType}</TableCell>
                <TableCell>{survey.age}</TableCell>
                <TableCell>{survey.gender}</TableCell>
                <TableCell>{survey.education}</TableCell>
                <TableCell>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Eye className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Detail Hasil Survei</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                {Object.entries(survey).map(([key, value]) => {
                                    if (key.startsWith('u')) {
                                        return (
                                            <div key={key} className="grid grid-cols-3 items-center gap-4">
                                                <span className="font-semibold col-span-2">Pertanyaan {key.substring(1)}</span>
                                                <Badge className="justify-self-end">{value}</Badge>
                                            </div>
                                        )
                                    }
                                    return null
                                })}
                            </div>
                        </DialogContent>
                    </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="mt-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink href="#" isActive={currentPage === i + 1} onClick={() => handlePageChange(i + 1)}>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
}
