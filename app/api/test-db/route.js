export async function GET() {
  return Response.json(
    { message: "This test endpoint is disabled." },
    { status: 410 }
  );
}
