"use client";
import api from "@/app/_services/api";
import { handleShowFieldErrors } from "@/app/_utils";
import CustomDialog from "@/components/Dialogs/CustomDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import CreateTagDialog from "./_components/CreateTagDialog";

export default function TagsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg">Tags</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button>Add</Button>
          </DialogTrigger>
          <CustomDialog body={<CreateTagDialog setOpen={setOpen} />} />
        </Dialog>
      </div>
      <p>Manage your tags here.</p>
    </div>
  );
}
