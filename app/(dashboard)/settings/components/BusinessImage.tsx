"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LogoPhoto from "@/public/modal-images/Logo-Wrapper.png";
import { Plus } from "lucide-react";
import { useUpdateOrganizationImageMutation } from "@/redux/features/organizationImage/organizationImage.api";
import { useGetOrganizationsQuery } from "@/redux/features/auth/auth.api";
import { useStore } from "@/store/useStore";

export default function BusinessImage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const { organizationId } = useStore();
  const { data, isLoading } = useGetOrganizationsQuery();
  const currentOrg = data?.data.find(
    (eachOrganization) => organizationId === eachOrganization.id
  );
  const image = currentOrg?.image_url;
  const [updateImage] = useUpdateOrganizationImageMutation();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const form = new FormData();
      form.append("file", file);
      updateImage({ organization_id: organizationId, formData: form });
    }
  };
  return (
    <div className="flex flex-col gap-5 items-start w-full">
      {!isLoading ? (
        <Image
          src={image ? `https://api.timbu.cloud/images/${image}` : LogoPhoto}
          alt="profile"
          width={145}
          height={49}
          className="w-[full] h-[49px] object-contain"
        />
      ) : (
        <div className="h-[49px] w-[145px] bg-transparent"></div>
      )}

      <Button
        variant="outline"
        className="py-3 px-6 rounded-[12px] bg-white border border-[#1b1b1b] text-[#1b1b1b]"
        onClick={handleButtonClick}
      >
        <Plus className="w-6 h-6" />
        Change Photo
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
