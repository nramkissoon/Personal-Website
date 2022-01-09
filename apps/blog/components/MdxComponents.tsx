import { ReactNode } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const MDXComponents: Record<string, ReactNode> = {
  h1: (props: any) => (
    <h1
      className="mb-0 text-6xl font-bold tracking-wide text-rose-600"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2 className="mb-4 text-4xl font-bold tracking-wide mt-7" {...props} />
  ),
  h3: (props: any) => <h3 className="mb-4 text-2xl font-medium" {...props} />,
  a: (props: any) => (
    <a
      className="font-normal text-sky-600 text-md hover:text-sky-400"
      target="_blank"
      {...props}
    />
  ),
  p: (props: any) => (
    <p className="mb-5 text-xl font-normal leading-8" {...props} />
  ),
  strong: (props: any) => (
    <strong
      className="underline underline-offset-2 decoration-slate-600"
      {...props}
    />
  ),
  hr: (props: any) => (
    <hr className="border-2 my-9 border-slate-700" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside marker:text-slate-900" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside marker:text-slate-900" {...props} />
  ),
  li: (props: any) => (
    <li className="text-xl leading-7 text-slate-900" {...props}>
      <span className="text-slate-900">{props.children}</span>
    </li>
  ),
  code: (props: any) => {
    const language = props.className.split("-")[1];
    const filename = props.filename;
    const terminal = props.terminal;
    // remove final \n
    const children = (props.children as string).slice(0, -1);
    return (
      <div className="-mt-4">
        <div className="relative flex space-x-2 top-5">
          <div
            className="px-3 rounded-sm \
       bg-slate-700 text-slate-200 w-fit font-semibold"
          >
            {language}
          </div>
          {filename && (
            <div
              className="px-3 rounded-sm \
              bg-slate-200 text-slate-900 w-fit font-normal flex"
            >
              {filename}
            </div>
          )}
          {terminal && (
            <div
              className="px-3 rounded-sm \
              bg-black text-green-500 w-fit font-normal"
            >
              terminal
            </div>
          )}
        </div>
        <SyntaxHighlighter
          style={darcula}
          showLineNumbers
          {...props}
          language={language}
          // eslint-disable-next-line react/no-children-prop
          children={children}
        />
      </div>
    );
  },
  img: (props: any) => {
    return (
      <div className="w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" {...props} />
      </div>
    );
  },
};
