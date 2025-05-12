import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import "./Home.css";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      id
      name
      emoji
    }
  }
`;

function Home() {
  const { data, loading, error } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des pays.</p>;

  return (
    <div className="country-grid">
      {data.countries.map((country: any) => (
        <a
          key={country.id}
          href={`/country/${country.id}`}
          className="country-card"
        >
          <div className="country-emoji">{country.emoji}</div>
          <div className="country-name">{country.name}</div>
          <div>{country.code}</div>
        </a>
      ))}
    </div>
  );
}

export default Home;
