import Image from "next/legacy/image";
import { PrismLight as Highlighter } from "react-syntax-highlighter";
import { nightOwl as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const MDXComponents = {
  h1: (props: any) => (
    <h1 className="mb-0 text-6xl font-bold tracking-wide" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="mb-4 text-4xl font-bold tracking-tight mt-7" {...props} />
  ),
  h3: (props: any) => <h3 className="mb-4 text-2xl font-medium" {...props} />,
  a: (props: any) => (
    <a
      className="font-normal text-cyan-400 text-md hover:text-cyan-500"
      target="_blank"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="py-2 rounded-xl text-xl font-normal leading-8 tracking-tight"
      {...props}
    />
  ),
  strong: (props: any) => (
    <strong
      className="tracking-wide font-medium rounded-full px-2 py-[2px] bg-gray-700/50"
      {...props}
    />
  ),
  hr: (props: any) => (
    <hr className="border-2 my-9 border-slate-700" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside marker:text-slate-100" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside marker:text-slate-100" {...props} />
  ),
  li: (props: any) => (
    <li className="text-xl leading-7 text-slate-100" {...props}>
      <span className="text-slate-100">{props.children}</span>
    </li>
  ),
  code: (props: any) => {
    const classes = props.className.split(",");

    const language = classes[0].split("-")[1];
    const filename = classes[1] !== "terminal" ? classes[1] : null;
    const terminal = classes[1] === "terminal";

    // remove final \n
    const children = (props.children as string).slice(0, -1);
    return (
      <div className="-mt-4 mb-5">
        <div className="relative flex space-x-2 top-5">
          <div
            className="px-3 rounded-sm \
       bg-slate-700  w-fit font-semibold"
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
        <div>
          <Highlighter
            style={theme}
            showLineNumbers
            {...props}
            language={language}
            // eslint-disable-next-line react/no-children-prop
            children={children}
            wrapLines
            wrapLongLines
          />
        </div>
      </div>
    );
  },
  img: (props: any) => {
    return <img className="rounded-lg" {...props} />;
  },
  Video: (props: any) => {
    return <video className="rounded-lg" {...props} />;
  },
  HostedImg: (props: any) => {
    return (
      <div className="w-full my-2">
        <Image
          height={props.height}
          width={props.width}
          alt={props.alt}
          src={props.src}
          layout="responsive"
          quality={80}
        />
        <div className="m-auto mt-2 font-medium text-center text-gray-500">
          {props.alt}
        </div>
      </div>
    );
  },
};
