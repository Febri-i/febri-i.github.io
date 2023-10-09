import { Component, JSXElement } from "solid-js";
import { useSliderCtx } from "./Slider";
import { useTheJazz } from "./App";

interface SliderItemProps {
  index: number;
  children: JSXElement;
}

const SliderItem: Component<SliderItemProps> = (props) => {
  const [sliderIndex, setSliderIndex] = useSliderCtx();
  const doTheJazz = useTheJazz();

  return (
    <div
      style={
        doTheJazz()
          ? {
              transform: props.index
                ? "translateY(" +
                  Math.min(
                    Math.max(-((sliderIndex() - props.index) * 100), 0),
                    200
                  ) +
                  "%)"
                : "",
            }
          : {}
      }
      id={"sliderItem#" + props.index}
      class="w-full sliderItem  landscape:transition-all duration-[50] landscape:h-full portrait:h-fit absolute portrait:static bg-transparent overflow-hidden"
    >
      {props.children}
    </div>
  );
};

export default SliderItem;
