const API_KEY = process.env.CRYPTO_API_KEY;
export async function GET(request: Request) {
  const res = await fetch(
    "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY!,
      },
    }
  );
  const data = await res.json();
  return Response.json(data.data);
}
