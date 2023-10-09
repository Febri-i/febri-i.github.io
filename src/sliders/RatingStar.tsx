import { IoStar } from "solid-icons/io";
import { For, createEffect, createSignal } from "solid-js";

interface IRatingStarProps {
  rate: number;
  activeColor?: string;
  baseColor?: string;
}

export default function RatingStar(props: IRatingStarProps) {
  const [stars, setStars] = createSignal<number[]>([]);

  createEffect(() => {
    const totalStar = Math.min(props.rate, 5);
    const starry: number[] = [];
    for (let i = 0; i < Math.floor(totalStar); i++) {
      starry.push(1);
    }

    if (totalStar < 5) {
      let remaining = 5 - totalStar;
      for (let i = 0; i < remaining; i++) {
        starry.push(0);
      }
    }

    setStars(starry);
  });

  return (
    <div class="flex gap-1  @apply text-xs md:text-sm xl:text-lg lg:text-base;">
      <For each={stars()}>
        {(item) => {
          return (
            <IoStar
              color={
                item
                  ? props.activeColor || "rgb(255,255,255)"
                  : props.baseColor || "rgba(255,255,255,.5)"
              }
            />
          );
        }}
      </For>
    </div>
  );
}
