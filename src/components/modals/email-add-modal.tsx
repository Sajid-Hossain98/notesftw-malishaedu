import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { toast } from "sonner";
import axios from "axios";
import Select from "react-select";

import { HeartCrack, Info, Loader2, Mails } from "lucide-react";
import { Input } from "../ui/input";

const addAnEmailFormSchema = z.object({
  email: z
    .string()
    .min(5, { message: "Email is required" })
    .email("Please enter a valid email address"),
  universities: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1, { message: "Select at least one university" }),
});

export const AddEmailModal = () => {
  const { onClose, isOpen, type, data } = useModal();

  const isModalOpen = isOpen && type === "addEmail";

  const { universityShortNames: universityShortNamesData } = data;

  const router = useRouter();

  const form = useForm<z.infer<typeof addAnEmailFormSchema>>({
    resolver: zodResolver(addAnEmailFormSchema),
    defaultValues: {
      email: "",
      universities: [],
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof addAnEmailFormSchema>) => {
    try {
      const valuesToSend = {
        email: values.email,
        universities: values.universities,
      };

      await axios.post("/api/emails", valuesToSend);

      toast.success("Email added");
      form.reset();
      router.refresh();
      onClose();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data || "Something went wrong!");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const universitiesOptions = universityShortNamesData?.map((data) => ({
    label:
      data.universityShortName.charAt(0).toUpperCase() +
      data.universityShortName.slice(1),

    value: data.universityShortName,
  }));

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-[#303030] bg-[#FAFAFA] border-zinc-700 !rounded-xl md:min-w-[50%] w-11/12 p-3 md:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-baseline gap-2 mx-auto text-lg dark:text-zinc-300 sm:text-3xl">
            Add email
            <Mails />
          </DialogTitle>

          <DialogDescription className="mx-auto text-xs">
            Add email addresses for regular checking.
          </DialogDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2 relative"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="md:py-3 md:text-xl text-lg bg-zinc-100 text-black rounded-[5px]"
                        placeholder="malishaedu@gqgmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="universities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Universities
                      <button title="Can be selected one or more universities for which this email needs to be monitored.">
                        <Info className="w-5 h-5" />
                      </button>
                    </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        isMulti
                        value={field.value}
                        options={universitiesOptions}
                        className="text-black border border-black rounded-[5px]"
                        isDisabled={isLoading}
                        noOptionsMessage={() => (
                          <div className="flex items-center justify-center gap-2">
                            <HeartCrack className="w-5 h-5 text-rose-600" />
                            <span>
                              Ohho, it is not added yet, please inform an admin
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
                        placeholder="Select the universities for which this email should be monitored . . ."
                        onChange={(universitiesOptions) =>
                          field.onChange(universitiesOptions)
                        }
                        isClearable
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isLoading}
                type="submit"
                variant={"myButtons"}
                className="w-full py-1 !mt-6 text-sm font-semibold border-2 rounded-none cursor-pointer md:py-2 border-zinc-700 md:text-lg dark:md:hover:bg-black dark:active:bg-black md:hover:bg-zinc-200/80"
              >
                Add
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
