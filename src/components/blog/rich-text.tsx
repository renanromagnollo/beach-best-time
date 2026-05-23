import {
  RichText,
} from '@graphcms/rich-text-react-renderer'

type Props = {
  content: any
}

export function BlogRichText({
  content,
}: Props) {
  return (
    <div
      className="
        prose
        prose-zinc
        max-w-none
        prose-headings:scroll-mt-24
      "
    >
      <RichText content={content} />
    </div>
  )
}