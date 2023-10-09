import { Show } from "solid-js";
import { ProjectInfo } from "../Project";
import { SkillInfo } from "../Skill";
import { ProjectShowcaseCard } from "./ProjectShowcaseCard";
import { Dynamic } from "solid-js/web";
import RatingStar from "../RatingStar";
import { CustomIcon } from "solid-icons";
import { svgStr2IconTree } from "../../Utils";

interface ISkillInfoSecetionProps {
  show: boolean;
  skill: SkillInfo;
  projectList: ProjectInfo[];
}

export default function SkillInfoSecetion(props: ISkillInfoSecetionProps) {
  return (
    <div
      class="bg-[rgba(255,255,255,0.08)] flex gap-5 w-full  shadow-md p-5 duration-500 transition-all rounded-xl backdrop-blur-sm "
      classList={{
        "delay-700": props.show,
        "translate-y-16  opacity-0 pointer-events-none": !props.show,
      }}
    >
      <div class="overflow-y-auto w-full h-full  rounded-xl hideScroll ">
        <Show
          when={props.projectList.length}
          fallback={
            <div class="w-full h-full flex items-center justify-center">
              <span class="w-1/2 text-center">
                Belum ada project yang selesai menggunakan {props.skill.name}
              </span>
            </div>
          }
        >
          <div class="flex flex-col gap-6  ">
            {props.projectList.map((project) => {
              return (
                <ProjectShowcaseCard
                  name={project.name}
                  url={project.url}
                  description={project.description}
                />
              );
            })}
          </div>
        </Show>
      </div>
      <div class=" rounded-xl overflow-y-auto bg-[rgba(255,255,255,.05)] hideScroll p-4 w-72 flex flex-col gap-2">
        <h2 class=" flex items-center gap-1">
          <CustomIcon src={svgStr2IconTree(props.skill.icon)} />{" "}
          {props.skill.name}
        </h2>
        <div>
          <RatingStar rate={props.skill.rate} />
        </div>
        <p>{props.skill.desc}</p>
      </div>
    </div>
  );
}
