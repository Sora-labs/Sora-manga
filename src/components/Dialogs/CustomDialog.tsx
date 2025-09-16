"use client";
import { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

interface CustomDialogProps {
  header?: ReactNode;
  description?: string;
  body: ReactNode;
  footer?: ReactNode;
  isCloseButton?: boolean;
}

export default function CustomDialog(props: CustomDialogProps) {
  const { header, description, body, footer, isCloseButton } = props;
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{header}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      {body}
      <DialogFooter>
        {isCloseButton && (
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        )}
        {footer}
      </DialogFooter>
    </DialogContent>
  );
}
