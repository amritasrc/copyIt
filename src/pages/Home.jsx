import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import SnippetCard from "../comps/SnippetCard";
// import { data } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getSnippets = async () => {
      const { data, error } = await supabase.from("snippets").select("*");

      setData(data);
      console.log("DATA:", data);
      console.log("ERROR:", error);
    };

    getSnippets();
  }, []);

  return (
    <div>
      <div>
        {data.map((item) => (
          <SnippetCard
            id={item.id}
            title={item.title}
            description={item.description}
            lang={item.language}
            code={item.code}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
