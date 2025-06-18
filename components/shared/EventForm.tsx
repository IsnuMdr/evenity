"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validator";
import * as z from "zod";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { useUploadThing } from "@/lib/uploadthing";

import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { IEvent } from "@/lib/database/models/event.model";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { FileUploader } from "./FileUploader";
import { Label } from "../ui/label";
import { CalendarIcon, DollarSignIcon } from "lucide-react";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          categoryId: event.category._id,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }
      : eventDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`,
        });

        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {type} Event
          </h1>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Basic Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Label className="text-md block text-gray-700 font-medium mb-2">
                          Event Title*
                        </Label>
                        <FormControl>
                          <input
                            className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            placeholder="Event title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <label
                    htmlFor="eventCategory"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Category*
                  </label>
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Dropdown
                            onChangeHandler={field.onChange}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <label
                    htmlFor="eventPrice"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Ticket Price ($)*
                  </label>
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <div>
                            <input
                              type="number"
                              placeholder="Price"
                              {...field}
                              className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none mb-2"
                              disabled={form.watch("isFree")}
                            />
                            <FormField
                              control={form.control}
                              name="isFree"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="flex items-center">
                                      <Checkbox
                                        onCheckedChange={field.onChange}
                                        checked={field.value}
                                        id="isFree"
                                        className="mr-2 h-5 w-5 border-2 border-primary-500"
                                      />
                                      <label
                                        htmlFor="isFree"
                                        className="text-sm text-gray-600"
                                      >
                                        This is a free event
                                      </label>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            {/* Date & Location Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Date &amp; Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="startDateTime"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Start Date*
                  </label>
                  <FormField
                    control={form.control}
                    name="startDateTime"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <div className="flex-center w-full overflow-hidden px-4 py-2 form-input border border-gray-300 rounded-lg focus:outline-none">
                            <CalendarIcon className="h-5 w-5 text-grey-600" />
                            <DatePicker
                              selected={field.value}
                              onChange={(date: Date | null) =>
                                field.onChange(date)
                              }
                              showTimeSelect
                              timeInputLabel="Time:"
                              dateFormat="MM/dd/yyyy h:mm aa"
                              wrapperClassName="datePicker"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <label
                    htmlFor="endDateTime"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    End Date*
                  </label>
                  <FormField
                    control={form.control}
                    name="endDateTime"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <div className="flex-center w-full overflow-hidden px-4 py-2 form-input border border-gray-300 rounded-lg focus:outline-none">
                            <CalendarIcon className="h-5 w-5 text-grey-600" />
                            <DatePicker
                              selected={field.value}
                              onChange={(date: Date | null) =>
                                field.onChange(date)
                              }
                              showTimeSelect
                              timeInputLabel="Time:"
                              dateFormat="MM/dd/yyyy h:mm aa"
                              wrapperClassName="datePicker"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="eventVenue"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Location*
                  </label>
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <input
                            placeholder="Event location or Online"
                            {...field}
                            className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            {/* Image Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Event Image
              </h2>
              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Image*
                </label>
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl className="h-72">
                        <FileUploader
                          onFieldChange={field.onChange}
                          imageUrl={field.value}
                          setFiles={setFiles}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Description Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Event Description
              </h2>
              <div>
                <label
                  htmlFor="eventDescription"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Description*
                </label>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl className="h-72">
                        <textarea
                          placeholder="Description"
                          {...field}
                          rows={6}
                          className="form-textarea w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Describe your event, what attendees can expect, and any other
                  relevant details.
                </p>
              </div>
            </div>
            {/* URL Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Event URL
              </h2>
              <div>
                <label
                  htmlFor="eventUrl"
                  className="block text-gray-700 font-medium mb-2"
                >
                  URL*
                </label>
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <input
                          placeholder="URL"
                          type="url"
                          {...field}
                          className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Schedule Section */}
            {/* <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Event Schedule
                </h2>
                <button
                  type="button"
                  id="addScheduleItem"
                  className="text-purple-600 hover:text-purple-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Item
                </button>
              </div>
              <div id="scheduleContainer">
                <div className="schedule-item grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                  <div className="md:col-span-1">
                    <label className="block text-gray-700 font-medium mb-2">
                      Time
                    </label>
                    <input
                      type="text"
                      name="scheduleTime[]"
                      defaultValue="4:00 PM"
                      className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      placeholder="e.g., 10:00 AM"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Activity
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="scheduleActivity[]"
                        defaultValue="Gates Open"
                        className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="e.g., Opening Ceremony"
                      />
                      <button
                        type="button"
                        className="remove-schedule ml-2 text-red-500 hover:text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="schedule-item grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                  <div className="md:col-span-1">
                    <label className="block text-gray-700 font-medium mb-2">
                      Time
                    </label>
                    <input
                      type="text"
                      name="scheduleTime[]"
                      defaultValue="4:30 PM"
                      className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      placeholder="e.g., 10:00 AM"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Activity
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="scheduleActivity[]"
                        defaultValue="Opening Act: The Soundwaves"
                        className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="e.g., Opening Ceremony"
                      />
                      <button
                        type="button"
                        className="remove-schedule ml-2 text-red-500 hover:text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="schedule-item grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                  <div className="md:col-span-1">
                    <label className="block text-gray-700 font-medium mb-2">
                      Time
                    </label>
                    <input
                      type="text"
                      name="scheduleTime[]"
                      defaultValue="6:00 PM"
                      className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      placeholder="e.g., 10:00 AM"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Activity
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="scheduleActivity[]"
                        defaultValue="Sunset Strings"
                        className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="e.g., Opening Ceremony"
                      />
                      <button
                        type="button"
                        className="remove-schedule ml-2 text-red-500 hover:text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="schedule-item grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                  <div className="md:col-span-1">
                    <label className="block text-gray-700 font-medium mb-2">
                      Time
                    </label>
                    <input
                      type="text"
                      name="scheduleTime[]"
                      defaultValue="7:30 PM"
                      className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      placeholder="e.g., 10:00 AM"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Activity
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="scheduleActivity[]"
                        defaultValue="Rhythm Collective"
                        className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="e.g., Opening Ceremony"
                      />
                      <button
                        type="button"
                        className="remove-schedule ml-2 text-red-500 hover:text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="schedule-item grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                  <div className="md:col-span-1">
                    <label className="block text-gray-700 font-medium mb-2">
                      Time
                    </label>
                    <input
                      type="text"
                      name="scheduleTime[]"
                      defaultValue="9:00 PM"
                      className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      placeholder="e.g., 10:00 AM"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Activity
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="scheduleActivity[]"
                        defaultValue="Headliner: Melody Masters"
                        className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="e.g., Opening Ceremony"
                      />
                      <button
                        type="button"
                        className="remove-schedule ml-2 text-red-500 hover:text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="schedule-item grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                  <div className="md:col-span-1">
                    <label className="block text-gray-700 font-medium mb-2">
                      Time
                    </label>
                    <input
                      type="text"
                      name="scheduleTime[]"
                      defaultValue="11:00 PM"
                      className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      placeholder="e.g., 10:00 AM"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Activity
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="scheduleActivity[]"
                        defaultValue="Event Ends"
                        className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="e.g., Opening Ceremony"
                      />
                      <button
                        type="button"
                        className="remove-schedule ml-2 text-red-500 hover:text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* Performers/Speakers Section */}
            {/* <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Performers/Speakers
                </h2>
                <button
                  type="button"
                  id="addPerformer"
                  className="text-purple-600 hover:text-purple-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Person
                </button>
              </div>
              <div id="performersContainer">
                <div className="performer-item grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="performerName[]"
                      defaultValue="Melody Masters"
                      className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      placeholder="e.g., John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Role
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="performerRole[]"
                        defaultValue="Headliner"
                        className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="e.g., Keynote Speaker"
                      />
                      <button
                        type="button"
                        className="remove-performer ml-2 text-red-500 hover:text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="performer-item grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="performerName[]"
                      defaultValue="Rhythm Collective"
                      className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      placeholder="e.g., John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Role
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="performerRole[]"
                        defaultValue="Supporting Act"
                        className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="e.g., Keynote Speaker"
                      />
                      <button
                        type="button"
                        className="remove-performer ml-2 text-red-500 hover:text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="performer-item grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="performerName[]"
                      defaultValue="Sunset Strings"
                      className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      placeholder="e.g., John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Role
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="performerRole[]"
                        defaultValue="Supporting Act"
                        className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="e.g., Keynote Speaker"
                      />
                      <button
                        type="button"
                        className="remove-performer ml-2 text-red-500 hover:text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="performer-item grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="performerName[]"
                      defaultValue="The Soundwaves"
                      className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      placeholder="e.g., John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Role
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="performerRole[]"
                        defaultValue="Opening Act"
                        className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="e.g., Keynote Speaker"
                      />
                      <button
                        type="button"
                        className="remove-performer ml-2 text-red-500 hover:text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* Tags Section */}
            {/* <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Event Tags
              </h2>
              <div>
                <label
                  htmlFor="eventTags"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Tags
                </label>
                <input
                  type="text"
                  id="eventTags"
                  name="eventTags"
                  className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="e.g., Music, Festival, Live Performance (comma separated)"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Add tags to help people find your event. Separate tags with
                  commas.
                </p>
              </div>
            </div> */}
            {/* Banner Image Section */}
            {/* <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Event Banner
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="bannerColor"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Banner Color
                  </label>
                  <select
                    id="bannerColor"
                    name="bannerColor"
                    className="form-select w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  >
                    <option value="purple">Purple (Default)</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                    <option value="amber">Amber</option>
                    <option value="pink">Pink</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="bannerIcon"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Banner Icon
                  </label>
                  <select
                    id="bannerIcon"
                    name="bannerIcon"
                    className="form-select w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  >
                    <option value="music">Music Note</option>
                    <option value="tech">Computer</option>
                    <option value="food">Food &amp; Drink</option>
                    <option value="sports">Sports</option>
                    <option value="film">Film</option>
                    <option value="education">Book</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <div
                  id="bannerPreview"
                  className="h-32 rounded-lg flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-white opacity-80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Preview of your event banner
                </p>
              </div>
            </div> */}
            {/* Submit Buttons */}
            <div className="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-4">
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() => router.back()}
                className="px-6 py-3 rounded-lg transition"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
                className="px-6 py-3 rounded-lg transition"
              >
                {form.formState.isSubmitting
                  ? "Submitting..."
                  : `${type} Event `}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Form>
  );
};

export default EventForm;
