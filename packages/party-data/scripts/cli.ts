import { Separator, select } from "@inquirer/prompts";

import { readNotCategorizedStandpoints, readSubjects } from "../src/reader";
import type { Standpoint } from "../src/types";
import { updateStandpoint } from "../src/writer";

const promptTemplate = (
  standpoint: Standpoint,
) => `Please categorize the following standpoint
URL: ${standpoint.url}
Title: ${standpoint.title}
Opinions:
${standpoint.opinions.map((opinion) => `  * ${opinion}`).join("\n")}
`;

async function categorize() {
  const subjects = readSubjects();
  const standpoints = readNotCategorizedStandpoints();

  const subjectChoices = subjects.map((subject) => ({
    name: subject.name,
    value: subject.id,
    description: undefined,
  }));

  for (const standpoint of standpoints) {
    const prompt = promptTemplate(standpoint);
    const choice = await select(
      {
        message: prompt,
        choices: [
          new Separator(),
          {
            name: "-- Skip --",
            value: undefined,
          },
          new Separator(),
          ...subjectChoices,
        ],
        pageSize: subjects.length + 3,
      },
      { clearPromptOnDone: true },
    );
    standpoint.subject = choice;
    await updateStandpoint(standpoint.party, standpoint);
  }
}

enum Action {
  Categorize = "categorize",
}

async function main() {
  const choice = await select(
    {
      message: "What do you want to do",
      choices: [
        {
          value: Action.Categorize,
          description: "Categorize uncategorized standpoints",
        },
      ],
    },
    { clearPromptOnDone: true },
  );
  switch (choice) {
    case Action.Categorize: {
      await categorize();
    }
  }
}

void main();
