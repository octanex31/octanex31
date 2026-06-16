'use client';

import { useCallback, useImperativeHandle, forwardRef, useState } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image,
  Minus,
  Pilcrow,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RichTextEditorHandle {
  getContent: () => string;
  setContent: (content: string) => void;
}

interface RichTextEditorProps {
  initialContent?: string;
  placeholder?: string;
  onChange?: (html: string) => void;
  maxChars?: number;
}

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(
  (
    {
      initialContent = '',
      placeholder = 'Start writing...',
      onChange,
      maxChars = 50000,
    },
    ref,
  ) => {
    const [charCount, setCharCount] = useState(initialContent.replace(/<[^>]*>/g, '').length);

    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: { levels: [1, 2, 3] },
        }),
        Underline,
        LinkExtension.configure({
          openOnClick: false,
        }),
        ImageExtension,
        Placeholder.configure({ placeholder }),
      ],
      content: initialContent,
      onUpdate: ({ editor: ed }) => {
        const text = ed.state.doc.textContent;
        setCharCount(text.length);
        onChange?.(ed.getHTML());
      },
    });

    useImperativeHandle(
      ref,
      () => ({
        getContent: () => editor?.getHTML() || '',
        setContent: (content: string) => editor?.commands.setContent(content),
      }),
      [editor],
    );

    const setLink = useCallback(() => {
      if (!editor) return;
      const previousUrl = editor.getAttributes('link').href;
      const url = window.prompt('Enter URL', previousUrl || 'https://');
      if (url === null) return;
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }, [editor]);

    const addImage = useCallback(() => {
      if (!editor) return;
      const url = window.prompt('Enter image URL');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }, [editor]);

    if (!editor) return null;

    const ToolButton = ({
      active,
      onClick,
      children,
      title,
    }: {
      active: boolean;
      onClick: () => void;
      children: React.ReactNode;
      title: string;
    }) => (
      <button
        type="button"
        onClick={onClick}
        title={title}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors',
          active
            ? 'bg-electric-violet/20 text-electric-violet'
            : 'text-text-secondary hover:bg-white/5 hover:text-text-primary',
        )}
      >
        {children}
      </button>
    );

    return (
      <div className="overflow-hidden rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-0.5 border-b border-glass-border px-3 py-2">
          <ToolButton
            active={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </ToolButton>
          <ToolButton
            active={editor.isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </ToolButton>
          <ToolButton
            active={editor.isActive('underline')}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToolButton>

          <span className="mx-1 h-5 w-px bg-glass-border" />

          <ToolButton
            active={editor.isActive('heading', { level: 1 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </ToolButton>
          <ToolButton
            active={editor.isActive('heading', { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </ToolButton>
          <ToolButton
            active={editor.isActive('paragraph')}
            onClick={() => editor.chain().focus().setParagraph().run()}
            title="Paragraph"
          >
            <Pilcrow className="h-4 w-4" />
          </ToolButton>

          <span className="mx-1 h-5 w-px bg-glass-border" />

          <ToolButton
            active={editor.isActive('bulletList')}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </ToolButton>
          <ToolButton
            active={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Ordered List"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolButton>

          <span className="mx-1 h-5 w-px bg-glass-border" />

          <ToolButton
            active={editor.isActive('link')}
            onClick={setLink}
            title="Insert Link"
          >
            <LinkIcon className="h-4 w-4" />
          </ToolButton>
          <ToolButton
            active={false}
            onClick={addImage}
            title="Insert Image"
          >
            <Image className="h-4 w-4" />
          </ToolButton>
        </div>

        <div className="min-h-[200px] px-4 py-3">
          <EditorContent
            editor={editor}
            className="prose prose-invert max-w-none focus:outline-none [&_.ProseMirror]:min-h-[180px] [&_.ProseMirror]:outline-none [&_.ProseMirror_p]:text-text-primary [&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-semibold [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_li]:ml-4 [&_.ProseMirror_a]:text-violet-light [&_.ProseMirror_a]:underline [&_.ProseMirror_img]:rounded-xl [&_.ProseMirror_img]:my-4 [&_p.is-editor-empty:first-child::before]:text-text-secondary/40 [&_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_p.is-editor-empty:first-child::before]:float-left [&_p.is-editor-empty:first-child::before]:pointer-events-none [&_p.is-editor-empty:first-child::before]:h-0"
          />
        </div>

        <div className="flex items-center justify-end border-t border-glass-border px-4 py-1.5">
          <span
            className={cn(
              'text-xs',
              charCount > maxChars
                ? 'text-red-400'
                : 'text-text-secondary',
            )}
          >
            {charCount.toLocaleString()} / {maxChars.toLocaleString()}
          </span>
        </div>
      </div>
    );
  },
);

RichTextEditor.displayName = 'RichTextEditor';

export { RichTextEditor };
