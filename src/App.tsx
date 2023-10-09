import { type Component, Show } from "solid-js";
import Slider from "./Slider";
import SliderItem from "./SliderItem";
import Introduction from "./sliders/Introduction";
import Navbar from "./Navbar";
import Project from "./sliders/Project";
import { Contact } from "./sliders/Contact";
import Skill from "./sliders/Skill";
import { createMediaQuery } from "@solid-primitives/media";
import FractalTreeBackground from "./sliders/Project/FractalTreeBackground";

const doTheJazz = createMediaQuery("(orientation: landscape)");

export function useTheJazz() {
  return doTheJazz;
}

const App: Component = () => {
  return (
    <div class="w-full overflow-x-hidden landscape:overflow-hidden landscape:bg-black text-white font-normal relative  landscape:h-screen">
      <Navbar />
      <Slider>
        <SliderItem index={0}>
          <Introduction />
        </SliderItem>
        <SliderItem index={1}>
          <Skill />
        </SliderItem>
        <SliderItem index={2}>
          <Project />
        </SliderItem>
        <SliderItem index={3}>
          <Contact />
        </SliderItem>
      </Slider>
      <Show when={!doTheJazz()}>
        <div class="bg-black -z-20 absolute inset-0 w-full">
          <FractalTreeBackground
            totalTree={50}
            autoStop={false}
            duration={1}
            getColor={(brightness) =>
              `rgb(${brightness * 100},${brightness * 100},${brightness * 100})`
            }
          />
        </div>
      </Show>
    </div>
  );
};

export default App;
