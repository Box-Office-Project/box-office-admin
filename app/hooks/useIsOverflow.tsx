import { useEffect, useState } from "react";

export const useIsOverflow = (ref: React.RefObject<HTMLElement>) => {
  const [refIsOverflow, setRefIsOverflow] = useState<boolean>();
  const [refIsScrollEnd, setRefIsScrollEnd] = useState<boolean>(false);
  useEffect(() => {
    const { current } = ref;
    if (!current) {
      return;
    }

    const trigger = () => {
      if (!current) {
        return;
      }
      const isOverflow = current.scrollHeight > current.clientHeight;
      setRefIsOverflow(isOverflow);
    };

    const handleScroll = () => {
      const scrollEnd =
        current?.scrollTop! + current?.offsetHeight! >= current?.scrollHeight!;
      setRefIsScrollEnd(scrollEnd);
    };

    trigger();
    current.addEventListener("scroll", handleScroll);

    return () => current.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return { refIsOverflow, refIsScrollEnd };
};
