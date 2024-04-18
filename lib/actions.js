"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

export async function shareMeal(prevState, formData) {
  //This will create the server action, To use this server action,
  //don't forget to add async

  function isInvalidText(text) {
    return !text || text.trim().length === 0;
  }

  const meal = {
    //get 이후에 들어가는 string은 form 태그 안에 있는 input의 name attribute랑
    //동일해야 한다
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input submitted",
    };
  }
  await saveMeal(meal);
  //Need to redirect users to the main page
  revalidatePath("/meals");

  redirect("/meals");
}
