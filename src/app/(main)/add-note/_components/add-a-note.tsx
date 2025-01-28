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
import axios from "axios";
import { useRouter } from "next/navigation";
import { Editor } from "@/components/editor";
import { Frown, HeartCrack, Info, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ActionTooltip } from "@/components/action-tooltip";

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
    message: "Please try to be as descriptive as possible.",
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
  // const queryClient = useQueryClient();

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

  //getting the form state(loading)
  const isLoading = form.formState.isSubmitting;

  //onSubmit handler
  const onSubmit = async (values: z.infer<typeof addANoteFormSchema>) => {
    try {
      const valuesToSend = {
        title: values.title,
        universityShortForm: values.universityShortForm,
        noteType: values.noteType,
        noteDescription: values.noteDescription,
      };

      await axios.post("api/add-note", valuesToSend);

      // queryClient.invalidateQueries({
      //   queryKey: ["searchResults"],
      // });
      // localStorage.removeItem("REACT_QUERY_CACHE");

      toast.success("Successfully created the note.");

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
                  disabled={isLoading}
                  className="md:py-3 md:text-xl text-lg bg-zinc-100 text-black rounded-xl"
                  placeholder="Enter the title of the note"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col justify-between w-full space-y-6 sm:flex-row sm:space-y-0 gap-3">
          <FormField
            control={form.control}
            name="universityShortForm"
            render={({ field }) => (
              <FormItem className="sm:w-[50%]">
                <FormLabel>University short name</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    options={shortNameOptions}
                    className="text-black"
                    isDisabled={isLoading}
                    noOptionsMessage={() => (
                      <div className="flex items-center justify-center gap-2">
                        <Frown className="w-14 h-14 text-rose-600" />
                        <span>
                          Looks like, the university you are looking for is not
                          added yet, kindly contact Admin.
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
                    onChange={(uniShortNameSelectedOption) =>
                      field.onChange(uniShortNameSelectedOption)
                    }
                    isClearable
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
                <FormLabel className="flex items-center gap-2">
                  Type of note
                  <ActionTooltip label="Select a type that suits the best.">
                    <Info className="h-5 w-5" />
                  </ActionTooltip>
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    options={noteTypesOptions}
                    className="text-black"
                    isDisabled={isLoading}
                    noOptionsMessage={() => (
                      <div className="flex items-center justify-center gap-2">
                        <HeartCrack className="w-5 h-5 text-rose-600" />
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
            <FormItem className="md:max-h-80">
              <FormLabel>Description of the note</FormLabel>
              <FormControl>
                <Editor {...field} placeholder={"Click here to write..."} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          type="submit"
          variant={"myButtons"}
          className="w-full text-lg md:text-xl !mt-8 font-semibold"
        >
          Create
          {isLoading && (
            <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin" />
          )}
        </Button>
      </form>
    </Form>
  );
};
