import { useEffect, useRef } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";

import { useSectionStore } from "./SectionProvider";
import { remToPx } from "./../utils/remToPx";

function Anchor({ id, children }: any) {
  return (
    <Link
      href={`#${id}`}
      className="group text-inherit no-underline hover:text-inherit"
    >
      {children}
    </Link>
  );
}

export function Heading({
  level = 2,
  children,
  id,
  tag,
  label,
  anchor = true,
  ...props
}: any) {
  const Component = `h${level}`;
  const ref = useRef();
  const registerHeading = useSectionStore((s) => s.registerHeading) as any;

  const inView = useInView(ref as any, {
    margin: `${remToPx(-3.5)}px 0px 0px 0px`,
    amount: "all",
  });

  useEffect(() => {
    if (level === 2) {
      registerHeading({ id, ref, offsetRem: tag || label ? 8 : 6 });
    }
  });

  return (
    <>
      <Component
        ref={ref}
        id={anchor ? id : undefined}
        className={tag || label ? "mt-2 scroll-mt-32" : "scroll-mt-24"}
        {...props}
      >
        {anchor ? (
          <Anchor id={id} inView={inView}>
            {children}
          </Anchor>
        ) : (
          children
        )}
      </Component>
    </>
  );
}
