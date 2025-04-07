export async function fetchAddress(latitude, longitude) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  );

  if (!response.ok) {
    return "Unable to fetch the address.";
  }

  const { display_name } = await response.json();

  return display_name;
}
