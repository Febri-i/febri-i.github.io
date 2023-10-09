import { Show, createSignal } from "solid-js";
import { useTheJazz } from "./App";
import { useSliderIdx } from "./Slider";

function Navbar() {
  const [showOpt, setShowOpt] = createSignal<boolean>(false);
  const [sliderIndex, setSliderIndex] = useSliderIdx();

  const doTheJazz = useTheJazz();

  const section: string[] = ["Introduction", "Skill", "Projects", "Contact"];

  const changeSect = (idx: number) => {
    if (doTheJazz()) {
      setSliderIndex(idx);
    } else
      document
        .getElementById("sliderItem#" + idx)
        ?.scrollIntoView({ behavior: "smooth" });
    setShowOpt(false);
  };

  return (
    <nav>
      <div>
        <h1 class="font-script febriLogoScript">Febri</h1>
      </div>
      <div class="flex portrait:hidden items-center navOptContainer text-lg gap-10 ">
        {section.map((sect, i) => (
          <button onclick={() => changeSect(i)}>{sect}</button>
        ))}
      </div>
      <Show when={!doTheJazz()}>
        <label
          onclick={(e) => {
            e.stopImmediatePropagation();

            setShowOpt((bef) => !bef);
          }}
          classList={{
            "swap-active opacity-0": showOpt(),
          }}
          class="z-20 relative w-fit ml-auto swap   swap-rotate"
        >
          <svg
            class="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
          <svg
            class="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>

        <div
          class="inset-0 fixed  z-10  transition-all duration-500  bg-black"
          classList={{
            "opacity-0 pointer-events-none": !showOpt(),
          }}
        >
          <nav>
            <label
              onclick={(e) => {
                e.stopImmediatePropagation();
                setShowOpt((bef) => !bef);
              }}
              classList={{
                "swap-active ": showOpt(),
              }}
              class="z-20 relative w-fit ml-auto swap  swap-rotate"
            >
              <svg
                class="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
              <svg
                class="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
          </nav>
          <div class="flex items-center absolute inset-0 justify-center h-full">
            <div class="[&>*]:text-2xl  [&>*]:block ">
              {section.map((sect, i) => (
                <button onclick={() => changeSect(i)}>{sect}</button>
              ))}
            </div>
          </div>
        </div>
      </Show>
    </nav>
  );
}

export default Navbar;
