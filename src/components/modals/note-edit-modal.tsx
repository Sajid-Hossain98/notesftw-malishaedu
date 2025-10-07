import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Select from "react-select";
import { BadgeInfo, Frown, Loader2 } from "lucide-react";
import { Editor } from "../editor";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect } from "react";
import { ActionTooltip } from "../action-tooltip";

const editANoteFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title can not be empty!",
  }),
  universityShortForm: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable()
    .refine((val) => val != null, {
      message:
        "A university must be selected, if it is a common note which can be applied for all university then select 'All'",
    }),
  noteDescription: z.string().min(10, {
    message: "Please try to be as descriptive as possible",
  }),
  noteType: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select a note type",
    }),
  approval: z
    .object({
      value: z.enum(["PENDING", "APPROVED", "REJECTED"]),
      label: z.string(),
    })
    .nullable()
    .refine((val) => val != null, {
      message: "Should be selected",
    }),
});

export const NoteEditModal = () => {
  const { onClose, isOpen, type, data } = useModal();

  const isModalOpen = isOpen && type === "editNote";

  const { note, universityShortNames, noteTypes } = data;

  const form = useForm<z.infer<typeof editANoteFormSchema>>({
    resolver: zodResolver(editANoteFormSchema),
    defaultValues: {
      title: note?.title || "",
      universityShortForm: note
        ? {
            value: note.university.universityShortName,
            label: note.university.universityShortName,
          }
        : undefined,
      noteDescription: note?.description || "",
      noteType: note
        ? { value: note.type.name, label: note.type.name }
        : undefined,
      approval: note
        ? { value: note.approval, label: note.approval }
        : undefined,
    },
  });

  useEffect(() => {
    if (note) {
      form.reset({
        title: note.title || "",
        universityShortForm: note
          ? {
              value: note.university.universityShortName,
              label: note.university.universityShortName,
            }
          : undefined,
        noteDescription: note?.description || "",
        noteType: note
          ? { value: note.type.name, label: note.type.name }
          : undefined,
        approval: note
          ? { value: note.approval, label: note.approval }
          : undefined,
      });
    }
  }, [note, form]);

  const universityShortFormOptions = universityShortNames?.map(
    (universityShortName) => ({
      label: universityShortName.universityShortName,
      value: universityShortName.universityShortName,
    })
  );

  const noteTypeOptions = noteTypes?.map((type) => ({
    label: type.name,
    value: type.name,
  }));

  const approvalOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
  ] as const;

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof editANoteFormSchema>) => {
    try {
      const valuesToSend = {
        id: note?.id,
        title: values.title,
        universityShortForm: values.universityShortForm,
        noteType: values.noteType,
        noteDescription: values.noteDescription,
        approval: values.approval,
      };

      await axios.patch("api/admin/notes", valuesToSend);

      toast.success("Updated the note successfully");

      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          <div>
            <span>Something went wrong!</span>
          </div>
        );
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#242424] border-zinc-700 !rounded-xl md:min-w-[60%] w-11/12 p-3 md:p-6">
        <DialogHeader>
          <DialogTitle className="mx-auto text-lg text-zinc-300 sm:text-3xl">
            Modify the note
          </DialogTitle>

          <DialogDescription className="mx-auto text-xs">
            Please make sure none of the fields are empty.
          </DialogDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-sm">
                      Title of the note
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        className="text-lg text-black md:text-xl bg-zinc-100 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col justify-between w-full gap-3 space-y-6 sm:flex-row sm:space-y-0">
                <FormField
                  control={form.control}
                  name="universityShortForm"
                  render={({ field }) => (
                    <FormItem className="sm:w-[50%]">
                      <FormLabel className="!text-sm">
                        University short name
                      </FormLabel>

                      <FormControl>
                        <Select
                          {...field}
                          value={field.value}
                          options={universityShortFormOptions}
                          className="text-black"
                          isDisabled={isLoading}
                          noOptionsMessage={() => (
                            <div className="flex items-center justify-center gap-2">
                              <Frown className="w-14 h-14 text-rose-600" />
                              <span>
                                Looks like, the university you are looking for
                                is not added yet, kindly contact Admin.
                              </span>
                            </div>
                          )}
                          styles={{
                            noOptionsMessage: (baseStyles) => ({
                              ...baseStyles,
                              color: "GrayText",
                              fontSize: "20px",
                              backgroundColor: "#F7F7F7",
                            }),
                            control: (baseStyles) => ({
                              ...baseStyles,
                              backgroundColor: "#F7F7F7",
                              cursor: "pointer",
                            }),
                          }}
                          placeholder="Select a university..."
                          onChange={(universityShortFormSelectionOptions) =>
                            field.onChange(universityShortFormSelectionOptions)
                          }
                        />
                      </FormControl>
                      <FormMessage className="sm:left-0" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="noteType"
                  render={({ field }) => (
                    <FormItem className="sm:w-[50%]">
                      <FormLabel className="!text-sm">Type of note</FormLabel>

                      <FormControl>
                        <Select
                          {...field}
                          value={field.value}
                          options={noteTypeOptions}
                          className="text-black"
                          isDisabled={isLoading}
                          noOptionsMessage={() => (
                            <div className="flex items-center justify-center gap-2">
                              <Frown className="w-14 h-14 text-rose-600" />
                              <span>We don&apos;t have that type</span>
                            </div>
                          )}
                          styles={{
                            noOptionsMessage: (baseStyles) => ({
                              ...baseStyles,
                              color: "GrayText",
                              fontSize: "20px",
                              backgroundColor: "#F7F7F7",
                            }),
                            control: (baseStyles) => ({
                              ...baseStyles,
                              backgroundColor: "#F7F7F7",
                              cursor: "pointer",
                            }),
                          }}
                          placeholder="Select a type..."
                          onChange={(noteTypeSelectedOption) =>
                            field.onChange(noteTypeSelectedOption)
                          }
                        />
                      </FormControl>
                      <FormMessage className="sm:left-0" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="noteDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-sm">
                      Description of the note
                    </FormLabel>

                    <FormControl>
                      <Editor
                        value={field.value || ""}
                        onChange={field.onChange}
                        placeholder=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="approval"
                render={({ field }) => (
                  <FormItem>
                    <span className="flex items-center gap-1">
                      <FormLabel className="!text-sm">Status</FormLabel>

                      <ActionTooltip
                        label='Notes created by an ADMIN or MODERATOR are automatically
                        approved. Selecting "PENDING" keeps the note
                        hidden from the site’s front-end and can be
                        approved later if needed in the pending note section.'
                        side="right"
                      >
                        <BadgeInfo className="flex w-3 h-3" />
                      </ActionTooltip>
                    </span>

                    <FormControl>
                      <Select
                        {...field}
                        value={field.value}
                        options={approvalOptions}
                        className="text-black"
                        isDisabled={isLoading}
                        noOptionsMessage={() => (
                          <div className="flex items-center justify-center gap-2">
                            <Frown className="w-14 h-14 text-rose-600" />
                            <span>One must be selected</span>
                          </div>
                        )}
                        styles={{
                          noOptionsMessage: (baseStyles) => ({
                            ...baseStyles,
                            color: "GrayText",
                            fontSize: "20px",
                            backgroundColor: "#F7F7F7",
                          }),
                          control: (baseStyles) => ({
                            ...baseStyles,
                            backgroundColor: "#F7F7F7",
                            cursor: "pointer",
                          }),
                        }}
                        placeholder="Select a type..."
                        onChange={(approvalSelectedOption) =>
                          field.onChange(approvalSelectedOption)
                        }
                      />
                    </FormControl>
                    <FormMessage className="sm:left-0" />
                  </FormItem>
                )}
              />

              <Button
                disabled={isLoading}
                type="submit"
                variant={"myButtons"}
                className="w-full py-1 !mt-6 text-sm font-semibold border-2 rounded-none cursor-pointer md:py-2 border-zinc-700 md:text-lg md:hover:bg-black active:bg-black"
              >
                Update
                {isLoading && (
                  <Loader2 className="w-3 h-3 md:h-4 md:w-4 animate-spin" />
                )}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
