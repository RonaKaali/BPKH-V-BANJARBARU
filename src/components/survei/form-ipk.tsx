"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const surveyQuestions = [
    { id: "u1", text: "Tidak ada praktik pungutan liar (pungli) atau biaya di luar ketentuan resmi." },
    { id: "u2", text: "Prosedur pelayanan tidak berbelit-belit dan mudah diikuti." },
    { id: "u3", text: "Petugas memberikan pelayanan dengan cepat dan tepat waktu sesuai jadwal." },
    { id: "u4", text: "Petugas bersikap adil dan tidak memihak dalam memberikan pelayanan." },
    { id: "u5", text: "Informasi mengenai alur, biaya, dan waktu pelayanan tersedia secara transparan." },
    { id: "u6", text: "Tidak ada pemberian imbalan (uang/barang) di luar ketentuan kepada petugas." },
    { id: "u7", text: "Petugas tidak menerima gratifikasi yang dapat mempengaruhi pengambilan keputusan." },
    { id: "u8", text: "Tidak ada praktik nepotisme atau kolusi dalam proses pelayanan." },
    { id: "u9", text: "Terdapat sistem pengaduan yang jelas dan mudah diakses jika terjadi penyimpangan." },
];

const formSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  age: z.string().min(1, "Umur wajib diisi"),
  gender: z.string().min(1, "Jenis kelamin wajib diisi"),
  education: z.string().min(1, "Pendidikan terakhir wajib diisi"),
  occupation: z.string().min(1, "Pekerjaan utama wajib diisi"),
  u1: z.string().min(1, "Jawaban wajib diisi"),
  u2: z.string().min(1, "Jawaban wajib diisi"),
  u3: z.string().min(1, "Jawaban wajib diisi"),
  u4: z.string().min(1, "Jawaban wajib diisi"),
  u5: z.string().min(1, "Jawaban wajib diisi"),
  u6: z.string().min(1, "Jawaban wajib diisi"),
  u7: z.string().min(1, "Jawaban wajib diisi"),
  u8: z.string().min(1, "Jawaban wajib diisi"),
  u9: z.string().min(1, "Jawaban wajib diisi"),
});

export function FormIpk() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      education: "",
      occupation: "",
      ...Object.fromEntries(surveyQuestions.map(q => [q.id, ""])),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/survei/ipk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      toast.success("Survei berhasil dikirim! Terima kasih atas partisipasi Anda.");
      form.reset();
    } catch (error) {
      toast.error("Gagal mengirim survei. Silakan coba lagi.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
                <CardTitle>Data Responden</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                            <Input placeholder="Contoh: Budi" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Umur</FormLabel>
                        <FormControl>
                            <Input placeholder="Contoh: 30" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Jenis Kelamin</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih jenis kelamin" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                <SelectItem value="Perempuan">Perempuan</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Pendidikan Terakhir</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih pendidikan terakhir" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="SD">SD</SelectItem>
                                <SelectItem value="SMP">SMP</SelectItem>
                                <SelectItem value="SMA">SMA</SelectItem>
                                <SelectItem value="D3">D3</SelectItem>
                                <SelectItem value="S1">S1</SelectItem>
                                <SelectItem value="S2">S2</SelectItem>
                                <SelectItem value="S3">S3</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Pekerjaan</FormLabel>
                        <FormControl>
                            <Input placeholder="Contoh: Wiraswasta" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>

            <CardHeader className="mt-8">
                <CardTitle>Kuesioner</CardTitle>
                <FormDescription>
                    Pilih salah satu jawaban yang paling sesuai dengan pengalaman Anda.
                    (1 = Sangat Tidak Setuju, 2 = Tidak Setuju, 3 = Setuju, 4 = Sangat Setuju)
                </FormDescription>
            </CardHeader>
            <CardContent className="space-y-8">
            {surveyQuestions.map((question, index) => (
              <FormField
                key={question.id}
                control={form.control}
                name={question.id as "u1"}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{index + 1}. {question.text}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="1" />
                          </FormControl>
                          <FormLabel className="font-normal">Sangat Tidak Setuju</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="2" />
                          </FormControl>
                          <FormLabel className="font-normal">Tidak Setuju</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="3" />
                          </FormControl>
                          <FormLabel className="font-normal">Setuju</FormLabel>
                        </FormItem>
                         <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="4" />
                          </FormControl>
                          <FormLabel className="font-normal">Sangat Setuju</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            </CardContent>

            <CardFooter>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Kirim Survei
                </Button>
            </CardFooter>
        </form>
        </Form>
    </Card>
  );
}
