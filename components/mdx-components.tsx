import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import type { ImgHTMLAttributes } from "react";

function MdxImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt = "", width, height } = props;
  if (typeof src !== "string" || !src) {
    return null;
  }

  const parsedWidth = typeof width === "string" ? Number(width) : width;
  const parsedHeight = typeof height === "string" ? Number(height) : height;
  const finalWidth = Number.isFinite(parsedWidth) ? Number(parsedWidth) : 1200;
  const finalHeight = Number.isFinite(parsedHeight) ? Number(parsedHeight) : 630;

  return (
    <span className="my-6 block overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
      <Image
        src={src}
        alt={alt}
        width={finalWidth}
        height={finalHeight}
        sizes="(max-width: 768px) 100vw, 900px"
        className="h-auto w-full object-cover"
      />
    </span>
  );
}

export const mdxComponents: MDXComponents = {
  img: (props) => <MdxImage {...props} />,
  a: (props) => {
    const href = props.href ?? "";
    if (href.startsWith("/")) {
      return (
        <Link href={href} className="text-sky-700 underline decoration-sky-300 underline-offset-4 dark:text-sky-300">
          {props.children}
        </Link>
      );
    }

    return (
      <a
        {...props}
        target="_blank"
        rel="noreferrer noopener"
        className="text-sky-700 underline decoration-sky-300 underline-offset-4 dark:text-sky-300"
      />
    );
  },
};
