import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  //This is intended to pause this page for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));

  //If I make an error for purpose,
  // throw new Error('Loading meals failed')
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  //slugify를 이용해서 meal의 title을 이용해서 slug를 생성
  meal.slug = slugify(meal.title, { lower: true });
  //xss helps us sanitize and clean instructions
  meal.instructions = xss(meal.instructions);

  //extract the file extension
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer(); //arrayBuffer은 promise를 리턴하기 때문에 await가 필요하다

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  meal.image = `/images/${fileName}`;
  console.log(meal);
  debugger;

  db.prepare(
    `INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (  
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug)`
  ).run(meal);
}
