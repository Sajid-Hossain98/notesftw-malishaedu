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
import Select from "react-select";
import { Frown, Loader2 } from "lucide-react";

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
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

const noticeEditModalSchema = z.object({
  title: z.string().min(2, {
    message:
      "This is important cause only this will be displayed in front page!",
  }),
  description: z.optional(z.string()),
  expiresOn: z.optional(z.date()),
  status: z
    .object({
      value: z.enum(["ACTIVE", "INACTIVE"]),
      label: z.string(),
    })
    .nullable()
    .refine((val) => val != null, {
      message: "Should be selected",
    }),
});

export const NoticeEditModal = () => {
  const { onClose, isOpen, type, data } = useModal();

  const isModalOpen = isOpen && type === "editNotice";

  const { notice } = data;

  const router = useRouter();

  const form = useForm<z.infer<typeof noticeEditModalSchema>>({
    resolver: zodResolver(noticeEditModalSchema),
    defaultValues: {
      title: notice?.title || "",
      description: notice?.description || "",
      expiresOn: notice?.expiresOn || undefined,
      status: notice
        ? { value: notice.status, label: notice.status }
        : undefined,
    },
  });

  useEffect(() => {
    if (notice?.title || notice?.description || notice?.expiresOn) {
      form.reset({
        title: notice?.title || "",
        description: notice?.description || "",
        expiresOn: notice?.expiresOn || undefined,
        status: notice
          ? { value: notice.status, label: notice.status }
          : undefined,
      });
    }
  }, [form, notice, notice?.description, notice?.expiresOn, notice?.title]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof noticeEditModalSchema>) => {
    try {
      const valuesToSend = {
        id: notice?.id,
        title: values.title,
        description: values.description,
        status: values.status.value,
        expiresOn: values.expiresOn,
      };

      await axios.patch("/api/admin/notices", valuesToSend);

      toast.success(`Successfully updated`);

      onClose();
      router.refresh();
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

  const noticeStatusOptions = [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
  ] as const;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-[#303030] bg-[#FAFAFA] border-zinc-700 !rounded-xl md:min-w-[50%] w-11/12 p-3 md:p-6">
        <DialogHeader>
          <DialogTitle className="mx-auto text-lg dark:text-zinc-300 sm:text-3xl">
            Modify the notice
          </DialogTitle>

          <DialogDescription className="mx-auto text-xs">
            To edit the notice
          </DialogDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2"
            >
              <div className="flex flex-col md:gap-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="!text-sm">Title </FormLabel>

                      <FormControl>
                        <Input
                          className="md:py-2 md:text-xl text-lg bg-zinc-100 text-black rounded-[5px]"
                          disabled={isLoading}
                          placeholder="Title of the notice"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="!text-sm">
                        Description{" "}
                        <span className="text-xs text-zinc-400">
                          (if necessary)
                        </span>
                      </FormLabel>

                      <FormControl>
                        <Textarea
                          placeholder="Need to describe anything?..."
                          className="md:py-3 md:text-xl text-lg bg-zinc-100 text-black rounded-[5px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col justify-between w-full space-y-3 sm:flex-row sm:space-y-0 gap-1 md:gap-3">
                  <FormField
                    control={form.control}
                    name="expiresOn"
                    render={({ field }) => (
                      <FormItem className="sm:w-[50%]">
                        <FormLabel className="!text-sm">
                          Expiry date{" "}
                          <span className="text-xs text-zinc-400">
                            (optional — leave blank if not needed)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <input
                            type="date"
                            className="md:py-1.5 md:text-xl text-lg bg-zinc-100 text-black rounded-[5px] px-3 w-full border border-black"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value
                                ? new Date(e.target.value)
                                : undefined;
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="sm:w-[50%]">
                        <FormLabel className="!text-sm">Status</FormLabel>

                        <FormControl>
                          <Select
                            {...field}
                            value={field.value}
                            options={noticeStatusOptions}
                            className="text-black border border-black rounded-[5px]"
                            isDisabled={isLoading}
                            isSearchable={false}
                            noOptionsMessage={() => (
                              <div className="flex items-center justify-center gap-2">
                                <Frown className="w-14 h-14 text-rose-600" />
                                <span>No Result</span>
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
                            placeholder="Select one"
                            onChange={(noticeStatusSelectedOption) =>
                              field.onChange(noticeStatusSelectedOption)
                            }
                          />
                        </FormControl>
                        <FormMessage className="sm:left-0" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                disabled={isLoading}
                type="submit"
                variant={"myButtons"}
                className="w-full py-1 !mt-6 text-sm font-semibold border-2 rounded-none cursor-pointer md:py-2 border-zinc-700 md:text-lg dark:md:hover:bg-black dark:active:bg-black md:hover:bg-zinc-200/80"
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
