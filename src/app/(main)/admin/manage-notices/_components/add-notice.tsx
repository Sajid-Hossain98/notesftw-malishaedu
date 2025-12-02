"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const addNoticeFormSchema = z.object({
  title: z.string().min(2, {
    message:
      "This is important cause only this will be displayed in front page!",
  }),
  description: z.optional(z.string()),
  expiresOn: z.optional(z.date()),
});

export const AddNotice = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof addNoticeFormSchema>>({
    resolver: zodResolver(addNoticeFormSchema),
    defaultValues: {
      title: "",
      description: "",
      expiresOn: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof addNoticeFormSchema>) => {
    try {
      const valuesToSend = {
        title: values.title,
        description: values.description,
        expiresOn: values.expiresOn,
      };

      await axios.post("/api/admin/notices", valuesToSend);

      toast.success("Successfully created the notice and it is active now.");

      form.reset();
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          <div>
            <span className="font-semibold">Something went wrong!</span>
            <p className="text-xs">{error.message}</p>
          </div>
        );
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="mt-5 space-y-3 md:space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title of the notice{" "}
                <span className="text-xs text-zinc-400">
                  (only this will be displayed in the homepage.)
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  className="md:py-3 md:text-xl text-lg bg-zinc-100 text-black rounded-[5px]"
                  placeholder="Enter the title of the notice"
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
              <FormLabel>
                Write a description{" "}
                <span className="text-xs text-zinc-400">(if necessary)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Here goes the description..."
                  className="md:py-3 md:text-xl text-lg bg-zinc-100 text-black rounded-[5px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expiresOn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Expiry date{" "}
                <span className="text-xs text-zinc-400">
                  (optional — leave blank if not needed)
                </span>
              </FormLabel>
              <FormControl>
                <input
                  type="date"
                  className="notice-date-input md:py-3 md:text-xl text-lg bg-zinc-100 text-black rounded-[5px] px-3 w-full border border-black"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
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

        <Button
          disabled={isLoading}
          type="submit"
          variant={"myButtons"}
          className="w-full text-lg md:text-xl !mt-8 font-semibold border border-black"
        >
          Create
          {isLoading && (
            <Loader2 className="w-3 h-3 md:h-4 md:w-4 animate-spin" />
          )}
        </Button>
      </form>
    </Form>
  );
};
