"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Select from "react-select";

import { Button } from "@/components/ui/button";
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
import axios from "axios";
import { useRouter } from "next/navigation";

interface AddANoteProps {
  universityShortNameData: { universityShortName: string }[];
  noteTypes: { name: string }[];
}

const addANoteFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  universityShortForm: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "oops, you forgot to select one!",
    }),
  noteDescription: z.string().min(10, {
    message: "Please try to be as specific as possible.",
  }),
  noteType: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "ooh come on, select one for God's sake",
    }),
});

export const AddANote = ({
  universityShortNameData,
  noteTypes,
}: AddANoteProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof addANoteFormSchema>>({
    resolver: zodResolver(addANoteFormSchema),
    defaultValues: {
      title: "",
      universityShortForm: undefined,
      noteDescription: "",
      noteType: undefined,
    },
  });

  //mapping over the universityShortNames to adjust it fro react-select's options prop
  const shortNameOptions = universityShortNameData.map((data) => ({
    label:
      data.universityShortName.charAt(0).toUpperCase() +
      data.universityShortName.slice(1),

    value: data.universityShortName,
  }));

  const noteTypesOptions = noteTypes.map((type) => ({
    label: type.name.charAt(0).toUpperCase() + type.name.slice(1),
    value: type.name,
  }));

  //onSubmit handler
  const onSubmit = async (values: z.infer<typeof addANoteFormSchema>) => {
    const valuesToSend = {
      title: values.title,
      universityShortForm: values.universityShortForm,
      noteType: values.noteType,
      noteDescription: values.noteDescription,
    };

    await axios.post("api/add-note", valuesToSend);
    form.reset();
    router.refresh();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:mt-10 mt-4 md:space-y-8 space-y-5 lg:max-w-[80%] md:max-w-[70%] mx-auto relative mb-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title of the note</FormLabel>
              <FormControl>
                <Input
                  className="md:py-3 md:text-xl text-lg bg-[#ebf2fa] text-black rounded-xl"
                  placeholder="Enter the title of the note"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col justify-between w-full space-y-6 sm:flex-row sm:space-y-0">
          <FormField
            control={form.control}
            name="universityShortForm"
            render={({ field }) => (
              <FormItem className="sm:w-[48%]">
                <FormLabel>University short name</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    options={shortNameOptions}
                    onChange={(uniShortNameSelectedOption) =>
                      field.onChange(uniShortNameSelectedOption)
                    }
                    isClearable
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="noteType"
            render={({ field }) => (
              <FormItem className="sm:w-[48%]">
                <FormLabel>Type of note</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    options={noteTypesOptions}
                    onChange={(noteTypeSelectedOption) =>
                      field.onChange(noteTypeSelectedOption)
                    }
                    isClearable
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="noteDescription"
          render={({ field }) => (
            <FormItem className="max-h-40">
              <FormLabel>Description of the note</FormLabel>
              <FormControl>
                <Textarea
                  className="placeholder:text-base placeholder-gray-400 text-black bg-[#ebf2fa]"
                  {...field}
                  placeholder="Please describe the note properly."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"myButtons"} className="w-full text-lg">
          Create
        </Button>
      </form>
    </Form>
  );
};
