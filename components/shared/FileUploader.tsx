"use client";

// import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";

type FileWithPath = File & { path?: string };

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const FileUploader = ({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*"]),

  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex min-h-[210px] p-regular-10 md:p-regular-12 px-3 md:px-6 py-2 md:py-3 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt="image"
            width={100}
            height={100}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-2 text-grey-500">
          <img
            src="/assets/icons/upload.svg"
            width={100}
            height={100}
            alt="file upload"
          />
          <h3>Drag photo here</h3>
          <p>SVG, PNG, JPG</p>
          <Button className="button w-fit mt-2">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
