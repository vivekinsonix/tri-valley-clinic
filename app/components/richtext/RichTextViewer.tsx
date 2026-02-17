import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';

type Props = {
  content: string;
};

export const RichTextViewer = ({ content }: Props) => {
  if (!content) return null;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw]}
      components={{
        p: ({ children }) => <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>{children}</p>,
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt || ''}
            style={{
              maxWidth: '100%',
              height: 'auto',
              margin: '20px 0',
              borderRadius: '8px',
            }}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
