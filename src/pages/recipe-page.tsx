import { RecipeType } from '@/types';
import { Link, useParams } from 'react-router';
import { useFetch } from '@/hooks/useFetch';
import { Loader } from 'lucide-react';
import RecipeMessage from '@/components/RecipeMessage';

export default function RecipePage() {
  const { recipeId } = useParams();
  const {
    data: recipe,
    status,
    isLoading,
    error
  } = useFetch<RecipeType>(`https://dummyjson.com/recipes/${recipeId}`);

  if (isLoading) {
    return (
      <RecipeMessage>
        <div className="animate-spin duration-2000">
          <Loader size={100} />
        </div>
      </RecipeMessage>
    );
  }

  if (error && status !== 404) {
    return (
      <RecipeMessage>
        <h1 className="text-3xl">Something went wrong!</h1>
        <p>{error.toString()}</p>
        <p>Status: {status}</p>
      </RecipeMessage>
    );
  }

  if (!recipe) {
    return (
      <RecipeMessage>
        <h1 className="text-3xl">No Recipe Found</h1>
        <p>{status}</p>
      </RecipeMessage>
    );
  }

  return (
    <div className="xl:px-48 px-10 pb-12 fancyGradient">
      <div className="grid xl:grid-cols-2 pb-10 xl:pb-20">
        <div className="pt-12 xl:px-12">
          <Link to="/" className="text-2xl">
            <p> ← Back to All Recipes </p>
          </Link>
          <h1 className="text-4xl lg:text-6xl my-8 uppercase">
            {recipe.name}
          </h1>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col">
              <p className="text-xl lg:text-3xl uppercase">🍽️ Serves</p>
              <p className="text-gray-800 text-2xl lg:text-3xl font-bold">
                {recipe.servings}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-xl lg:text-3xl uppercase">⏳ Prep Time</p>
              <p className="text-gray-800 text-2xl lg:text-3xl font-bold">
                {recipe.prepTimeMinutes} MIN
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-xl lg:text-3xl uppercase">⏱️ Cook Time</p>
              <p className="text-gray-800 text-2xl lg:text-3xl font-bold">
                {recipe.cookTimeMinutes} MIN
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-xl lg:text-3xl uppercase">🍔 Cuisine</p>
              <p className="text-gray-800 text-2xl lg:text-3xl font-bold">
                {recipe.cuisine}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-xl lg:text-3xl uppercase">🔥 Difficulty</p>
              <p className="text-gray-800 text-2xl lg:text-3xl font-bold">
                {recipe.difficulty}
              </p>
            </div>
          </div>
        </div>
        <div className="py-4 mx-auto">
          <img
            src={recipe.image}
            className="h-auto max-w-full"
          />
        </div>
      </div>

      <div className="grid xl:grid-cols-2">
        <div className="xl:px-12">
          <h2 className="uppercase text-5xl my-12">Ingredients</h2>
          <div className="flex flex-col divide-y divide-orange-800">
            {recipe.ingredients.map((ingredient: string, idx: number) => (
              <div className="py-2" key={`${ingredient}-${idx}`}>
                <p className="text-2xl">{ingredient}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="xl:px-12">
          <h2 className="uppercase text-5xl my-12">Instructions</h2>
          <div className="flex flex-col">
            {recipe.instructions.map((ingredient: string, idx: number) => (
              <ul className="py-2 list-disc" key={`${ingredient}-${idx}`}>
                <li className="text-2xl">{ingredient}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
