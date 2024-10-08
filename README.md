# SharePaste

![SharePaste Logo](https://i.imgur.com/MNQSLRw.png)

## Overview

**SharePaste** is a simple pastebin application built with Next.js, Tailwind CSS, and MongoDB. It allows users to create, save, and share code snippets or text with syntax highlighting, making it ideal for developers and anyone who needs to share text easily.

## Features

- **Syntax Highlighting**: Automatically detects file types based on filename extension and provides syntax highlighting for a better reading experience.

- **Local & Cloud Storage**: Save your pastes locally in the browser's local storage or in the cloud using MongoDB.
- **Shareable Links**: Generate a unique link for each paste that can be shared with anyone.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [ShadCN](https://shadcn.dev/), [V0](https://v0.dev/)
- **Backend**: [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/)
- **Environment Variables**: .env.local

## Installation

To get started with SharePaste, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/3iru/SharePaste.git
   cd SharePaste

   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```
3. **Set up your environment variables**: Create a `.env.local` file in the root directory and add your MongoDB URI:
   ```env
   MONGODB_URI=your_mongodb_uri_here
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000).

## Usage

1. Create a new paste by entering your text or code in the input area.
2. The file type for syntax highlighting is automatically detected based on the filename extension you provide (e.g., `main.py` for Python, `script.js` for JavaScript).
3. Save your paste either locally or in the cloud.
4. Share the generated link with anyone you want!

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to create an issue or submit a pull request.

### Reporting Issues

Please report any bugs or security issues [here](https://github.com/3iru/SharePaste/issues).

## License

This project is licensed under the [MIT License](LICENSE).

---

**Note:** This project is still a work in progress. As I continue learning and improving my skills, there may be bugs and security issues. I appreciate any feedback or suggestions you may have!
