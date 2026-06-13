const arr = ["Verify Member", "Vip Member", "Premium Member", "Loyalty Member"];

export function getRandomMember() {
  if (!arr || arr.length === 0) return undefined;

  const randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
}
