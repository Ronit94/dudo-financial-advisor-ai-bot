import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, FileText, Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface UploadSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  uploadedFiles: File[];
}

export function UploadSuccessDialog({ 
  open, 
  onOpenChange, 
  uploadedFiles 
}: UploadSuccessDialogProps) {
  const totalSize = uploadedFiles.reduce((sum, file) => sum + file.size, 0);
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.1 
            }}
            className="mx-auto mb-4"
          >
            <div className="relative">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute inset-0 rounded-full border-2 border-green-500/20"
                style={{ 
                  boxShadow: "0 0 30px hsl(var(--primary) / 0.3)" 
                }}
              />
            </div>
          </motion.div>

          <DialogTitle className="text-center text-xl font-semibold">
            Upload Successful!
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Your {uploadedFiles.length} file{uploadedFiles.length > 1 ? 's have' : ' has'} been uploaded successfully.
          </DialogDescription>
        </DialogHeader>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">Upload Summary</span>
              <Badge variant="secondary">
                {uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''}
              </Badge>
            </div>
            
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate max-w-[180px]">{file.name}</span>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    {formatSize(file.size)}
                  </span>
                </motion.div>
              ))}
            </div>
            
            <div className="border-t mt-3 pt-3 flex justify-between text-sm">
              <span className="font-medium">Total Size:</span>
              <span className="text-muted-foreground">{formatSize(totalSize)}</span>
            </div>
          </div>

          <motion.div 
            className="flex gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button 
              className="flex-1"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Download className="h-4 w-4 mr-2" />
              View Files
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}