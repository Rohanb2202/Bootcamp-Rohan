export async function fetchData(url: string): Promise<string> {
  const dataSource = import.meta.env.VITE_DATA_SOURCE;
  const response = await fetch(dataSource);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.text();
}