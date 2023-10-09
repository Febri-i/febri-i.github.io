import { Component, JSX, createEffect, onCleanup } from "solid-js";
import { useSliderCtx } from "../../Slider";

interface BlobbyBackgroundProps {}

const BlobbyBackground: Component<BlobbyBackgroundProps> = (props) => {
  let svgRef: SVGSVGElement | undefined = undefined;
  let containerRef: HTMLDivElement | undefined = undefined;
  const [sliderIndex] = useSliderCtx();

  let INFUCKINGSIDE: boolean = true;
  const setSvgOpacity = (opacity: number) => {
    if (svgRef) {
      svgRef.animate([{ opacity }], { duration: 300, fill: "forwards" });
    }
  };

  let handleMouseMove = (e: MouseEvent) => {
    if (svgRef && containerRef) {
      const bound = containerRef.getBoundingClientRect();
      const insiderTest =
        e.clientX < bound.right &&
        e.clientX > bound.left &&
        e.clientY < bound.bottom &&
        e.clientY > bound.top &&
        bound.height - (sliderIndex() - 1) * bound.height > e.clientY;

      if (INFUCKINGSIDE !== insiderTest) {
        setSvgOpacity(insiderTest ? 1 : 0);
        INFUCKINGSIDE = insiderTest;
      }

      svgRef.animate(
        [
          {
            left: e.clientX + "px",
            top: e.clientY + "px",
          },
        ],
        { duration: 1000, fill: "forwards" }
      );
    }
  };
  const mouseLeaveHandle = () => {
    INFUCKINGSIDE = false;
    setSvgOpacity(0);
  };
  const mouseEnterHandle = () => {
    INFUCKINGSIDE = true;

    setSvgOpacity(1);
  };
  document.addEventListener("mouseleave", mouseLeaveHandle);
  document.addEventListener("mouseenter", mouseEnterHandle);
  window.addEventListener("pointermove", handleMouseMove);

  onCleanup(() => {
    document.removeEventListener("mouseleave", mouseLeaveHandle);
    document.removeEventListener("mouseenter", mouseEnterHandle);
    window.removeEventListener("pointermove", handleMouseMove);
  });

  return (
    <div
      ref={containerRef}
      class="w-full pointer-events-none z-0 h-full relative"
    >
      <svg
        ref={svgRef}
        class="bob"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(30,0,200);stop-opacity:1" />
            <stop
              offset="100%"
              style="stop-color:rgb(255,0,0);stop-opacity:1"
            />
          </linearGradient>
        </defs>
        <path
          fill="url(#grad1)"
          d="M42.3,-61.1C50.7,-52.1,50.7,-34.3,51.2,-19.7C51.8,-5.1,52.9,6.2,52.8,20.4C52.6,34.5,51.1,51.4,42.1,58C33.1,64.6,16.5,60.9,2.1,58C-12.4,55.2,-24.8,53.2,-37.6,47.9C-50.4,42.5,-63.6,33.7,-73.1,20C-82.7,6.4,-88.7,-12.2,-84.5,-28.3C-80.4,-44.3,-66.2,-57.9,-50.4,-64.5C-34.6,-71.1,-17.3,-70.8,-0.2,-70.5C16.9,-70.2,33.9,-70.1,42.3,-61.1Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
};

export default BlobbyBackground;
