'use server';

import dbConnect from '../db/dbconnect';
import pastes from '../db/ models/paste';
import { type Pastes } from '../db/ models/paste';
import { v4 as uuidv4 } from 'uuid';
import { type PasteData } from '../../lib/types/types';
import { generatepastelink } from './utils';
import { type PasteResponse, type SimpleResponse } from '../../lib/types/types';

export async function createnewuser(): Promise<PasteResponse> {
  try {
    await dbConnect();

    const newUser: Pastes = await pastes.create({
      userId: uuidv4(),
      paste_data: [
        {
          paste_title: 'welcome.md',
          paste_type: 'markdown',
          paste_content: `
## Overview

**SharePaste** is a simple pastebin application built with Next.js, Tailwind CSS, and MongoDB. It allows users to create, save, and share code snippets or text with syntax highlighting, making it ideal for developers and anyone who needs to share text easily.

## Features

- **Syntax Highlighting**: Automatically detects file types based on filename extension and provides syntax highlighting for a better reading experience.
- **Local & Cloud Storage**: Save your pastes locally in the browser's local storage or in the cloud using MongoDB.
- **Shareable Links**: Generate a unique link for each paste that can be shared with anyone.
- **Responsive Design**: Fully responsive layout, ensuring a great user experience on all devices.

## Contact

If you have any questions or feedback, feel free to reach out on [GitHub](https://github.com/yourusername).
    `,
          pastelink_id: 'welcome',
          storage_type: 'cloud',
          isPrivate: true,
        },
      ],
    });
    return {
      status: 201,
      message: 'User created successfully.',
      userId: newUser.userId,
      success: true,
      paste_data: newUser.paste_data.map((item: PasteData) => ({
        paste_title: item.paste_title,
        paste_type: item.paste_type,
        paste_content: item.paste_content,
        pastelink_id: item.pastelink_id,
        isPrivate: item.isPrivate,
        storage_type: item.storage_type,
        createdAt: item.createdAt,
      })),
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: 'An error occurred',
      success: false,
      error: 'Failed to create user.',
    };
  }
}

export async function createnewpaste(
  newPasteData: PasteData,
  userId: string
): Promise<PasteResponse> {
  try {
    await dbConnect();
    const newPaste = await pastes.findOneAndUpdate(
      { userId: userId },
      { $push: { paste_data: newPasteData } },
      { new: true }
    );
    if (!newPaste) {
      throw new Error('No paste found for the given user ID.');
    }

    return {
      status: 201,
      message: 'Paste created successfully.',
      userId: newPaste.userId,
      success: true,
      paste_data: newPaste.paste_data.map((item: PasteData) => ({
        paste_title: item.paste_title,
        paste_type: item.paste_type,
        paste_content: item.paste_content,
        pastelink_id: item.pastelink_id,
        storage_type: item.storage_type,
        isPrivate: item.isPrivate,
        createdAt: item.createdAt,
      })),
      createdAt: newPaste.createdAt,
      updatedAt: newPaste.updatedAt,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: 'An error occurred',
      success: false,
      error: 'Failed to create Paste.',
    };
  }
}

export async function getuserpastedata(userId: string): Promise<PasteResponse> {
  try {
    await dbConnect();

    const pasteData = await pastes.findOne({ userId: userId });

    if (!pasteData) {
      throw new Error('No paste found for the given user ID.');
    }

    return {
      status: 200,
      message: 'Received data successfully.',
      userId: pasteData.userId,
      success: true,
      paste_data: pasteData.paste_data.map((item: PasteData) => ({
        paste_title: item.paste_title,
        paste_type: item.paste_type,
        paste_content: item.paste_content,
        shareId: item.shareId,
        pastelink_id: item.pastelink_id,
        storage_type: item.storage_type,
        isPrivate: item.isPrivate,
        createdAt: item.createdAt,
      })),
      createdAt: pasteData.createdAt,
      updatedAt: pasteData.updatedAt,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'An error occurred',
      success: false,
      error: 'Failed to create Paste.',
    };
  }
}

export async function deletePasteByLinkId(
  userId: string,
  pastelinkId: string
): Promise<SimpleResponse> {
  try {
    await dbConnect();
    const updatedPastes = await pastes.findOneAndUpdate(
      { userId: userId },
      { $pull: { paste_data: { pastelink_id: pastelinkId } } },
      { new: true }
    );

    if (!updatedPastes.userId) {
      return {
        status: 404,
        message: 'No paste found for the given pastelink_id.',
        success: false,
      };
    }

    return {
      status: 200,
      message: 'Paste deleted successfully.',
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: 'An error occurred',
      success: false,
    };
  }
}

export async function makePastePublic(
  userId: string,
  pastelinkId: string
): Promise<SimpleResponse> {
  try {
    await dbConnect();
    const publicPaste = await pastes.findOneAndUpdate(
      { userId: userId, 'paste_data.pastelink_id': pastelinkId },
      {
        $set: {
          'paste_data.$.isPrivate': false,
          'paste_data.$.shareId': generatepastelink(5),
        },
      },
      { new: true }
    );

    const updatedPasteData = publicPaste.paste_data.find(
      (paste: PasteData) => paste.pastelink_id === pastelinkId
    );
    if (!updatedPasteData) {
      return {
        status: 404,
        message: 'No paste found for the given pastelink_id.',
        success: false,
      };
    }

    return {
      status: 200,
      message: 'Paste made public successfully.',
      success: true,
      shareId: updatedPasteData.shareId,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: 'An error occurred',
      success: false,
    };
  }
}

export async function getsharedpastedata(
  shareId: string
): Promise<SimpleResponse> {
  try {
    await dbConnect();
    const pasteData = await pastes.findOne({
      'paste_data.shareId': shareId,
      'paste_data.isPrivate': false,
    });

    if (!pasteData) {
      throw new Error('No paste found');
    }
    const sharedPaste: PasteData = pasteData.paste_data.find(
      (paste: PasteData) => paste.shareId === shareId && !paste.isPrivate
    );

    return {
      status: 200,
      message: 'Received data successfully.',
      success: true,
      paste_data: [
        {
          paste_title: sharedPaste.paste_title,
          paste_type: sharedPaste.paste_type,
          paste_content: sharedPaste.paste_content,
          pastelink_id: sharedPaste.pastelink_id,
          storage_type: sharedPaste.storage_type,
          isPrivate: sharedPaste.isPrivate,
          createdAt: sharedPaste.createdAt,
        },
      ],
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: 'An error occurred',
      success: false,
    };
  }
}
