"use client";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import api from "@/app/_services/api";
import { MultiSelect } from "@/components/ui/multi-select";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/CustomSelect";
import { mangaType } from "@/constant";
import { Button } from "@/components/ui/button";

const createMangaSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  coverImage: z.instanceof(File).optional(),
  backgroundImage: z.instanceof(File).optional(),
  tags: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    .array()
    .length(0, "At least one tag is required"),
  type: z.enum(["series", "oneshot"]),
});

export default function UploadMangaPage() {
  const formProps = useForm({
    resolver: zodResolver(createMangaSchema),
    defaultValues: {
      name: "",
      description: "",
      coverImage: undefined,
      backgroundImage: undefined,
      tags: [],
    },
    mode: "onChange",
  });
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
    setValue,
  } = formProps;
  const [tagOptions, setTagOptions] = useState<any[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await api.get("/api/tags");
        console.log(response.data);

        if (response.data.is_success) {
          setTagOptions(
            response.data.tags.map((tag: any) => ({
              value: tag._id,
              label: tag.name,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    })();
  }, []);

  const onSubmit = handleSubmit(async (data) => {});

  const onMultiSelect = (value: string[]) => {
    console.log("selecting tag", value);
  };

  return (
    <div className="flex mb-12 py-2 gap-4">
      <div className="px-3 w-full md:w-1/2 lg:w-2/5">
        <h1 className="my-2 text-2xl">Upload a new manga</h1>
        <p className="text-sm text-gray-500 mb-2">
          For better upload experience please use a desktop device
        </p>
        <Form {...formProps}>
          <form onSubmit={onSubmit} className="space-y-6">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Name"
                    className="input"
                  />
                  <FormDescription className="text-red-500">
                    {errors.name?.message}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={control}
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
                    {errors.name?.message}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <MultiSelect
                    asChild
                    options={tagOptions}
                    onValueChange={onMultiSelect}
                    placeholder="Select tags"
                    className="input"
                    name="tags"
                  />
                  <FormDescription className="text-red-500">
                    {errors.tags?.message}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <CustomSelect
                    options={mangaType}
                    placeholder="Type"
                    defaultValue={mangaType[1]}
                    {...field}
                  />
                  <FormDescription className="text-red-500">
                    {errors.tags?.message}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover image</FormLabel>
                  <Input name={field.name} type="file" className="input" />
                  <FormDescription className="text-red-500">
                    {errors.tags?.message}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="backgroundImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background</FormLabel>
                  <Input type="file" name={field.name} className="input" />
                  <FormDescription className="text-red-500">
                    {errors.tags?.message}
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Upload
            </Button>
          </form>
        </Form>
      </div>

      {/* preview component */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5">
        <h2 className="my-2 text-2xl">Preview</h2>
        <div className="w-full">
          <img src="" alt="" className="w-full" />
        </div>
      </div>
    </div>
  );
}
