export default function RecipeMessage({ children }: React.PropsWithChildren) {
  return (
    <div className="flex items-center justify-center fancyGradient">
      <div className="mx-auto">{children}</div>
    </div>
  );
}
