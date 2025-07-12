import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PopoverTrigger } from "@/components/ui/popover";

const searchSchema = z.object({
  lastname: z.string().optional(),
  firstname: z.string().optional(),
  middlename: z.string().optional(),
  age: z.object({
    to: z
      .string()
      .refine((val) => !isNaN(Number(val)))
      .optional(),
    from: z
      .string()
      .refine((val) => !isNaN(Number(val)))
      .optional(),
  }),
  /*
  TODO: FIX DATE
  birthdate: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
   }), 
  */
  religion: z.string().optional(),
});

const searchFields = [
  {
    name: "lastname",
    label: "Last Name",
    type: "text",
  },
  {
    name: "firstname",
    label: "First Name",
    type: "text",
  },
  {
    name: "middlename",
    label: "Middle Name",
    type: "text",
  },
  {
    name: "age",
    label: "Age",
    type: "number",
  },
  /*
  TODO: FIX DATE
  {
    name: "birthdate",
    label: "Birth Date",
    type: "date",
  },
  */
  {
    name: "religion",
    label: "Religion",
    type: "select",
    selection: ["Christianity", "Islam", "Iglesia ni Cristo"],
  },
];

function Search() {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      lastname: "",
      firstname: "",
      middlename: "",
      /*
      TODO: FIX DATE
      birthdate: {to: "", from: ""}
      */
      age: { to: "", from: "" },
      religion: "",
    },
  });

  function onSubmit(values: z.infer<typeof searchSchema>) {
    console.log(values);
  }

  const renderForm = (searchField: (typeof searchFields)[number]) => {
    switch (searchField.type) {
      case "text":
        return (
          <FormField
            control={form.control}
            /* 
              TODO: ADD TYPE
            */
            name={searchField.name as any}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="flex">
                  <FormLabel>{searchField.label}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "number":
        return (
          <div className="flex gap-2">
            <FormLabel>{searchField.label}</FormLabel>
            <FormField
              control={form.control}
              /* 
              TODO: ADD TYPE
              */
              name={`${searchField.name}.to` as any}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" placeholder="to" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              /* 
              TODO: ADD TYPE
              */
              name={`${searchField.name}.from` as any}
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormControl>
                      <Input type="number" placeholder="from" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case "date":
        /* 
      TODO: FIX DATE
      */ return <></>;
      case "select":
        return (
          <FormField
            control={form.control}
            name={searchField.name as any}
            render={({ field }) => (
              <FormItem className="flex">
                <FormLabel>{searchField.label}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a religion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {searchField.selection?.map((selection) => (
                      <SelectItem
                        key={`${searchField.name}-${selection}`}
                        value={selection}
                      >
                        {selection}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
  };
  return (
    <>
      <div className="bg-accent rounded-2xl p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {searchFields.map((searchField) => (
              <div key={`${searchField.name}-field`}>
                {renderForm(searchField)}
              </div>
            ))}
            <Button type="submit">Search</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
export default Search;
