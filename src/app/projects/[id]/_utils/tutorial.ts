export function generateTutorialClassName(
  currentTutorialStep: number | undefined,
  componentTutorialIndex: number,
) {
  return (
    `${currentTutorialStep !== componentTutorialIndex && currentTutorialStep !== undefined && "opacity-15"} ` +
    `${currentTutorialStep === componentTutorialIndex && "animate-pulse"}`
  );
}
