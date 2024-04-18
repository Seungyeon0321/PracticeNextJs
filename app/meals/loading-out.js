import classes from "./loading.module.css";

//As naming loading, we can use it without any additional code.
export default function MealsLoadingPage() {
  return <p className={classes.loading}>Fetching meals...</p>;
}
