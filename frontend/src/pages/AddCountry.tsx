import { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import "./AddCountry.css";

// GraphQL queries
const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      id
      name
    }
  }
`;

const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      id
      name
      emoji
      code
    }
  }
`;

function AddCountry() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    code: "",
    emoji: "",
    continent: "",
  });

  const { data: continentsData } = useQuery(GET_CONTINENTS);
  const [addCountry] = useMutation(ADD_COUNTRY);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const continentId = form.continent ? form.continent : null;
    await addCountry({
      variables: {
        data: {
          name: form.name,
          code: form.code.toUpperCase(),
          emoji: form.emoji,
          continent: continentId,
        },
      },
    });
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Ajouter un pays</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="form-input"
          required
        />
        <input
          type="text"
          name="code"
          placeholder="Code (ex: FR)"
          value={form.code}
          onChange={handleChange}
          className="form-input"
          required
        />
        <input
          type="text"
          name="emoji"
          placeholder="Emoji"
          value={form.emoji}
          onChange={handleChange}
          className="form-input"
          required
        />
        <select
          name="continent"
          value={form.continent}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">-- Choisir un continent --</option>
          {continentsData?.continents.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button type="submit" className="form-button">
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default AddCountry;
