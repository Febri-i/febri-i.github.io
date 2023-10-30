import {
  JSXElement,
  Component,
  createSignal,
  createContext,
  Accessor,
  Setter,
  useContext,
  createEffect,
  onCleanup,
} from "solid-js";
import { clamp } from "./Utils";
import { useTheJazz } from "./App";

interface SliderProps {
  children: JSXElement;
}

const SCROLLSENSITIVITY = 0.3;
const SCROLLSNAPTOLERANCE = 0.5;
const TOUCHSENSITIVITY = 1.2;

const [sliderIndex, setSliderIndex] = createSignal<number>(0);
const sliderIndexContext = createContext<[Accessor<number>, Setter<number>]>([
  sliderIndex,
  setSliderIndex,
]);

export function useSliderCtx() {
  return useContext(sliderIndexContext);
}

export function useSliderIdx() {
  return [sliderIndex, setSliderIndex];
}

function createPreventScroll(el: Element) {
  return (e: WheelEvent) => {
    if (
      el.scrollHeight > el.clientHeight &&
      (el.scrollTop < el.scrollHeight - el.clientHeight || e.deltaY < 0)
    ) {
      e.stopImmediatePropagation();
    }
  };
}

const Slider: Component<SliderProps> = (props) => {
  const [canGo, setCanGo] = createSignal<boolean>(true);
  let containerRef: HTMLDivElement | undefined;
  const doTheJazz = useTheJazz();
  const [scrollable, setScrollable] = createSignal<Element[]>([]);

  createEffect(() => {
    const els = document.querySelectorAll(".hideScroll");

    setScrollable(Array.from(els));
  });

  createEffect(() => {
    if (doTheJazz()) {
      scrollable().forEach((element) => {
        (element as HTMLDivElement).onwheel = createPreventScroll(element);
      });
    } else {
      scrollable().forEach((element) => {
        (element as HTMLDivElement).onwheel = () => {};
      });
    }
  });

  onCleanup(() => {
    scrollable().forEach((element) => {
      (element as HTMLDivElement).onwheel = () => {};
    });
  });

  const incrementProgress = (deltaY: number) => {
    if (!canGo()) {
      return;
    }
    const sliderHeight: number = containerRef?.clientHeight || 100;
    const index = sliderIndex();
    let snappedDelta = deltaY / sliderHeight;
    let dstIndex =
      snappedDelta + index + SCROLLSNAPTOLERANCE * (snappedDelta < 0 ? -1 : 1);

    if (Math.floor(index) !== Math.floor(dstIndex) && dstIndex > index) {
      snappedDelta = Math.floor(dstIndex) - index;
      setCanGo(false);
      setTimeout(() => {
        setCanGo(true);
      }, 500);
    } else if (
      Math.ceil(index) !== Math.ceil(dstIndex) &&
      Math.ceil(index) !== Math.floor(dstIndex)
    ) {
      snappedDelta = Math.ceil(dstIndex) - index;
      setCanGo(false);
      setTimeout(() => {
        setCanGo(true);
      }, 500);
    }

    const indexVal = index + snappedDelta;

    if (doTheJazz()) {
      setSliderIndex(
        clamp(indexVal, 0, document.querySelectorAll(".sliderItem").length - 1),
      );
    }
  };
  const handleWheel = (e: WheelEvent) => {
    incrementProgress(e.deltaY * SCROLLSENSITIVITY);
  };

  let beforeTouchY: number = 0;

  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[e.touches.length - 1];
    const delta = beforeTouchY - touch.clientY;

    !scrollable().filter(
      (el) =>
        el.scrollHeight > el.clientHeight &&
        (el.scrollTop < el.scrollHeight - el.clientHeight || delta < 0) &&
        el.contains(e.target as Element),
    ).length && incrementProgress(delta * TOUCHSENSITIVITY);

    beforeTouchY = touch.clientY;
  };

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[e.touches.length - 1];
    beforeTouchY = touch.clientY;
  };

  return (
    <sliderIndexContext.Provider value={[sliderIndex, setSliderIndex]}>
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        class="w-screen h-full landscape:overflow-hidden  landscape:relative  flex portrait:p-16 portrait:gap-10 portrait:flex-col landscape:flex-col-reverse"
      >
        {props.children}
      </div>
    </sliderIndexContext.Provider>
  );
};

export default Slider;
