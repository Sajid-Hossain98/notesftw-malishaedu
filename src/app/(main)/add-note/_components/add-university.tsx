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

const addUniversityFormSchema = z.object({
  universityShortForm: z.string().max(8, {
    message:
      "Short name of the university is required and it should not be more than 8 characters!",
  }),
  universityFullName: z.string().min(5, {
    message: "Full name of the university is required!",
  }),
  logoImage: z
    .instanceof(FileList, {
      message: "Please select an image of university logo.",
    })
    .refine((file) => file.length == 1, {
      message: "Please upload a PNG image file.",
    }),
});

export const AddUniversity = () => {
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
        //TODO: handle error messages with sonner
        console.log("Image error");
      }

      const valuesToSend = {
        universityFullName: values.universityFullName,
        universityShortForm: values.universityShortForm,
        logoImage: imageData?.path,
      };

      await axios.post("api/add-university", valuesToSend);

      form.reset();
      router.refresh();
    } catch (error) {
      //TODO: handle error messages with sonner
      console.log("Error", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="universityShortForm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>University short name</FormLabel>
              <FormControl>
                <Input
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

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};
