"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import profilePhoto from "@/public/Avatar.svg";
import { Loader2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import {
  useEditUserImageMutation,
  useEditUserMutation,
  useGetUserQuery,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

function Account() {
  const { data, isLoading } = useGetUserQuery();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = useState(data?.first_name || "");
  const [lastName, setLastName] = useState(data?.last_name || "");
  const [email, setEmail] = useState(data?.email || "");
  const [editUser, { isLoading: editLoading }] = useEditUserMutation();
  const [editUserImage, { isLoading: editImageLoading }] =
    useEditUserImageMutation();
  useEffect(
    function () {
      setFirstName(data?.first_name || "");
      setLastName(data?.last_name || "");
      setEmail(data?.email || "");
    },
    [!isLoading]
  );

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handleUpdateImage = async (formData: FormData) => {
    try {
      await editUserImage({ formData }).unwrap();
      toast.success("Profile photo updated successfully!");
    } catch (error) {
      toast.error("Failed to upload profile image.");
    }
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const form = new FormData();
      form.append("file", file);

      await handleUpdateImage(form);
    }
  };
  // console.log(data);

  const handleSubmit = async () => {
    if (!firstName || !lastName) return;

    try {
     await editUser({
        id: data?.id || "",
        first_name: firstName,
        last_name: lastName,
        email: "odionsamuel2005@gmail.com",
      }).unwrap();
      toast.success("User updated successfully!");
    } catch (err) {
      toast.success("Failed to update user!");
    }
  };

  console.log(data);
  return (
    <>
      <div>
        <div className="flex flex-row w-full justify-between items-center gap-4  md:border-b border-[#e9eaeb] pb-6">
          <div className="w-full flex flex-col gap-1 text-[#181d27]">
            <p className="text-xl font-circular-medium leading-7">
              Personal info
            </p>
            <p className="text-[#535862]  font-circular-light leading-5 text-base">
              Update your photo and personal details here.
            </p>
          </div>
          <div className="flex flex-row gap-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="px-6 py-3 text-base curpor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className=" px-6 py-3 text-base cursor-pointer"
            >
                {editLoading ? (
                <>
                  {" "}
                  <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                  Updating...
                </>
              ) : (
                <>
                   Save
                </>
              )}
            
            </Button>
          </div>
        </div>

        <div className="flex flex-row w-full md:border-b border-[#e9eaeb] pb-6 pt-6">
          <div className="w-1/2 md:flex flex-col gap-1 text-[#181d27] hidden">
            <p className="text-base font-circular-medium">Your photo</p>
            <p className="text-sm text-[#535862] leading-5 font-circular-light">
              This will be displayed on your profile
            </p>
          </div>

          <div className="flex flex-col gap-5 items-center max-w-[742px]">
            <Image
              // src={profilePhoto}
              width={100}
              height={100}
              src={
                data?.image_url
                  ? `https://api.timbu.cloud/images/${data.image_url}`
                  : profilePhoto
              }
              alt="profile"
              className="w-[100px] h-[100px] object-center object-cover rounded-full"
            />

            <Button
              id="changePhotoBtn"
              variant="outline"
              className="py-3 px-6 rounded-[12px] bg-white border border-[#1b1b1b] text-[#1b1b1b]"
              onClick={handleButtonClick}
 
            >
              {editImageLoading ? (
                <>
                  {" "}
                  <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                  Updating...
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6" />
                  Change Photo
                </>
              )}
            </Button>

            <Input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex-col flex ">
          <div className="flex flex-col w-full items-center justify-start gap-4  md:border-b border-[#e9eaeb] pb-6 mt-6">
            <div className="flex w-full md:items-center items-start md:flex-row flex-col gap-2 md:gap-4">
              <p className="w-1/5 text-base leading-5">Name</p>

              <Input
                className="md:w-1/3 w-full h-[68px] text-lg placeholder:text-[#B8B8B8] rounded-[9px]"
                type="text"
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFirstName(e.target.value)
                }
                placeholder={isLoading ? "Loading..." : data?.first_name}
              />
              <Input
                className="md:w-1/3 w-full h-[68px] text-lg placeholder:text-[#B8B8B8] rounded-[9px]"
                type="text"
                value={lastName}
                placeholder={isLoading ? "Loading..." : data?.last_name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLastName(e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-col w-full items-center justify-start gap-2 md:gap-4">
            <div className="md:mt-4 mt-0 w-full flex md:flex-row flex-col items-center gap-2 md:gap-4">
              <p className="md:w-1/5 w-full text-base leading-5 ">Email</p>
              <Input
                className="md:w-1/3 w-full h-[68px] text-lg placeholder:text-[#B8B8B8] rounded-[9px]"
                type="email"
                value={email}
                disabled
                placeholder={isLoading ? "Loading..." : data?.email}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Button className="py-3 px-6 bg-[#FF000D] text-base hover:bg-[#FF000D] cursor-pointer">
          Deactivate Account
        </Button>
      </div>
    </>
  );
}

export default Account;
