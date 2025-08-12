"use client";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm } from "react-hook-form";
import { keyof, z } from "zod";
import { useCallback, useEffect, useState } from "react";
import api from "@/app/_services/api";
import { MultiSelect } from "@/components/ui/multi-select";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/CustomSelect";
import { mangaType } from "@/constant";
import { Button } from "@/components/ui/button";
import PreviewManga from "@/components/Preview/PreviewManga";
import { Textarea } from "@/components/ui/textarea";
import { convertFileObjectToImage } from "@/app/_utils";
import { redirect } from "next/navigation";
import { MangaDetail } from "@/components/MangaDetail/MangaDetail";

const createMangaSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  coverImage: z.instanceof(File).optional(),
  backgroundImage: z.instanceof(File).optional(),
  tags: z.string().array().min(1, "At least one tag is required"),
  type: z.string().min(1, "Type is required"),
  previewTags: z.object().array(),
});

const defaultValues = {
  name: "",
  description: "",
  coverImage: undefined,
  backgroundImage: undefined,
  tags: [],
  type: "",
  previewTags: [],
};

export default function UploadMangaPage() {
  const [loading, setLoading] = useState(false);
  const formProps = useForm({
    resolver: zodResolver(createMangaSchema),
    defaultValues,
    mode: "onChange",
  });
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = formProps;
  watch();
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

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    setLoading(true);
    // convert pbject to form data
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description ?? "");
    // change later if we update the type feature
    formData.append("type", "oneshot");
    const tags = data.tags;
    tags.forEach((tag) => formData.append(`tags`, tag));
    formData.append("cover_image", data.coverImage as Blob);
    formData.append("background_image", data.coverImage as Blob);
    const response = await api.post("/api/mangas", formData);
    setLoading(false);
    if (!response.data?.is_success) {
      alert("Failed to upload manga");
      return;
    }
    redirect("/");
  });

  const onMultiSelect = (value: string[]) => {
    console.log("selecting tag", value, tagOptions);
    setValue("tags", value);
    setValue(
      "previewTags",
      value.map((value) => tagOptions.find((tag) => tag.value === value))
    );
  };

  const handleConvertPreviewItem = useCallback(() => {
    const previewData = getValues();
    const convertData: MangaDetail = {
      title: previewData.name,
      description: previewData.description,
      coverImage: convertFileObjectToImage(previewData.coverImage),
      backgroundImage: convertFileObjectToImage(previewData.backgroundImage),
      // use preview
      tags: previewData.previewTags,
      type: previewData.type,
    };
    console.log(convertData);

    return convertData;
  }, [getValues()]);

  const handleImageChange = (field: any, file?: File) => {
    setValue(field, file);
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
                  <FormLabel className="gap-0">
                    Name
                    <span className="text-red-500">*</span>
                  </FormLabel>
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
                  <Textarea
                    {...field}
                    placeholder="Description"
                    className="input"
                  />
                  <FormDescription className="text-red-500">
                    {errors.description?.message}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel className="gap-0">
                    Tags
                    <span className="text-red-500">*</span>
                  </FormLabel>
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="gap-0">
                    Type
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <CustomSelect
                    options={mangaType}
                    placeholder="Type"
                    defaultValue={mangaType[1]}
                    {...field}
                  />
                  <FormDescription className="text-red-500">
                    {errors.type?.message}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="gap-0">
                    Cover image<span className="text-red-500">*</span>
                  </FormLabel>
                  <Input
                    accept="image/*"
                    name={field.name}
                    onChange={(e) =>
                      handleImageChange(field.name, e.target.files?.[0])
                    }
                    type="file"
                    className="input"
                  />
                  <FormDescription className="text-red-500">
                    {errors.coverImage?.message}
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
                  <Input
                    accept="image/*"
                    type="file"
                    name={field.name}
                    className="input"
                    onChange={(e) =>
                      handleImageChange(field.name, e.target.files?.[0])
                    }
                  />
                  <FormDescription className="text-red-500">
                    {errors.backgroundImage?.message}
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

      <PreviewManga previewItem={handleConvertPreviewItem()} />
    </div>
  );
}
