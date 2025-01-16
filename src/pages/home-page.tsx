import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { RecipeType } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function HomePage() {
  const [data, setRecipes] = useState([]);
  const [filteredRecipes, setfilteredRecipes] = useState([]);
  const [badge, setBadge] = useState("");
  const [badges, setBadges] = useState([]);
  const defaultBadges:Array<string> = [
    "Chinese", "Japanese", "Korean", "Thai", "Vietnamese",
    "Indian", "Malaysian", "Indonesian", "Filipino", "Mexican", "Italian"
  ] 

  const recipes = filteredRecipes.length > 0 ? filteredRecipes : data;
  const displayBadges = badges.length > 0 ? badges : defaultBadges;

  const getAllRecipes = async () => {
    const response = await fetch('https://dummyjson.com/recipes');
    const { recipes } = await response.json();
    return recipes;
  };

  const getAllBadges = async () => {
    const response = await fetch('https://dummyjson.com/recipes/tags');
    const badges = await response.json();
    return badges;
  }

  useEffect(() => {
    const getRecipes =  async () => {
      const recipes = await getAllRecipes();
      if (recipes) {
        setRecipes(recipes);
      }
    };
    
    const getBadges = async () => {
      const badges = await getAllBadges();
      if (badges) {
        setBadges(badges);
      }
    };
  
    getRecipes();
    getBadges();
  }, []);

  const handleOnClick = (
    e: React.MouseEvent<HTMLDivElement,
    MouseEvent>,
    cuisine: string
  ) => {
    e.preventDefault();
    setBadge(cuisine);
  };

  useEffect(() => {
    if (badge) {
      const filteredRecipesByCuisine = data.filter(
        (recipe: RecipeType) =>  recipe && recipe.tags.includes(badge)
      );
      setfilteredRecipes(filteredRecipesByCuisine);
    }
  }, [badge, data]);

  return (
    <div className="xl:px-24 px-10">
      <div className="my-12">
        {displayBadges.map((cuisine, idx) => (
          <Badge 
            key={`${cuisine}-${idx}`}
            variant={"outline"}
            className="border-orange-100 text-blue-950 text-lg mx-2 my-1 hover:cursor-pointer bg-orange-50 hover:scale-110 ease-in duration-200"
            onClick={(e: React.MouseEvent<HTMLDivElement,
              MouseEvent>) => 
              handleOnClick(e, cuisine)
            }
          >
            {cuisine}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols- md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-x-10 gap-y-20 xl:gap-y-32 xl:pt-32 pt-12 pb-20">
        {recipes.map((recipe: RecipeType, idx: number) => (
          <Link to={`/recipes/${recipe.id}`}>
            <Card
              key={`${recipe.name}-${idx}`}
              className="flex flex-col bg-orange-50 hover:scale-105 ease-in duration-200 xl:min-h-[600px] fancyGradient h-full"
            >
              <CardHeader>
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  width={500}
                  height={500}
                  className="bg-cover rounded-md shadow-xl"
                />
              </CardHeader>
              <CardContent className="flex-inherit">
                <CardTitle className="uppercase lg:text-2xl font-bold line-clamp-2">
                  {recipe.name}
                </CardTitle>
              </CardContent>
              <CardFooter className="flex items-start gap-2 lg:gap-8 lg:flex-col xl:flex-row flex-col">
                <div className="flex flex-col">
                  <p className="text-lg">Prep Time</p>
                  <p className="text-grey-800">{recipe.prepTimeMinutes}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg">Cook Time</p>
                  <p className="text-grey-800">{recipe.cookTimeMinutes}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg">Serves</p>
                  <p className="text-grey-800">{recipe.servings}</p>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}