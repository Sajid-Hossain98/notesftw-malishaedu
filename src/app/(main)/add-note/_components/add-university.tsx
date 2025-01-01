"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import uniqid from "uniqid";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseClient } from "@/lib/supabase-client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const addUniversityFormSchema = z.object({
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
  logoImage:
    typeof window === "undefined"
      ? z.any()
      : z.instanceof(FileList).refine((file) => file.length == 1, {
          message: "Please upload a PNG image file.",
        }),
});

export const AddAnUniversity = () => {
  const router = useRouter();
  const { storage } = createSupabaseClient();

  const form = useForm<z.infer<typeof addUniversityFormSchema>>({
    resolver: zodResolver(addUniversityFormSchema),
    defaultValues: {
      universityShortForm: "",
      universityFullName: "",
      logoImage: undefined,
    },
  });

  const fileRef = form.register("logoImage");

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof addUniversityFormSchema>) => {
    try {
      const imageFile = values.logoImage?.[0];

      if (!imageFile) {
        console.log("Missing image");
        return;
      }

      const uniqueID = uniqid();

      //uploading image to supabase
      const { data: imageData, error: imageError } = await storage
        .from("uni_logo_images")
        .upload(`image-${values.universityShortForm}-${uniqueID}`, imageFile, {
          cacheControl: "36000",
          upsert: false,
        });

      if (imageError) {
        console.log("Image error");
        toast.error("Failed to upload the image. Please try again.");
      }

      const valuesToSend = {
        universityFullName: values.universityFullName,
        universityShortForm: values.universityShortForm.toUpperCase(),
        logoImage: imageData?.path,
      };

      await axios.post("/api/add-university", valuesToSend);

      toast.success(`Successfully created ${values.universityFullName}`);

      form.reset();
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const backendError = error.response.data?.error;

        toast.error(
          <div className="inline-flex items-center gap-2">
            <span className="font-semibold">Error:</span>
            <p>{backendError || "Something went wrong!"}</p>
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
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:mt-10 mt-4 md:space-y-8 space-y-5 lg:max-w-[80%] md:max-w-[70%] mx-auto relative mb-10"
      >
        <FormField
          control={form.control}
          name="universityShortForm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>University short name</FormLabel>
              <FormControl>
                <Input
                  className="md:py-3 md:text-xl text-lg bg-[#F7F7F7] text-black rounded-xl"
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
              <FormLabel>University full name</FormLabel>
              <FormControl>
                <Input
                  className="md:py-3 md:text-xl text-lg bg-[#F7F7F7] text-black rounded-xl"
                  disabled={isLoading}
                  placeholder="Enter the full name of the university"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logoImage"
          render={() => (
            <FormItem>
              <FormLabel>University logo</FormLabel>
              <FormControl>
                <Input
                  className="bg-[#F7F7F7] text-black text-lg rounded-xl file:bg-slate-400 cursor-pointer py-0 file:py-2 px-0 md:px-0 file:px-4"
                  type="file"
                  accept="image/png"
                  disabled={isLoading}
                  {...fileRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant={"myButtons"}
          className="w-full text-lg md:text-xl !mt-8 font-semibold"
          type="submit"
        >
          Create
        </Button>
      </form>
    </Form>
  );
};
