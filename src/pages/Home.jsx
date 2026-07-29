import { useEffect } from "react";
import supabase from "../lib/supabase";

const Home = () => {

  useEffect(() => {

    const getSnippets = async () => {

      const { data, error } = await supabase
        .from("snippets")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);

    };

    getSnippets();

  }, []);


  return (
    <div>
      Home
    </div>
  );
};

export default Home;