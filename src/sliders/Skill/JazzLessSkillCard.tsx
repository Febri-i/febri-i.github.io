import { Dynamic } from "solid-js/web";
import { SkillInfo } from "../Skill";
import RatingStar from "../RatingStar";
import { ProjectInfo } from "../Project";
import { normalizeStr, svgStr2IconTree } from "../../Utils";
import { CustomIcon } from "solid-icons";

interface IJazzLessSkillCardProps {
  skill: SkillInfo;
  projectList: ProjectInfo[];
}

const JazzLessSkillCard = (props: IJazzLessSkillCardProps) => {
  return (
    <div class="flex gap-1 mt-2 flex-col">
      <h2 class=" flex items-center gap-1">
        <CustomIcon src={svgStr2IconTree(props.skill.icon)} />{" "}
        {props.skill.name}
      </h2>
      <RatingStar rate={props.skill.rate} />
      <p>{props.skill.desc}</p>
      <div class="w-full ">
        {props.projectList
          .slice(0, Math.min(props.projectList.length, 4))
          .map((project) => (
            <p class="inline-block mr-2">
              <a
                class="px-2 xl:px-5 bg-white text-black rounded-full"
                href={project.url}
              >
                {normalizeStr(project.name)}
              </a>
            </p>
          ))}
      </div>
    </div>
  );
};

export default JazzLessSkillCard;
