import getMemberDocuments from "@lib/api/documents/get-member-documents";

interface Payload {
  params: {
    id: string;
    page: string;
  };
}

export async function GET(
  _request: Request,
  { params: { id, page } }: Payload,
) {
  const pageInt = parseInt(page);

  if (Number.isNaN(pageInt)) {
    return new Response("Invalid page", { status: 400 });
  }

  const memberDocuments = await getMemberDocuments({ id, page: pageInt });
  return Response.json(memberDocuments);
}
