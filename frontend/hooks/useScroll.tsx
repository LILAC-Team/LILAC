import { useRef, useEffect, useCallback } from "react";

export const useScroll = (onIntersect) => {
  const ref = useRef(null);

  const handleIntersect = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        onIntersect(entry, observer);
      }
    },
    [onIntersect]
  );

  useEffect(() => {
    let observer;

    if (ref.current) {
      observer = new IntersectionObserver(handleIntersect, { threshold: 0.8 });
      observer.observe(ref.current); // 관찰자에게 타겟을 지정
    }
    return () => observer && observer.disconnect(); // 데이터 페칭 완료 후 업데이트 x
  }, [ref, handleIntersect]);

  return ref;
};

export default useScroll;
