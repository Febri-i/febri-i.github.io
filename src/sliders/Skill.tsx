import { IoArrowBackCircleOutline } from "solid-icons/io";
import { createEffect, createSignal, onCleanup } from "solid-js";
import { Vec2 } from "../Types";
import BlobbyBackground from "./Skill/BlobbyBackground";
import { CustomIcon, IconTypes, IconTree } from "solid-icons";
import { useSliderCtx } from "../Slider";
import { useTheJazz } from "../App";
import JazzLessSkillCard from "./Skill/JazzLessSkillCard";
import { ProjectInfo, useProjectList } from "./Project";
import SkillInfoSecetion from "./Skill/SkillInfoSection";
import { svgStr2IconTree } from "../Utils";
import skills from "./Skill/skillList";

export interface ISkillProps {}

export interface SkillInfo {
  name: string;
  desc: string;
  rate: number;
  skillTag: string;
  icon: string;
}

export default function Skill(props: ISkillProps) {
  const projectList = useProjectList();

  const doTheJazz = useTheJazz();
  const [sliderIndex] = useSliderCtx();
  const [skillIndex, setSkillIndex] = createSignal<number>(1);
  const [radius, setRadius] = createSignal<number>(0);
  let [center, setCenter] = createSignal<Vec2>({ x: 0, y: 0 });
  let containerRef: HTMLDivElement | undefined = undefined;
  let [showing, setShowing] = createSignal(false);
  let showingref: boolean = false;
  let [skillActive, setSkillActive] = createSignal<boolean>(false);

  const [shownProjects, setShownProjects] = createSignal<ProjectInfo[]>([]);
  createEffect(() => {
    setShownProjects(
      projectList()?.filter((project) =>
        project.topics.includes(skills[skillIndex()].skillTag)
      ) || []
    );
  });

  const getActivePosition = (i: number): Vec2 => {
    if (!containerRef) {
      return { x: 0, y: 0 };
    }
    const placeHolder = document.getElementById("skillPlaceHolder#" + i);
    if (!placeHolder) {
      return { x: 0, y: 0 };
    }

    const offsetBoundin = containerRef.getBoundingClientRect();

    const { x, y } = placeHolder.getBoundingClientRect();
    return { x: x + offsetBoundin.x, y: y - offsetBoundin.y };
  };

  const calculateIdlePosition = (i: number): Vec2 => {
    const angle = (i * 22 * 2) / (7 * skills.length) - 22 / 14;

    return {
      x: Math.cos(angle) * (radius() || 0) + center().x,
      y: Math.sin(angle) * (radius() || 0) + center().y,
    };
  };

  const idleSkill = () => {
    skills.forEach((skill, i) => {
      const el = document.getElementById("skill#" + i);

      if (!el) {
        return;
      }

      const idlePlace = calculateIdlePosition(i);

      el.classList.add("-translate-x-1/2", "-translate-y-1/2");
      setSkillActive(false);

      el.style.left = idlePlace.x + "px";
      el.style.top = idlePlace.y + "px";
    });
  };

  const restSkill = () => {
    skills.forEach((skill, i) => {
      const el = document.getElementById("skill#" + i);

      if (!el) {
        return;
      }
      el.classList.add("-translate-x-1/2", "-translate-y-1/2");

      el.style.left = "50%";
      el.style.top = "50%";
    });
  };

  const activeSkill = () => {
    skills.forEach((skill, i) => {
      const el = document.getElementById("skill#" + i);
      const placeHolder = document.getElementById("skillPlaceHolder#" + i);
      if (!el || !placeHolder) {
        return;
      }

      const restingPlace = getActivePosition(i);
      el.style.width = placeHolder.clientWidth + "px";
      el.style.height = placeHolder.clientHeight + "px";

      el.classList.remove("-translate-x-1/2", "-translate-y-1/2");

      el.style.left = restingPlace.x + "px";
      el.style.top = restingPlace.y + "px";
    });
    setSkillActive(true);
  };

  const updateSize = () => {
    if (!containerRef) {
      return;
    }
    setRadius(Math.min(window.innerWidth, window.innerHeight) * 0.25);

    setCenter({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    if (showing()) {
      if (skillActive()) {
        activeSkill();
      } else {
        idleSkill();
      }
    }
  };

  window.addEventListener("resize", updateSize);
  createEffect(() => {
    updateSize();
  });

  onCleanup(() => {
    window.removeEventListener("resize", updateSize);
  });

  createEffect(() => {
    const index = sliderIndex();
    /* 
      TODO: Find better way of doing this.
    */
    const showingCheck = Math.floor(index) == 1 && Math.ceil(index) == 1;
    if (showingref !== showingCheck) {
      showingref = showingCheck;
      setShowing(showingref);
      if (showingref) {
        if (skillActive()) {
          activeSkill();
        } else {
          idleSkill();
        }
      } else {
        restSkill();
      }
    }
  });

  return (
    <div
      ref={containerRef}
      class="w-full h-full landscape:bg-black relative landscape:flex skillContainerSize"
    >
      {doTheJazz() && (
        <div class="absolute portrait:hidden inset-0 z-0">
          <BlobbyBackground />
        </div>
      )}

      {doTheJazz() && (
        <>
          <div
            class=" z-20 transition-all portrait:hidden duration-500 self-end bottom-0 left-0"
            classList={{
              "delay-700": skillActive() && showing(),
              "translate-y-16  opacity-0 pointer-events-none":
                !skillActive() || !showing(),
            }}
          >
            <IoArrowBackCircleOutline
              onclick={idleSkill}
              class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl cursor-pointer"
            />
          </div>
          <SkillInfoSecetion
            projectList={shownProjects()}
            skill={skills[skillIndex()]}
            show={skillActive() && showing()}
          />
        </>
      )}

      {!doTheJazz() && <h1>Skills:</h1>}

      <div class="landscape:flex justify-between flex-col landscape:ml-auto  items-center h-full  block">
        {skills.map((skill, i) => {
          if (doTheJazz()) {
            return (
              <div>
                <div
                  id={"skill#" + i}
                  onClick={() => {
                    setSkillIndex(i);
                    activeSkill();
                  }}
                  class="absolute flex items-center justify-center skillFloatingIconSize bg-white rounded-full overflow-hidden transition-all skillButton cursor-pointer duration-700 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                >
                  {
                    <CustomIcon
                      src={svgStr2IconTree(skill.icon)}
                      class="text-black w-full h-full"
                    />
                  }
                </div>
                <div
                  id={"skillPlaceHolder#" + i}
                  class=" w-5 sm:w-7 md:w-11 xl:w-14 aspect-square"
                ></div>
              </div>
            );
          }
          return (
            <JazzLessSkillCard
              projectList={
                projectList()?.filter((project) =>
                  project.topics.includes(skill.skillTag)
                ) || []
              }
              skill={skill}
            />
          );
        })}
      </div>
    </div>
  );
}
