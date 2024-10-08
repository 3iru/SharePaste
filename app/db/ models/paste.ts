import mongoose from 'mongoose';
import { type PasteData } from '@/lib/types/types';

export interface Pastes extends mongoose.Document {
  userId: string;
  paste_data: PasteData[];
  createdAt: Date;
  updatedAt: Date;
}

const pasteSchema = new mongoose.Schema<Pastes>(
  {
    userId: {
      type: String,
      required: true,
      immutable: true,
    },
    paste_data: [
      {
        paste_title: {
          type: String,
          required: true,
        },
        paste_type: {
          type: String,
          required: true,
        },
        paste_content: {
          type: String,
          required: true,
        },
        pastelink_id: {
          type: String,
          required: true,
        },
        storage_type: {
          type: String,
          enum: ['cloud', 'local'],
          required: true,
        },
        isPrivate: {
          type: Boolean,
          required: true,
        },
        shareId: {
          type: String,
          unique: true,
          sparse: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

pasteSchema.methods.toJSON = function () {
  const paste = this;
  const pasteObj = paste.toObject();

  return {
    userId: pasteObj.userId,
    paste_data: pasteObj.paste_data.map((item: Pastes) => {
      const { _id, ...rest } = item;
      return {
        ...rest,
        createdAt: item.createdAt,
      };
    }),

    createdAt: pasteObj.createdAt,
    updatedAt: pasteObj.updatedAt,
  };
};

export default mongoose.models.pastes ||
  mongoose.model<Pastes>('pastes', pasteSchema);
