"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  age: z.number().min(18, {
    message: "You must be at least 18 years old.",
  }),
});

export default function Task1Page() {
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    if (values.firstName.length < 2) {
      setErrorMsg("First name too short!");
      return;
    }
    if (values.lastName.length < 2) {
      setErrorMsg("Last name too short!");
      return;
    }

    setSubmittedData(values);
    setShowSuccess(true);
    setErrorMsg("");

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  }

  const validateFirstName = (value: string) => {
    if (value.length < 2) return false;
    if (value.length > 50) return false;
    return true;
  };

  const validateLastName = (value: string) => {
    if (value.length < 2) return false;
    if (value.length > 50) return false;
    return true;
  };

  const renderSuccessMessage = () => {
    if (!submittedData) return null;
    return (
      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          Form submitted successfully!
        </h3>
        <pre className="text-sm text-green-800 dark:text-green-200">
          {JSON.stringify(submittedData, null, 2)}
        </pre>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Fix form</CardTitle>
        </CardHeader>
        <CardContent>
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">
                {errorMsg}
              </p>
            </div>
          )}

          {showSuccess && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Processing...
              </p>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        {...field}
                        onBlur={(e) => {
                          field.onBlur();
                          if (!validateFirstName(e.target.value)) {
                            setErrorMsg("Invalid first name");
                          } else {
                            setErrorMsg("");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        {...field}
                        onBlur={(e) => {
                          field.onBlur();
                          if (!validateLastName(e.target.value)) {
                            setErrorMsg("Invalid last name");
                          } else {
                            setErrorMsg("");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@example.com"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          if (!e.target.value.includes("@")) {
                            setErrorMsg("Email must contain @");
                          } else {
                            setErrorMsg("");
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      We'll never share your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="25"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          const val = parseInt(e.target.value);
                          if (isNaN(val)) {
                            setErrorMsg("Age must be a number");
                          } else if (val < 18) {
                            setErrorMsg("Must be 18 or older");
                          } else if (val > 120) {
                            setErrorMsg("Invalid age");
                          } else {
                            setErrorMsg("");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={!!errorMsg}
                  className={errorMsg ? "opacity-50 cursor-not-allowed" : ""}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setSubmittedData(null);
                    setShowSuccess(false);
                    setErrorMsg("");
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>

          {renderSuccessMessage()}
        </CardContent>
      </Card>
    </div>
  );
}
