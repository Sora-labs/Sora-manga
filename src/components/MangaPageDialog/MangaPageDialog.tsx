"use client";

import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { z } from "zod";
import { imageSchema } from "@/app/_utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormDescription, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { convertFileObjectToImage } from "@/app/_utils";
import { Circle, CircleXIcon, FolderClosedIcon } from "lucide-react";
import api from "@/app/_services/api";

interface MangaPageDialogProps {
  title: string;
  mangaId: string;
}

const pageSchema = z
  .object({
    pages: z.array(
      z.object({
        image: imageSchema.nullable(),
        pageNum: z.string().min(1, "Page number must be at least 1"),
      })
    ),
  })
  .superRefine((data, ctx) => {
    const seen = new Set<string>();
    console.log("validating unique pageNum", data);
    data.pages.forEach((page, index) => {
      if (seen.has(page.pageNum)) {
        ctx.addIssue({
          code: "custom",
          message: `Duplicate page number: ${page.pageNum}`,
          path: ["pages", index, "pageNum"], // point directly to the duplicate field
        });
      } else {
        seen.add(page.pageNum);
      }
    });
  });

const MangaPageDialog = (props: MangaPageDialogProps) => {
  const { title, mangaId } = props;
  const formProps = useForm({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      pages: [],
    },
    mode: "onSubmit",
  });
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = formProps;

  console.log("add page errors", errors, getValues());

  const onSubmit = handleSubmit(async (data) => {
    console.log("Submitted data:", data);
    const formData = new FormData();
    if (data.pages.length > 0) {
      data.pages.forEach((page, index) => {
        formData.append(`pages[${index}].pageNum`, page.pageNum);
        formData.append(`pages[${index}].image`, page.image as File);
      });
      const result = await api.post(`/api/pages/${mangaId}`, formData);
      console.log("API response:", result.data);
      if (result.data.is_success) {
        alert("Pages uploaded successfully");
      }
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          Upload pages
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xs md:max-w-xl lg:max-w-3xl">
        <Form {...formProps}>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <PageGridContainer control={control} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

interface PageGridContainerProps {
  control: any;
}
const PageGridContainer = (props: PageGridContainerProps) => {
  const { control } = props;
  const {
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  console.log(watch("pages"));
  const { append, remove, update, fields } = useFieldArray({
    control,
    name: "pages",
  });
  console.log("fields", fields);

  const handleClickAddPage = () => {
    append({
      image: null,
      pageNum: String(fields.length + 1),
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 my-2">
      {fields.map((field: any, index) => {
        console.log(field);
        const pageError: any[] = errors.pages ? (errors.pages as any) : [];
        const previewImage = convertFileObjectToImage(field.image);

        return (
          <div key={field.id} className="relative">
            {previewImage ? (
              <div className="relative w-full border-[1] border-dashed dark:border-gray-600">
                <span
                  className="absolute top-1 right-1 p-1 rounded-full cursor-pointer"
                  onClick={() => remove(index)}
                >
                  <CircleXIcon color="black" />
                </span>
                <img src={previewImage} alt="" className="w-full min-h-12" />
              </div>
            ) : null}
            <FormField
              control={control}
              name={`pages.${index}.image`}
              render={({ field: inputField }) => (
                <FormItem>
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder=""
                    name={inputField.name}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        update(index, {
                          ...field,
                          image: file,
                        });
                        clearErrors(`pages.${index}.image`);
                      }
                    }}
                  />
                  <FormDescription>
                    {pageError?.[index]?.image && (
                      <span className="text-red-500">
                        {pageError[index]?.image?.message as string}
                      </span>
                    )}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`pages.${index}.pageNum`}
              render={({ field }) => (
                <FormItem>
                  <Input type="number" placeholder="Page" {...field} />
                  <FormDescription>
                    {pageError?.[index]?.pageNum && (
                      <span className="text-red-500">
                        {pageError[index]?.pageNum?.message as string}
                      </span>
                    )}
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        );
      })}
      <Button onClick={handleClickAddPage}>Add page</Button>
    </div>
  );
};

export default MangaPageDialog;
