"use client";
import { motion } from "motion/react";
import { useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { UploadSuccessDialog } from "@/components/upload-success-screen";
export default function AnalyticsPage() {
   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleUploadComplete = (files: File[]) => {
    setUploadedFiles(files);
    setShowSuccessDialog(true);
  };
  return (
    <>
     <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }} className="p-20 md:p-10  h-full"
        >
          <FileUpload onUploadComplete={handleUploadComplete} />
        </motion.div>
         <UploadSuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        uploadedFiles={uploadedFiles}
      />
    </>
  );
}
