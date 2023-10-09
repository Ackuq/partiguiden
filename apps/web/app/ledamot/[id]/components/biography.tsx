import { Card } from "@components/common/card";
import type { Information } from "@lib/api/member/types";
import BiographyEntry from "./biography-entry";

interface Props {
  memberInformation: Information[];
}

export default function Biography({ memberInformation }: Props) {
  if (memberInformation.length === 0) {
    return null;
  }

  return (
    <Card className="p-0">
      <h4 className="p-4 text-xl sm:text-2xl">Biografi</h4>
      <div>
        {memberInformation.map((info) => (
          <BiographyEntry
            key={`${info.type}:${info.code}`}
            information={info}
          />
        ))}
      </div>
    </Card>
  );
}
