export interface PasteData {
  paste_title: string;
  paste_type: string;
  paste_content: string;
  pastelink_id: string;
  shareId?: string;
  storage_type: 'cloud' | 'local';
  createdAt: Date;
  isPrivate: boolean;
}

export interface PasteResponse {
  status: number;
  userId?: string;
  message: string;
  success: boolean;
  paste_data?: PasteData[];
  error?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SimpleResponse {
  status: number;
  message: string;
  success: boolean;
  shareId?: string;
  paste_data?: PasteData[];
}
