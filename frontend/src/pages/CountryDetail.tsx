import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_COUNTRY = gql`
  query GetCountry($id: Int!) {
    country(id: $id) {
      id
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;

function CountryDetail() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { id: parseInt(id || "0", 10) },
    skip: !id,
  });

  if (loading) return <p>Chargement...</p>;
  if (error || !data?.country) return <p>Pays introuvable.</p>;

  const { name, code, emoji, continent } = data.country;

  return (
    <div className="text-center mt-6">
      <div className="text-6xl">{emoji}</div>
      <h2 className="text-3xl font-bold mt-2">
        {name} ({code})
      </h2>
      {continent && (
        <p className="mt-2 text-gray-600">
          Continent : <strong>{continent.name}</strong>
        </p>
      )}
    </div>
  );
}

export default CountryDetail;
