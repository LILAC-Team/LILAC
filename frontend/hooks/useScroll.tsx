import { useRef, useEffect, useCallback } from "react";

export const useScroll = (onIntersect) => {
  const ref = useRef(null);

  // target을 감시하며 변화를 감지하고 처리하는 역할
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
      // 관찰 대상이 존재하는지 체크
      // threshold: viewport와의 교차범위(0 ~ 1) 설정
      observer = new IntersectionObserver(handleIntersect, { threshold: 0.1 }); // 관찰 대상이 존재하면 관찰자를 생성
      observer.observe(ref.current); // 관찰자에게 타겟을 지정
    }
    return () => observer && observer.disconnect(); // 데이터 페칭 완료 후 업데이트 x
  }, [ref, handleIntersect]);

  return ref;
};

export default useScroll;
