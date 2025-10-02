import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import Select from "react-select";
import { Frown, Loader2 } from "lucide-react";
import { Editor } from "../editor";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { useEffect } from "react";


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

  const { note } = data;


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
      approval: note ? { value: note.approval, label: note.approval } : undefined,
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

  const universityShortFormOptions = note?.university
    ? [
        {
          label:
            note.university.universityShortName.charAt(0).toUpperCase() +
            note.university.universityShortName.slice(1),
          value: note.university.universityShortName,
        },
      ]
    : [];

  const noteTypeOptions = note?.type ? [{
    label:
      note?.type.name.charAt(0).toUpperCase() +
      note?.type.name.slice(1),
    value: note?.type.name,
  }] : [] ;

  const approvalOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
  ] as const;

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof editANoteFormSchema>) => {
    try {
      const valuesToSend = {
        title: values.title,
        universityShortForm: values.universityShortForm?.value,
        noteType: values.noteType?.value,
        noteDescription: values.noteDescription,
        approval: values.approval?.value,
      };

      console.log(values)

      await axios.patch("api/edit-note", valuesToSend);

      toast.success("Updated the note successfully");

      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          <div>
            <span>Something went wrong!</span>
            <p>{error.message}</p>
          </div>
        );
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title of the note</FormLabel>

                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="universityShortForm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University short name</FormLabel>

                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      options={universityShortFormOptions}
                      isDisabled={isLoading}
                      noOptionsMessage={() => (
                        <div className="flex items-center justify-center gap-2">
                          <Frown className="w-14 h-14 text-rose-600" />
                          <span>
                            Looks like, the university you are looking for is
                            not added yet, kindly contact Admin.
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
                <FormItem>
                  <FormLabel>Type of note</FormLabel>

                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      options={noteTypeOptions}
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

            <FormField
              control={form.control}
              name="noteDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description of the note</FormLabel>

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
                  <FormLabel>Status</FormLabel>

                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      options={approvalOptions}
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
              className="w-full text-lg md:text-xl !mt-8 font-semibold"
            >
              Update
              {isLoading && (
                <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin" />
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );

};
