"use client";
import api from "@/app/_services/api";
import { handleShowFieldErrors } from "@/app/_utils";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

interface CreateTagDialogProps {
  reloadTable: boolean;
  setReloadTable: (reload: boolean) => void;
  setOpen: (open: boolean) => void;
}

const tagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable(),
});

export default function CreateTagDialog(props: CreateTagDialogProps) {
  const { setOpen, setReloadTable, reloadTable } = props;
  const formProps = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(tagSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = formProps;

  const closeForm = () => {
    clearErrors();
    reset();
  };

  const createTag = handleSubmit(async (data: any) => {
    // Logic to create a new tag
    try {
      const response = await api.post("/api/tags", data);

      if (response.data?.is_success) {
        setOpen(false);
        closeForm();
        setReloadTable(!reloadTable);
      }
    } catch (error) {
      const response = (error as any).response;
      console.error("Failed to create tag:", response.data);
      if (response?.data?.errors) {
        handleShowFieldErrors(response.data.errors, setError);
      }
    }
  });

  return (
    <FormProvider {...formProps}>
      <form onSubmit={createTag}>
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem className="relative pb-5">
              <FormLabel>Name</FormLabel>
              <Input
                {...field}
                type="text"
                placeholder="Name"
                className="input"
              />
              <FormDescription className="absolute bottom-0 text-red-500">
                {errors.name?.message as string}
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Input
                {...field}
                type="text"
                placeholder="Description"
                className="input"
              />
              <FormDescription className="text-red-500">
                {errors.description?.message as string}
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-end">
          <Button type="button" className="cursor-pointer">
            <DialogClose>Close</DialogClose>
          </Button>
          <Button className="cursor-pointer" type="submit">
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
