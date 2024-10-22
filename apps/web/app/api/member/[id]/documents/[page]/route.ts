import getMemberDocuments from "@lib/api/documents/get-member-documents";

type Params = Promise<{
  id: string;
  page: string;
}>;

interface Payload {
  params: Params;
}

export async function GET(_request: Request, { params }: Payload) {
  const { id, page } = await params;

  const pageInt = parseInt(page);

  if (Number.isNaN(pageInt)) {
    return new Response("Invalid page", { status: 400 });
  }

  const memberDocuments = await getMemberDocuments({ id, page: pageInt });
  return Response.json(memberDocuments);
}

export const runtime = "edge";
