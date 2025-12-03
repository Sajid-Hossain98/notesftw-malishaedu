import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Loader2 } from "lucide-react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

const editUniversityFormSchema = z.object({
  universityShortForm: z
    .string()
    .min(1, {
      message: "Required and should have at least 1 character!",
    })
    .max(8, {
      message: "Should not be more than 8 characters!",
    })
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: "Only alphabetic letters (a-z, A-Z) are allowed!",
    }),
  universityFullName: z
    .string()
    .min(5, {
      message: "Full name of the university is required!",
    })
    .max(80, {
      message: "Should not be more than 80 characters!",
    }),
});

export const UniversityEditModal = () => {
  const { onClose, isOpen, type, data } = useModal();

  const isModalOpen = isOpen && type === "editUniversity";

  const { university } = data;

  const form = useForm<z.infer<typeof editUniversityFormSchema>>({
    resolver: zodResolver(editUniversityFormSchema),
    defaultValues: {
      universityShortForm: university?.universityShortName || "",
      universityFullName: university?.universityFullName || "",
    },
  });

  useEffect(() => {
    if (university?.universityShortName || university?.universityFullName) {
      form.reset({
        universityShortForm: university?.universityShortName || "",
        universityFullName: university?.universityFullName || "",
      });
    }
  }, [form, university?.universityFullName, university?.universityShortName]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof editUniversityFormSchema>) => {
    try {
      const valuesToSend = {
        id: university?.id,
        universityShortName: values.universityShortForm,
        universityFullName: values.universityFullName,
      };

      await axios.patch("/api/admin/universities", valuesToSend);

      toast.success(`Successfully updated "${university?.universityFullName}"`);

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
      <DialogContent className="dark:bg-[#303030] bg-[#FAFAFA] border-zinc-700 !rounded-xl md:min-w-[50%] w-11/12 p-3 md:p-6">
        <DialogHeader>
          <DialogTitle className="mx-auto text-lg dark:text-zinc-300 sm:text-3xl">
            Modify the university
          </DialogTitle>

          <DialogDescription className="mx-auto text-xs">
            Please make sure none of the fields are empty.
          </DialogDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2 relative"
            >
              <div className="flex flex-col md:gap-3">
                <FormField
                  control={form.control}
                  name="universityShortForm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="!text-sm">
                        <span className="text-red-500">* </span>
                        University short name
                      </FormLabel>

                      <FormControl>
                        <Input
                          className="md:py-2 md:text-xl text-lg bg-zinc-100 text-black rounded-[5px]"
                          disabled={isLoading}
                          placeholder="Enter the short name of the university"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="universityFullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="!text-sm">
                        <span className="text-red-500">* </span>
                        University full name
                      </FormLabel>

                      <FormControl>
                        <Input
                          className="md:py-2 md:text-xl text-lg bg-zinc-100 text-black rounded-[5px]"
                          disabled={isLoading}
                          placeholder="Enter the full name of the university"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                disabled={isLoading}
                type="submit"
                variant={"myButtons"}
                className="w-full py-1 !mt-6 text-sm font-semibold border-2 rounded-none cursor-pointer md:py-2 border-zinc-700 md:text-lg dark:md:hover:bg-black dark:active:bg-black md:hover:bg-zinc-200"
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
